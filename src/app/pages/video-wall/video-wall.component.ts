import { Component, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { VideoWallService } from 'src/app/service/api/video-wall.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';

declare let VmsPlayer: any;

@Component({
    selector: 'app-video-wall',
    templateUrl: './video-wall.component.html',
    styleUrls: ['./video-wall.component.scss'],
})
export class VideoWallComponent {
    constructor(
        private videoWallService: VideoWallService,
        private apiHandlerService: ApiHandlerService,
    ) {}

    @ViewChild('canvas') cameraContainer: ElementRef;

    listCamera: any[] = [];
    itemsSizes: any[] = [];
    gridDivList: any[] = [];
    arrayCameras: any[] = [];
    isPlayback = false;
    gridView: any = null;
    layouts: any[] = [];
    player: any = null;
    canvas: any = null;
    reload = true;
    rows: number = 4;
    first: number = 0;
    currentPage: number = 1;
    totalRecords: number = 0;
    loading: boolean = false;

    ngOnInit(): void {
        this.getListCamera();
    }

    getListCamera() {
        this.loading = true;
        this.videoWallService
            .listCameraLiveCms(this.currentPage, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    this.listCamera = [...res.data];
                    this.totalRecords = res.meta?.total;
                    this.newSession();
                },
            });
    }
    handlePageChange(event: any) {
        if (
            (event.rows !== this.rows || event.first !== this.first) &&
            typeof event.first == 'number' &&
            typeof event.rows == 'number'
        ) {
            this.rows = event.rows;
            this.first = event.first;
            this.currentPage = Math.ceil(event.first / event.rows) + 1;
            this.getListCamera();
        }
    }

    newSession() {
        if (this.player) {
            try {
                this.reload = false;
                this.player.destroy();
            } catch (err: any) {
                console.error(err);
            } finally {
                this.createGridCam();
            }
        } else {
            this.createGridCam();
        }
    }

    createGridCam() {
        this.arrayCameras = [];
        this.itemsSizes = [];
        this.gridDivList = [];
        for (let i = 0; i < this.listCamera.length; i++) {
            const list_ws_url = this.checkSourceEmpty(this.listCamera[i]);
            const cameraSourceIn: any[] = [];
            if (list_ws_url) {
                list_ws_url.forEach((element, index) => {
                    cameraSourceIn.push({
                        id: index + 1,
                        name: `Luồng ${index + 1}`,
                        source: element,
                        timeline: [],
                    });
                });
            }
            const oneCamera = {
                cameraId: 100 + i,
                // cameraName: 'camera-' + i,
                cameraName:
                    i < this.listCamera.length
                        ? this.listCamera[i].name
                        : 'No camera',
                cameraStatus: i < this.listCamera.length ? 1 : 0, // 1 is online, 0 is offline
                cameraSource:
                    i < this.listCamera.length && cameraSourceIn.length > 0
                        ? cameraSourceIn
                        : [
                              {
                                  id: 1,
                                  name: 'no-source',
                                  source: 'no-source',
                                  timeline: [],
                              },
                          ],
                cameraPtz: 0, // 1 is support ptz, 0 is no support
            };
            this.arrayCameras.push(oneCamera);
        }
        this.reload = true;
        this.createPlayers(this.arrayCameras, this.rows, this.isPlayback);
    }

    matrix(num: any) {
        const mxn: any = {
            1: [1, 1],
            4: [2, 2],
            9: [3, 3],
            16: [4, 4],
            25: [5, 5],
        };
        return mxn[num] || [0, 0];
    }

    checkSourceEmpty(item: any) {
        let listSource: any[] = [];
        if (!item || !item.profile) return false;
        const cameraOb = item;
        cameraOb.profile.forEach((item: any) => {
            if (item) {
                item.streams = item.streams.filter(
                    (stream: any) =>
                        stream.protocol === 'WS' || stream.protocol === 'WSS',
                );
                listSource = cameraOb.profile.map(
                    (x: any) => 'wss://' + x.streams[0].source.split('://')[1],
                );
            }
        });
        return listSource;
    }

    createPlayers(arrayCameras: any, rows: any, isPlayback: any) {
        const numberCameras = arrayCameras.length;

        const urls = arrayCameras.map((element: any) => {
            return element.cameraSource[0]['source'];
        });

        const listCameraIds = arrayCameras.map((element: any) => {
            return element.cameraId;
        });

        const listSourcesFull = arrayCameras.map((element: any) => {
            return element.cameraSource;
        });

        const liveSources = listSourcesFull.map((element: any[]) => {
            return element.map((el) => {
                return el.source;
            });
        });

        const nameCams = arrayCameras.map((element: any) => {
            return element.cameraName;
        });

        this.gridView = document.getElementById('grid-view');
        this.gridView.innerHTML = '';

        if (this.gridView) {
            this.gridView.setAttribute(
                'style',
                'grid-template-columns: repeat(' +
                    this.matrix(rows)[0] +
                    ', 1fr) ; grid-template-rows: repeat(' +
                    this.matrix(rows)[1] +
                    ' , 1fr)',
            );

            for (let i = 0; i < numberCameras; i++) {
                const titleSpan = document.createElement('span');
                titleSpan.className = 'title-cam';
                titleSpan.id = 'title-text-' + i;

                const gridDiv = document.createElement('div');
                gridDiv.setAttribute('camera_id', listCameraIds[i]);

                if (urls[i]) {
                    gridDiv.setAttribute('source', urls[i]);
                }

                gridDiv.id = 'canvasDiv-' + i;

                gridDiv.appendChild(titleSpan);

                this.gridView.appendChild(gridDiv);

                this.gridDivList.push(gridDiv);
            }

            const main_view_rect: any = document
                .getElementById('main-view')
                ?.getBoundingClientRect();

            for (let i = 0; i < numberCameras; i++) {
                const rect = this.gridDivList[i].getBoundingClientRect();
                this.itemsSizes[i] = {
                    width: Math.floor(rect.width),
                    height: Math.floor(rect.height),
                    left: Math.floor(rect.left - main_view_rect.left + 1),
                    bottom: Math.floor(-rect.bottom + main_view_rect.bottom),
                };
            }
        }

        if (nameCams && Array.isArray(nameCams) && nameCams.length > 0) {
            nameCams.forEach((element, index) => {
                if (document.getElementById('title-text-' + index)) {
                    (
                        document.getElementById('title-text-' + index) as any
                    ).innerHTML = element;
                }
            });
        }

        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        if (
            this.itemsSizes &&
            Array.isArray(this.itemsSizes) &&
            this.itemsSizes.length > 0
        ) {
            this.itemsSizes.forEach((element, index) => {
                this.layouts[index] = element;
            });
        }

        this.player = new VmsPlayer({
            canvasDiv: this.cameraContainer.nativeElement,
            maxCamerasNo: numberCameras,
            decoderPath: '/app/js/vms_player_v2/decoder.js',
            isDebug: false,
            isPlayback: isPlayback,
            arrayCameras: liveSources,
            gridLayout: this.layouts,
            durationSecs: 3600,
        });

        if (!isPlayback) {
            this.player.start();
        }
    }

    ngOnDestroy() {
        if (this.player) this.player.destroy();
    }
}
