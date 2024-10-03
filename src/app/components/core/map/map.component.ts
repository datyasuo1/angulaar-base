import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Address } from 'src/app/interface';
import { MapService } from 'src/app/service/common/map.service';
import { environment } from 'src/environments/environment';

declare let vtmapgl: any;

declare let Directions: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent {
    constructor(private mapService: MapService) {}

    @ViewChild('mapContainerDiv', { static: true }) mapContainer!: ElementRef;

    @ContentChild('content', { static: false }) content: TemplateRef<any>;

    @Input() initLocation: any = { lng: 108.2022, lat: 16.0544 };

    @Input() zoom: number = 12;

    @Input() viewOnly: boolean = false;

    @Input() useSearch: boolean = false;

    @Input() useDirection: boolean = false;

    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onAddressChange = new EventEmitter<Address>();

    @Output() onStartAddressChange = new EventEmitter<Address>();

    @Output() onEndAddressChange = new EventEmitter<Address>();

    map: any = null;

    token: string = environment.mapAccessToken;

    selectedPosition: string = '';

    filteredPositions: string[] = [];

    selectedPositionStart: string = '';

    filteredPositionsStart: string[] = [];

    selectedPositionEnd: string = '';

    filteredPositionsEnd: string[] = [];

    currentMarkers: any[] = [];

    // parent component will call this function
    setMap() {
        vtmapgl.accessToken = this.token;
        const { lng, lat } = this.initLocation;

        this.map = new vtmapgl.Map({
            container: 'mapContainerDiv',
            style: vtmapgl.STYLES.VTRANS,
            center: [lng, lat],
            zoom: this.zoom,
        });

        const waiting = () => {
            if (!this.map || !vtmapgl || !this.map.isStyleLoaded()) {
                setTimeout(waiting, 200);
            } else {
                this.map.on('zoom', () => {
                    this.zoom = this.map.getZoom();
                });
            }
        };

        // Waiting for the map loaded successfully
        waiting();

        if (!this.viewOnly) {
            this.map.on('click', (e: any) => {
                const { lng, lat } = e.lngLat;

                const marker = this.addMarker(lng, lat, this.map);

                this.currentMarkers.push(marker);

                if (this.currentMarkers.length > 1) {
                    const marker = this.currentMarkers.shift();
                    marker.remove();
                }

                this.fetchLatlngToAddress(
                    lat,
                    lng,
                    (result: any, status: number) => {
                        if (status === 0) {
                            const address = result.items[0].name;
                            if (!this.useDirection) {
                                this.onAddressChange.emit({
                                    lat,
                                    lng,
                                    address,
                                });
                            }
                        } else {
                            alert('Không xác định được địa chỉ');
                        }
                    },
                );
            });
        }
    }

    getMap() {
        return this.map;
    }

    fetchLatlngToAddress(
        lat: string,
        lng: string,
        onSuccess: (result: any, status: number) => void,
    ) {
        const geocoderService = new vtmapgl.GeocoderAPIService({
            accessToken: this.token,
        });
        geocoderService.fetchLatlngToAddress(lat + ',' + lng, onSuccess);
    }

    handleSelectPosition(data: any) {
        this.getLatLngFromText(data, (response: any) => {
            const { lng, lat } = response?.results[0]?.geometry?.location ?? {};

            const marker = this.addMarker(lng, lat, this.map);

            this.currentMarkers.push(marker);

            if (this.currentMarkers.length > 1) {
                const marker = this.currentMarkers.shift();
                marker.remove();
            }

            this.fetchLatlngToAddress(
                lat,
                lng,
                (result: any, status: number) => {
                    if (status === 0) {
                        const address = result.items[0].name;
                        this.selectedPosition = address;
                        this.onAddressChange.emit({
                            lat,
                            lng,
                            address,
                        });
                    } else {
                        alert('Không xác định được địa chỉ');
                    }
                },
            );

            this.map.flyTo({ center: [lng, lat] });
        });
    }

    route: any = {
        startLat: 0,
        startLng: 0,
        endLat: 0,
        endLng: 0,
    };

    handleSelectPositionStart(data: any) {
        this.getLatLngFromText(data, (response: any) => {
            const { lng, lat } = response?.results[0]?.geometry?.location ?? {};

            this.fetchLatlngToAddress(
                lat,
                lng,
                (result: any, status: number) => {
                    if (status === 0) {
                        const address = result.items[0].name;
                        this.selectedPositionStart = address;

                        this.onStartAddressChange.emit({
                            lat,
                            lng,
                            address,
                        });

                        this.route.startLat = lat;
                        this.route.startLng = lng;

                        if (
                            this.selectedPositionStart.length > 0 &&
                            this.selectedPositionEnd.length > 0
                        ) {
                            this.drawDirection(
                                `${this.route?.startLng},${this.route?.startLat}`,
                                `${this.route?.endLng},${this.route?.endLat}`,
                            );
                        }
                    } else {
                        alert('Không xác định được địa chỉ');
                    }
                },
            );

            this.map.flyTo({ center: [lng, lat] });
        });
    }

    handleSelectPositionEnd(data: any) {
        this.getLatLngFromText(data, (response: any) => {
            const { lng, lat } = response?.results[0]?.geometry?.location ?? {};

            this.fetchLatlngToAddress(
                lat,
                lng,
                (result: any, status: number) => {
                    if (status === 0) {
                        const address = result.items[0].name;
                        this.selectedPositionEnd = address;
                        this.onEndAddressChange.emit({
                            lat,
                            lng,
                            address,
                        });
                        this.route.endLat = lat;
                        this.route.endLng = lng;

                        if (
                            this.selectedPositionStart.length > 0 &&
                            this.selectedPositionEnd.length > 0
                        ) {
                            this.drawDirection(
                                `${this.route?.startLng},${this.route?.startLat}`,
                                `${this.route?.endLng},${this.route?.endLat}`,
                            );
                        }
                    } else {
                        alert('Không xác định được địa chỉ');
                    }
                },
            );

            this.map.flyTo({ center: [lng, lat] });
        });
    }

    getLatLngFromText(data: any, onSuccess: (response: any) => void) {
        this.mapService.getLatLngFromText(data.value).subscribe({
            next: (response: any) => {
                onSuccess(response);
            },
        });
    }

    searchPositionStart(event: any) {
        this.fetchPosition(event, (response: any) => {
            this.filteredPositionsStart = response?.items?.map(
                (item: any) => item.address,
            );
        });
    }

    searchPositionEnd(event: any) {
        this.fetchPosition(event, (response: any) => {
            this.filteredPositionsEnd = response?.items?.map(
                (item: any) => item.address,
            );
        });
    }

    searchPosition(event: any) {
        this.fetchPosition(event, (response: any) => {
            this.filteredPositions = response?.items?.map(
                (item: any) => item.address,
            );
        });
    }

    fetchPosition(event: any, onSuccess: (response: any) => void) {
        const query = event.query;
        this.mapService
            .getRelatedLocations(query, 0, 10, this.token)
            .subscribe({
                next: (response: any) => {
                    onSuccess(response);
                },
            });
    }

    addMarker(lng: number, lat: number, map: any) {
        return new vtmapgl.Marker().setLngLat([lng, lat]).addTo(map);
    }

    // Thêm điều khiển Directions
    addDirectionControl() {
        const direction = new Directions({
            accessToken: vtmapgl.accessToken,
            controls: {
                profileSwitcher: false,
            },
            profile: 'driving',
        });
        this.map.addControl(direction, 'bottom-left');
    }

    getWaypoints(
        origin: any,
        destination: any,
        onSuccess: (data: any, statusCode: any) => void,
    ) {
        const routingService = new vtmapgl.RoutingService({
            accessToken: this.token,
        });

        routingService.fetchDirections(
            `${origin};${destination}`,
            false,
            'driving',
            onSuccess,
        );
    }

    drawDirection(origin: any, destination: any) {
        this.getWaypoints(origin, destination, (data: any, statusCode: any) => {
            const id = 'route';
            if (this.map.getLayer(id)) {
                this.map.removeLayer(id);
            }
            if (this.map.getSource(id)) {
                this.map.removeSource(id);
            }
            this.map.addSource(id, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: data.routes[0].geometry,
                    },
                },
            });
            this.map.addLayer({
                id: id,
                type: 'line',
                source: id,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#FF5733',
                    'line-width': 8,
                },
            });
        });
    }
}
