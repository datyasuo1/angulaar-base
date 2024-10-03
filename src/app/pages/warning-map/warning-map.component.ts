import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subscription, finalize, interval } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {
    PublicInfoService,
    PublicInfosResponse,
} from 'src/app/service/api/public-info.service';
import { WarningMapService } from 'src/app/service/api/warning-map.service';
import { MapService } from 'src/app/service/common/map.service';
import { convertToDateTimeFormat } from 'src/app/utils/datetime';
import { environment } from 'src/environments/environment';

declare let vtmapgl: any;
@Component({
    selector: 'app-warning-map',
    templateUrl: './warning-map.component.html',
    styleUrls: ['./warning-map.component.scss'],
    providers: [DatePipe],
})
export class WarningMapComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild('mapContainer') mapContainer: ElementRef;

    private updateSubscription: Subscription;

    notifications: any[] = [];

    resources: any[] = [];

    currentAlert: any;

    listData: any[] = [];

    listLocation: any[] = [];

    listResourceCal: any[] = [];

    popup: any;

    listResourceArr: any[] = [];

    scopeChecked: boolean = false;

    isActicircle: boolean = false;

    rootPath: string = 'assets/images';

    resourceFull: any[] = [];

    publicInfoArr: any[] = [];

    popups: any[] = [];

    listColoredMarker: Map<number, any> = new Map<number, any>();

    dngStationType: string = '105';

    depthStationDNGVrain: any[] = [];

    listPopup: any[] = [];

    listCameraVms: any[] = [];

    isCollapseLeft: boolean = true;

    listfields: any[] = [];

    coordinateCircle = [108.20205649627174, 16.05444104185137];

    priorities: any[] = [];

    taskSelected: any = null;

    listColoredMarkerID = [105, 119];

    loading: boolean = false;

    map: any;

    circle: any;

    visibleSidebarLeft: boolean = true;

    visibleSidebarRight: boolean = true;

    resourceType: Map<number, string> = new Map<number, string>();

    listMarker: Map<string, any> = new Map<string, any>();

    currentZoom: number;

    getCenterMap: any;

    rows: number = 10;

    radius: number = 500;

    currentPage: number = 1;

    searchText: string = '';

    searchStatus: string = '';

    place: string = ',,';

    type: string = '';

    options = [];

    optionsLayerMap: any[] = [
        {
            label: 'Giao thông',
            value: ['#1B2437', '#253452', '#3A4E63'],
            active: true,
        },
        {
            label: 'Hành chính',
            value: 'VADMIN',
            active: false,
        },
        {
            label: 'Vệ tinh',
            value: 'GSAT',
            active: false,
        },
    ];

    activeStyleMap(value: string): void {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        vtmapgl.accessToken = environment.mapAccessToken;
        this.map = new vtmapgl.Map({
            container: this.mapContainer.nativeElement,
            style: Array.isArray(value)
                ? vtmapgl.STYLES.VNIGHT
                : vtmapgl.STYLES[value],
            center: [108.2022, 16.0544],
            zoom: 13,
            minZoom: 1,
        });
        this.map.addControl(new vtmapgl.NavigationControl(), 'bottom-right');
        this.map.addControl(new vtmapgl.GeolocateControl(), 'bottom-right');
        this.setGetMapCenter();

        const waiting = () => {
            if (this.map == null || !vtmapgl) {
                setTimeout(waiting, 200);
            } else {
                if (!this.map.isStyleLoaded()) {
                    setTimeout(waiting, 200);
                } else {
                    try {
                        this.map.on('zoom', () => {
                            this.currentZoom = this.map.getZoom();
                        });
                        if (Array.isArray(value)) {
                            this.activeStyleMapFirst(
                                this.optionsLayerMap[0].value,
                            );
                        }
                        this.getListTask();
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        };
        waiting();
        this.optionsLayerMap.forEach((element) => {
            if (element.value === value) {
                element.active = true;
            } else {
                element.active = false;
            }
        });
    }

    valueSelect: any[] = [];

    accessToken: string = environment.mapAccessToken;

    constructor(
        public layoutService: LayoutService,
        public warningMapService: WarningMapService,
        private cdr: ChangeDetectorRef,
        private datePipe: DatePipe,
        private publicInfoService: PublicInfoService,
        private mapService: MapService,
    ) {}

    ngOnInit() {
        this.startPeriodicUpdates();
        this.listPriority();
    }

    ngOnDestroy() {
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }

    getDistance(point) {
        let center = [];
        if (!this.coordinateCircle) {
            const taskSelected = this.currentAlert;
            center = [taskSelected.lng, taskSelected.lat];
        }
        return this.calCulateDistanceBetween2Points(
            this.coordinateCircle ? this.coordinateCircle : center,
            point,
        ).toFixed(0);
    }

    moveFirstItemToEnd() {
        if (this.notifications.length > 0) {
            const firstItem = this.notifications.shift();
            this.notifications.push(firstItem);
            this.cdr.detectChanges(); // Trigger change detection
        }
    }

    startPeriodicUpdates() {
        this.updateSubscription = interval(10000).subscribe(() => {
            this.moveFirstItemToEnd();
            this.cdr.detectChanges();
        });
    }

    activeStyleMapFirst(value: any) {
        this.map.setPaintProperty('view_oceans', 'fill-color', value[0]);
        this.map.setPaintProperty('view_rivers', 'fill-color', value[0]);
        this.map.setPaintProperty('lake', 'fill-color', value[0]);
        this.map.setPaintProperty('land-back', 'background-color', value[1]);
        this.map.setPaintProperty('view_islands', 'fill-color', value[1]);
        this.map.setPaintProperty('tbl_aeroway', 'line-color', value[2]);
        this.map.setPaintProperty('road-case-5', 'line-color', value[2]);
        this.map.setPaintProperty('road-case-4', 'line-color', value[2]);
        this.map.setPaintProperty('road-case-3', 'line-color', value[2]);
        this.map.setPaintProperty('road-case-2', 'line-color', value[2]);
        this.map.setPaintProperty('road-primary-case', 'line-color', value[2]);
        try {
            this.map.setPaintProperty(
                'bridge-primary-secondary-tertiary',
                'fill-color',
                value[2],
            );
        } catch (error) {
            console.error(error);
        }
        try {
            this.map.setPaintProperty(
                'bridge-motorway-trunk',
                'line-color',
                value[2],
            );
        } catch (error) {
            console.error(error);
        }
        try {
            this.map.setPaintProperty(
                'bridge-motorway-trunk-2',
                'line-color',
                value[2],
            );
        } catch (error) {
            console.error(error);
        }
        try {
            this.map.setPaintProperty(
                'tbl_provinces_boundary',
                'line-color',
                value[2],
            );
        } catch (error) {
            console.error(error);
        }
        this.optionsLayerMap.forEach((element) => {
            if (element.value === value) {
                element.active = true;
            } else {
                element.active = false;
            }
        });
    }

    setGetMapCenter() {
        this.map.on('mousemove', () => {
            try {
                this.getCenterMap = [
                    this.map._easeOptions.center.lng,
                    this.map._easeOptions.center.lat,
                ];
            } catch (error) {
                console.error(error);
            }
        });
    }

    updateCircle(active) {
        if (active === false) {
            this.listResourceCal = [];
            this.setInvisibleCircle();
            return;
        }
        if (active === false && this.circle == null) {
            this.listResourceCal = [];
            return;
        }
        if (this.circle == null) {
            if (!this.coordinateCircle) {
                this.coordinateCircle = [
                    this.currentAlert.lng,
                    this.currentAlert.lat,
                ];
            }
            this.initCircle();
        }
        const idLayerCircle = this.circle.SOURCE_ID;
        if (active === true && this.taskSelected !== null) {
            this.isActicircle = true;
            if (this.map.getSource(idLayerCircle) == null) {
                this.circle.addTo(this.map);
                const waiting = () => {
                    if (this.circle.getRadius() == null) {
                        setTimeout(() => {
                            waiting;
                        }, 100);
                    } else {
                        let x_circle = this.circle.options.center[1];
                        let y_circle = this.circle.options.center[0];
                        let rad = this.circle.getRadius();

                        this.listResourceCal = this.resources.filter(
                            (item) =>
                                this.calCulateDistanceBetween2Points(
                                    [y_circle, x_circle],
                                    [item.lng, item.lat],
                                ) < rad &&
                                this.checkResourceAvailable(item.idType),
                        );

                        // featuresDataCamera
                        this.circle.on('radius_changed', (e) => {
                            x_circle = e.target.options.center[1];
                            y_circle = e.target.options.center[0];
                            rad = this.circle.getRadius();

                            this.radius = rad.toFixed(0);
                            this.listResourceCal = this.resources.filter(
                                (item) =>
                                    this.calCulateDistanceBetween2Points(
                                        [y_circle, x_circle],
                                        [item.lng, item.lat],
                                    ) < rad &&
                                    this.checkResourceAvailable(
                                        item.resourceTypeId,
                                    ),
                            );
                        });
                    }
                };
                waiting();
            } else {
                if (this.map.getSource(idLayerCircle) == null) {
                    return;
                }
                this.circle.setRadius(500);
                this.circle.setCenter(this.coordinateCircle);
                this.setVisibleCircle();
                const x_circle = this.circle.options.center[1];
                const y_circle = this.circle.options.center[0];
                const rad = this.circle.getRadius();
                this.listResourceCal = this.resources.filter(
                    (item) =>
                        this.calCulateDistanceBetween2Points(
                            [y_circle, x_circle],
                            [item.long, item.lat],
                        ) < rad && this.checkResourceAvailable(item.idType),
                );
            }
        } else {
            if (this.map.getSource(idLayerCircle) == null) {
                return;
            }
            this.isActicircle = false;
            this.setInvisibleCircle();
        }
    }
    setVisibleCircle() {
        this.circle.setEditable(true);
        this.circle.setVisible(true);
    }
    setInvisibleCircle() {
        this.circle.setVisible(false);
        this.circle.setEditable(false);
    }

    toRadian(degree) {
        return (degree * Math.PI) / 180;
    }
    calCulateDistanceBetween2Points(point1, point2) {
        const R = 6371e3; // metres
        const φ1 = this.toRadian(point1[1]);
        const φ2 = this.toRadian(point2[1]);
        const Δφ = this.toRadian(point2[1] - point1[1]);
        const Δλ = this.toRadian(point2[0] - point1[0]);

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    initMap(mapStyle: string = vtmapgl.STYLES.VNIGHT) {
        vtmapgl.accessToken = this.accessToken;
        this.map = new vtmapgl.Map({
            container: this.mapContainer.nativeElement,
            style: mapStyle,
            center: [108.2022, 16.0544],
            zoom: 13,
            minZoom: 1,
        });
        this.map.addControl(new vtmapgl.NavigationControl(), 'bottom-right');
        this.map.addControl(new vtmapgl.GeolocateControl(), 'bottom-right');
        this.setGetMapCenter();
        const waiting = () => {
            if (this.map === null || !vtmapgl) {
                setTimeout(waiting, 200);
            } else {
                if (!this.map.isStyleLoaded()) {
                    setTimeout(waiting, 200);
                } else {
                    this.map.on('zoom', () => {
                        this.currentZoom = this.map.getZoom();
                    });
                    this.activeStyleMapFirst(this.optionsLayerMap[0].value);
                }
            }
        };
        waiting();
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    ngAfterViewInit(): void {
        this.getPublicInfo();
        this.initMap();
        this.getListResources();

        this.getListCountStatus()
            .then(() => {
                this.searchStatus = this.options
                    .map((item: any) => item?.value)
                    .join(',');
                this.getListTask();
            })
            .catch((err) => {
                console.error(err);
            });

        this.warningMapService
            .listFields(
                this.currentPage,
                this.rows,
                this.searchText,
                this.place,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe((response: any) => {
                this.listfields = response.data;
            });
    }

    handleFindListResourceByRange(data: any) {
        if (data === '') {
            this.listResourceCal.forEach((ItemVue) => (ItemVue.display = true));
            return;
        }
        let textInput = data.toLowerCase().trim();
        const textInputArr = textInput.split('');
        this.listResourceCal.forEach((element) => {
            let textSource = element.name.toLowerCase();
            const textSourceArr = textSource.split('');
            // textSource =this.filteNonAccentVietnamese()
            const p1 = this.mapService.removeAccentVietnamese(textSourceArr);
            const p2 = this.mapService.removeAccentVietnamese(textInputArr);

            Promise.all([p1, p2]).then((values) => {
                textSource = values[0];
                textInput = values[1];
                if (textSource.indexOf(textInput) === -1) {
                    element = element.display = false;
                } else {
                    element.display = true;
                }
            });
        });
    }

    getListCountStatus() {
        this.loading = true;
        return new Promise((resolve, reject) => {
            this.warningMapService.listCountStatus().subscribe({
                next: (res: any) => {
                    this.options = res.data.map((item: any) => ({
                        value: item.id,
                        label: item.status,
                        count: item.count,
                    }));
                    resolve(null);
                },
                error: (err: any) => {
                    console.error(err);
                    reject(err);
                },
            });
        });
    }

    getVisibleResource(resourceTypeId: any) {
        const rsType = this.resourceFull.find(
            (item) => item.id === resourceTypeId,
        );
        if (rsType.value) {
            return 'visible';
        }
        return 'none';
    }

    onKeywordChange(newValue: string) {
        this.searchText = newValue.trim();
    }

    searchAlerts() {
        this.loading = true;
        this.warningMapService
            .listProcessRequest(
                this.currentPage,
                this.rows,
                this.searchText,
                this.searchStatus,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe((response) => {
                this.notifications = response.data.slice(0, 10);
            });
    }

    setupMap(dataResource: any) {
        try {
            dataResource = dataResource.filter(
                (item: any) =>
                    (item[0].properties.groupType &&
                        item[0].properties.groupType !== 'IOT' &&
                        item[0].properties.resourceTypeId !== 119 &&
                        item[0].properties.resourceTypeId !== 126) ||
                    item[0].properties.resourceTypeId === 114,
            );

            dataResource.forEach((element: any, index: number) => {
                const color = element[0].properties.color;
                const source =
                    'infectionResource' + element[0].properties.resourceTypeId;
                const idResource =
                    'resource' + element[0].properties.resourceTypeId;
                const idResourceNotAvailble =
                    'resourceNotAvailble' +
                    element[0].properties.resourceTypeId;
                const imageResource =
                    'imageResource' + element[0].properties.resourceTypeId;
                const imageResourceTQT =
                    'imageResourceTQT' + element[0].properties.resourceTypeId;
                const imageResourceNotAvailble =
                    'imageResourceNotAvailble' +
                    element[0].properties.resourceTypeId;
                const icon = element[0].properties.icon;
                let iconNotAvailble = element[0].properties.icon;
                const isDefaultOnMap = this.getVisibleResource(
                    element[0].properties.resourceTypeId,
                );
                const data = {
                    type: 'FeatureCollection',
                    crs: {
                        type: 'name',
                        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
                    },
                    features: element,
                };
                iconNotAvailble = iconNotAvailble ? iconNotAvailble : icon;
                this.map.loadImage(
                    iconNotAvailble,
                    (error: any, image: any) => {
                        if (error) throw error;
                        this.map.addImage(imageResourceNotAvailble, image);
                    },
                );

                const iconThreshold = icon;
                this.map.loadImage(iconThreshold, (error: any, image: any) => {
                    if (error) throw error;
                    this.map.addImage(imageResourceTQT, image);
                });
                this.map.loadImage(
                    icon,
                    (error: any, image: any) => {
                        setTimeout(() => {
                            if (error) throw error;
                            const maxWidth = 40;
                            const maxHeight = 40;
                            let image_size = 1;
                            if (
                                image.height > maxHeight ||
                                image.width > maxWidth
                            ) {
                                if (image.height > image.width) {
                                    image_size = maxHeight / image.height;
                                } else {
                                    image_size = maxWidth / image.width;
                                }
                            }
                            this.map.addImage(imageResource, image);
                            this.map.addSource(source, {
                                type: 'geojson',
                                data: data,
                                cluster: false,
                                clusterRadius: 80,
                            });

                            const checkAvai = ['==', 'availability', 1];
                            const checkNotOver = ['==', 'overThreshold', false];
                            const checkOver = ['==', 'overThreshold', true];

                            if (element[0].properties.resourceTypeId == 114) {
                                this.map.addLayer({
                                    id: idResource,
                                    type: 'symbol',
                                    source: source,
                                    filter: ['all', checkAvai, checkNotOver],
                                    layout: {
                                        'icon-image': imageResource,
                                        'icon-allow-overlap': true,
                                        'icon-size': image_size,
                                        visibility: isDefaultOnMap,
                                    },
                                });

                                this.map.addLayer({
                                    id: idResource + 'overThreshold',
                                    type: 'symbol',
                                    source: source,
                                    filter: ['all', checkAvai, checkOver],
                                    layout: {
                                        'icon-image': imageResourceTQT,
                                        'icon-allow-overlap': true,
                                        'icon-size': 1,
                                        visibility: isDefaultOnMap,
                                    },
                                });
                            } else {
                                this.map.addLayer({
                                    id: idResource,
                                    type: 'symbol',
                                    source: source,
                                    // filter: ['==', 'availability', 1],
                                    layout: {
                                        'icon-image': imageResource,
                                        'icon-allow-overlap': true,
                                        'icon-size': image_size,
                                        visibility: isDefaultOnMap,
                                    },
                                });
                            }
                            this.map.addLayer({
                                id: idResourceNotAvailble,
                                type: 'symbol',
                                source: source,
                                // filter: ['==', 'availability', 0],
                                layout: {
                                    'icon-image': imageResourceNotAvailble,
                                    'icon-allow-overlap': true,
                                    'icon-size': image_size,
                                    visibility: isDefaultOnMap,
                                },
                            });
                        });
                        this.map.on('click', idResource, (e: any) => {
                            const coordinates =
                                e.features[0].geometry.coordinates.slice();
                            let description =
                                e.features[0].properties.description;
                            const listFeatures = e.features;
                            if (
                                e.features[0].properties.resourceTypeId ==
                                Number(this.dngStationType)
                            ) {
                                const stationDNGVrain =
                                    this.depthStationDNGVrain.find((item) => {
                                        return (
                                            item.id ===
                                            e.features[0].properties.idResource
                                        );
                                    });
                                if (stationDNGVrain) {
                                    const potision = {
                                        name: stationDNGVrain.name,
                                        address: stationDNGVrain.address,
                                        phone: stationDNGVrain.phone,
                                        specialilty_properties:
                                            stationDNGVrain.specialilty_properties,
                                    };
                                    description =
                                        this.renderMarkerPoint(potision);
                                }
                            }

                            const popup = new vtmapgl.Popup({
                                closeOnClick: false,
                            })
                                .setLngLat(coordinates)
                                .setHTML(description)
                                .addTo(this.map);
                            this.listPopup.push({
                                type: listFeatures[0].properties.resourceTypeId,
                                content: popup,
                                typeMain: 'resource',
                            });
                            popup._container
                                .getElementsByClassName(
                                    'vtmapgl-popup-content',
                                )[0]
                                .setAttribute('style', 'width:240px');
                        });

                        this.map.on(
                            'click',
                            idResource + 'overThreshold',
                            (e: any) => {
                                const coordinates =
                                    e.features[0].geometry.coordinates.slice();
                                const description =
                                    e.features[0].properties.description;
                                const listFeatures = e.features;

                                const popup = new vtmapgl.Popup({
                                    closeOnClick: false,
                                })
                                    .setLngLat(coordinates)
                                    .setHTML(description)
                                    .addTo(this.map);
                                this.listPopup.push({
                                    type: listFeatures[0].properties
                                        .resourceTypeId,
                                    content: popup,
                                    typeMain: 'resource',
                                });
                                popup._container
                                    .getElementsByClassName(
                                        'vtmapgl-popup-content',
                                    )[0]
                                    .setAttribute('style', 'width:240px');
                            },
                        );
                    },
                    20,
                );
            });

            setTimeout(() => {
                this.map.loadImage(
                    this.rootPath + '/start-flag.png',
                    (error: any, image: any) => {
                        if (error) throw error;
                        this.map.addImage('StartImage', image);
                    },
                );
            }, 10);
        } catch (error) {
            console.error(error);
        }
    }

    renderMarkerPoint(position: any) {
        let bodyMarker = ``;
        bodyMarker = `
            <div class="contentRow">
                <img src="assets/images/location-dot-solid.svg" alt="location icon"/>
                <div>${position.location}</div>
            </div>`;
        if (position.phone) {
            bodyMarker =
                bodyMarker +
                ` <div class="contentRow">
                <img src="assets/images/location-phone.svg" alt="location icon"/>
                <div>${position.phone}</div>
            </div>`;
        }

        const topMarker = `
            <div class="customMarkerPopup">
            <div class="title">${position.name}</div>
            <div class="content">
        `;
        const bottomMarker = `
            </div>
            <div class="markerLink"></div>
        </div>
        `;
        return topMarker + bodyMarker + bottomMarker;
    }

    getPublicInfo() {
        this.publicInfoService
            .getComboBoxPublicInfos(
                this.currentPage,
                this.rows,
                this.searchText,
                this.place,
                this.type,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe((response: PublicInfosResponse) => {
                const todayDate = new Date();
                this.publicInfoArr = response.data;
                this.publicInfoArr = this.publicInfoArr.filter(
                    (element) =>
                        !(
                            element.start_lng == null ||
                            element.start_lat == null ||
                            element.start_address == null ||
                            new Date(element.end_at) < todayDate
                        ),
                );
            });
    }

    setDataCluster() {
        const featuresDataResource: any[] = [];

        this.listResourceArr.forEach((element) => {
            const arr = [];
            for (let i = 0; i < element.value.length; i++) {
                // Element here have the same icon
                // Note: Use default image instead
                const activeImagePath = element.value[0]?.activeImage?.path;
                const icon = element.value[0].imageHost + activeImagePath;
                const iconNotAvailble = undefined; // By pass the code

                const des = this.renderMarkerPoint(element.value[i]);

                const color = '';

                this.resourceFull.push({
                    id: element.value[i].resourceTypeId,
                    title: element.value[i].resourceTypeName,
                    value: element.value[i].is_default_on_map === 1,
                    icon: icon,
                    display: true,
                    size: element.value.length,
                    groupType: element.value[i].groupType,
                    iconNotAvailble: iconNotAvailble,
                });

                this.resourceFull = this.resourceFull.filter(
                    (elem, index, self) =>
                        self.findIndex((t) => {
                            return t.id === elem.id && t.title === elem.title;
                        }) === index,
                );

                const feature = {
                    type: 'Feature',
                    properties: {
                        color: color,
                        specialilty_properties:
                            element.value[i].specialilty_properties,
                        resourceTypeId: element.value[i].resourceTypeId,
                        icon: icon,
                        idResource: element.value[i].id,
                        type: element.value[0].resourceTypeName.toLowerCase(),
                        cameraId: element.value[0].resourceTypeName
                            .toLowerCase()
                            .includes('camera')
                            ? element.value[i].id
                            : '',
                        description: des,
                        nameCam: element.value[0].resourceTypeName
                            .toLowerCase()
                            .includes('camera')
                            ? element.value[i].resourceTypeName
                            : '',
                        address: element.value[i].address,
                        availability: element.value[i].availability,
                        iconSize: [60, 60],
                        iconNotAvailble: iconNotAvailble,
                        isDefaultOnMap:
                            element.value[i].isDefaultOnMap === 1
                                ? 'visible'
                                : 'none',
                        groupType: element.value[i].groupType,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            parseFloat(element.value[i].lng.toFixed(6)),
                            parseFloat(element.value[i].lat.toFixed(6)),
                        ],
                    },
                };

                arr.push(feature);
            }

            featuresDataResource.push(arr);
        });

        this.setupMap(featuresDataResource);
    }

    checkJson(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    getValueKeyStatus(key: any) {
        if (key === '1') {
            return 'Chờ phân loại cảnh báo';
        }
        if (key === '2') {
            return 'Từ chối cảnh báo';
        }
        if (key === '5') {
            return 'Từ chối tiếp nhận';
        }
        if (key === '6') {
            return 'Chờ xác nhận kết quả';
        }
        if (key === '7') {
            return 'Từ chối xác nhận';
        }
        if (key === '8') {
            return 'Xác nhận kết quả';
        }
        if (key === '9') {
            return 'Lưu nháp';
        }
        if (key === '10') {
            return 'Deleted'; //Đã xóa
        }
        if (key === '12') {
            return 'Đã tiếp nhận';
        }
        if (key === '14') {
            return 'Trùng';
        }
        if (key === '15') {
            return 'Chờ chuyển cảnh báo';
        }
        if ([3, 4, 11, 13].includes(key)) {
            return 'Chờ tiếp nhận';
        }
        return 'Khong xac dinh';
    }

    listPriority() {
        this.warningMapService
            .getPrioritiest()
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe((response: any) => {
                this.priorities = response.data;
            });
    }

    getValuePrioty(key: number) {
        return this.priorities.find(
            (x: any) => x.value.toString() === key.toString(),
        )?.name;
    }

    checkExistResourceInArray(arrayMain: any, id: any) {
        return arrayMain.some((rs: any) => {
            return rs.id === id;
        });
    }

    isColoredResource(resourceTypeId: any) {
        return this.listColoredMarkerID.some((rs) => {
            return rs === resourceTypeId;
        });
    }

    // Toggle resource value
    showResource(value: any, id: any, title: any) {
        this.listResourceArr = this.listResourceArr.filter(
            (item) => item.id != 126,
        );
        const valueResource = typeof value == 'object' ? value.value : value;
        const titleRes = title ? title : value.title;
        const idR = id ? id : value.id;

        if (this.isColoredResource(idR)) {
            this.listColoredMarker.get(idR).forEach((element: any) => {
                try {
                    if (valueResource) {
                        element.addTo(this.map);
                    } else {
                        element.remove();
                    }
                } catch (error) {
                    console.error(error);
                }
            });
            return;
        }

        if (valueResource) {
            this.listResourceArr.forEach((element, index) => {
                for (let i = 0; i < element.value.length; i++) {
                    if (titleRes == element.value[i].resourceTypeName) {
                        const idResource = 'resource' + idR;
                        const idResourceNotAvailble =
                            'resourceNotAvailble' + idR;
                        const idResourceTQT =
                            'resource' + idR + 'overThreshold';
                        try {
                            if (
                                element.value[i].overThreshold == true &&
                                element.value[i].resourceTypeId == 114
                            ) {
                                this.map.setLayoutProperty(
                                    idResourceTQT,
                                    'visibility',
                                    'visible',
                                );
                            } else {
                                this.map.setLayoutProperty(
                                    idResource,
                                    'visibility',
                                    'visible',
                                );
                                this.map.setLayoutProperty(
                                    idResourceNotAvailble,
                                    'visibility',
                                    'visible',
                                );
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            });
        } else {
            this.listResourceArr.forEach((element, index) => {
                for (let i = 0; i < element.value.length; i++) {
                    if (titleRes == element.value[i].resourceTypeName) {
                        const idResource = 'resource' + idR;
                        const idResourceTQT =
                            'resource' + idR + 'overThreshold';
                        const idResourceNotAvailble =
                            'resourceNotAvailble' + idR;
                        try {
                            if (
                                element.value[i].overThreshold == true &&
                                element.value[i].resourceTypeId == 114
                            ) {
                                this.map.setLayoutProperty(
                                    idResourceTQT,
                                    'visibility',
                                    'none',
                                );
                            } else {
                                this.map.setLayoutProperty(
                                    idResource,
                                    'visibility',
                                    'none',
                                );
                                this.map.setLayoutProperty(
                                    idResourceNotAvailble,
                                    'visibility',
                                    'none',
                                );
                            }
                        } catch (error) {
                            console.error(error);
                        }
                        if (this.listPopup.length > 0) {
                            this.listPopup.forEach((elementPopup) => {
                                if (elementPopup.typeMain === 'resource') {
                                    if (
                                        parseInt(elementPopup.type) ===
                                        parseInt(element.id)
                                    ) {
                                        try {
                                            elementPopup.content.remove();
                                            if (
                                                element.value[0].resourceTypeName
                                                    .toLowerCase()
                                                    .includes('camera')
                                            ) {
                                                if (
                                                    this.listCameraVms.length >
                                                    0
                                                ) {
                                                    this.listCameraVms.forEach(
                                                        (item) => {
                                                            try {
                                                                item.stop();
                                                            } catch (error) {
                                                                console.error(
                                                                    error,
                                                                );
                                                            }
                                                        },
                                                    );
                                                }
                                            }
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
    }

    togleResourceOfDanger(arrayResource: any) {
        if (arrayResource) {
            this.resourceFull.forEach((resource) => {
                const check = this.checkExistResourceInArray(
                    arrayResource,
                    resource.id,
                );
                if (check) {
                    this.showResource(true, resource.id, resource.title);
                    resource.value = true;
                } else {
                    this.showResource(false, resource.id, resource.title);
                    resource.value = false;
                }
            });
        }
    }

    getListTask() {
        this.loading = true;
        this.warningMapService
            .listProcessRequest(
                this.currentPage,
                this.rows,
                this.searchText,
                this.searchStatus,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe((response) => {
                this.listLocation = [];
                this.listData = response.data;
                this.listData = this.listData.filter((element) => {
                    if (
                        element.lng == null ||
                        element.lat == null ||
                        element.lat < 8 ||
                        element.lat > 23 ||
                        element.status === '10' ||
                        element.status === '14'
                    ) {
                        return false;
                    }
                    return true;
                });
                if (this.listData.length > 0) {
                    this.coordinateCircle = [
                        this.listData[0].lng,
                        this.listData[0].lat,
                    ];
                    this.map.setZoom(15);
                    this.listData = this.listData.map((element) => {
                        return {
                            ...element,
                            time: element.time,
                        };
                    });
                    for (let i = 0; i < this.listData.length; i++) {
                        const listMedia: any = [];
                        if (this.checkJson(this.listData[i].mediaFile)) {
                            this.listData[i].mediaFile = JSON.parse(
                                this.listData[i].mediaFile,
                            );
                        }
                        const location = {
                            request_id: this.listData[i].request_id,
                            lng: this.listData[i].lng ?? 'Undefinition',
                            lat: this.listData[i].lat ?? 'Undefinition',
                            location:
                                this.listData[i].location ?? 'Undefinition',
                            time:
                                this.listData[i].time !== 'undefined'
                                    ? this.datePipe.transform(
                                          this.listData[i].time,
                                          'DD/MM/YYYY hh:mm:ss',
                                      )
                                    : 'Undefinition',
                            reason: this.listData[i].content ?? 'Undefinition',
                            type: 'danger',
                            status: this.getValueKeyStatus(
                                this.listData[i].status,
                            ),
                            statusKey: this.listData[0].status,
                            prioty: this.getValuePrioty(
                                this.listData[i].issuePriority,
                            ),
                            title: this.listData[i].title,
                            images: listMedia,
                            issue_id: this.listData[i].issueId,
                            source: this.listData[i].source,
                            field: this.listData[i].field,
                        };
                        this.listLocation.push(location);
                    }
                    this.taskSelected = this.listData[0].issueId;
                }

                this.setDataCluster();

                for (let i = 0; i < this.listData.length; i++) {
                    let location;
                    (location = {
                        lng: this.listData[i].lng
                            ? this.listData[i].lng
                            : 'Chưa xác định',
                        lat: this.listData[i].lat
                            ? this.listData[i].lat
                            : 'Chưa xác định',
                        location: this.listData[i].location
                            ? this.listData[i].location
                            : 'Chưa xác định',
                        time: this.listData[i].time
                            ? this.listData[i].time
                            : 'Chưa xác định',
                        reason: this.listData[i].content
                            ? this.listData[i].content
                            : 'Chưa xác định',
                        type: 'danger',
                        status: this.listData[i].status,
                        title: this.listData[i].title,
                    }),
                        this.listLocation.push(location);
                }
                this.notifications = response.data.slice(0, 10);

                for (let i = 0; i < this.notifications.length; i++) {
                    // Also create the VTS Map component

                    const el = document.createElement('div');
                    el.innerHTML = `<div class="custom-marker"><img src="assets/images/alert-icon.gif"></div>`;
                    const popup = new vtmapgl.Popup().setHTML(
                        ` <div id="${
                            this.notifications[i].issueId
                        }" class="customMarkerPopup popupAlert">
                                <div class="title">${
                                    this.notifications[i].issueTitle
                                }</div>
                                <div class="content">
                                    <div class="contentRow">
                                        <img src="assets/images/clock-regular.svg" alt="clock icon"/>
                                        <div>${convertToDateTimeFormat(
                                            this.notifications[i].createAt,
                                        )}</div>
                                    </div>
    
                                    <div class="contentRow">
                                        <img src="https://danang.ioc-cloud.com/static/img/location-dot-solid.7c91c3d4.svg" alt="location icon"/>
                                        <div>${
                                            this.notifications[i].location
                                        }</div>
                                    </div>
    
                                    <div class="contentRow contentFullRow">
                                        <div>Mức độ <span class="statusTag">${this.getValuePrioty(this.notifications[i].issuePriority)}</span></div>
                                        <div>Trạng thái <span class="statusTag orangeLevel">${this.getValueKeyStatus(
                                            this.notifications[i].issueStatus,
                                        )}</span></div>
                                    </div>
                                </div>
                                <div class="markerLink"><a class="btnView">Chi tiết</a></div>
                            </div>`,
                    );
                    // Init VTS marker
                    if (
                        this.notifications[i].lng === 'undefined' ||
                        this.notifications[i].lat === 'undefined'
                    ) {
                        this.notifications[i] = {
                            lng: '108.2022',
                            lat: '16.0544',
                        };
                    }
                    const marker = new vtmapgl.Marker(el)
                        .setLngLat([
                            this.notifications[i].lng,
                            this.notifications[i].lat,
                        ])
                        .setPopup(popup)
                        .addTo(this.map);

                    this.listMarker.set(this.notifications[i].issueId, marker);
                }
            });
    }

    changeStatus2(data: any) {
        this.valueSelect = data;
        this.searchStatus = data.map((item: any) => item?.value).join(',');
    }

    truncateText(text: any, maxLength: number): string {
        if (
            text &&
            text.toString &&
            typeof text.toString === 'function' &&
            text.toString().length <= maxLength
        ) {
            return text.toString();
        } else if (
            text &&
            text.toString &&
            typeof text.toString === 'function'
        ) {
            return text.toString().substring(0, maxLength) + '...';
        } else {
            return '';
        }
    }

    getListResources() {
        this.warningMapService
            .listResource(this.currentPage, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = true;
                }),
            )
            .subscribe((response: any) => {
                this.resources = response.data;

                const mapResource = new Map();
                for (let i = 0; i < this.resources.length; i++) {
                    this.resourceType.set(
                        this.resources[i].resourceTypeId,
                        this.resources[i].resourceTypeName,
                    );
                    mapResource.set(
                        this.resources[i].resourceTypeId,
                        this.resources[i].resourceTypeName,
                    );
                }

                for (
                    let x = 0;
                    x < Array.from(this.resourceType.keys()).length;
                    x++
                ) {
                    const arr: any[] = [];
                    this.resources.forEach((element) => {
                        if (
                            element.resourceTypeId ==
                            Array.from(this.resourceType.keys())[x]
                        ) {
                            arr.push(element);
                        }
                    });

                    this.listResourceArr.push({
                        id: Array.from(this.resourceType.keys())[x],
                        value: arr,
                    });
                }
            });
    }

    // Navigate the selected alert item
    selectAlert(notification: any) {
        this.currentAlert = notification;
        const marker = this.listMarker.get(notification.issueId);
        if (marker) {
            const coordinateCircle = [notification.lng, notification.lat];
            this.coordinateCircle = [notification.lng, notification.lat];
            this.map.easeTo({
                center: coordinateCircle,
                zoom: 18,
            });
            marker.togglePopup();
        }
    }

    initCircle() {
        this.circle = new vtmapgl.Circle({
            center: this.coordinateCircle,
            radius: 500,
            fillColor: '#cfc58d',
            strokeColor: '#FFE896',
            fillOpacity: 0.3,
            strokeWeight: 1,
            clickable: true,
            editable: true,
            draggable: false,
        });
    }

    checkResourceAvailable(idType) {
        const rsType = this.resourceFull.find((item) => item.id === idType);
        if (!rsType) {
            return false;
        }
        if (!rsType.value) {
            return false;
        }
        return true;
    }
}
