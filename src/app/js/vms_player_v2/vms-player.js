class VmsPlayer {
    constructor(configs) {
        this.isDebug = configs.isDebug || false;
        this.logger = new Logger("Player", this.isDebug);

        this.isPlayback = configs.isPlayback || false;
        this.decoderPath = configs.decoderPath || "decoder.js";
        this.canvasDiv = configs.canvasDiv || null;
        this.timeLabelDiv = configs.timeLabelDiv || null;
        this.timeTrackDiv = configs.timeTrackDiv || null;

        this.durationSecs = configs.durationSecs || 0;
        this.pointerSecs = 0;
        this.pointerInterval = 1000;

        this.maxCamerasNo =
            configs.maxCamerasNo || configs.arrayCameras.length || 1;
        this.arrayCameras = configs.arrayCameras || [];
        this.gridLayout = configs.gridLayout || [];
        this.retrieveTime = configs.retrieveTime || 5;
        this.retrieveInterval = configs.retrieveInterval || 3000;

        this.decoderWorker = [];
        // this.decoderWorkerNo = Math.ceil(Math.sqrt(this.maxCamerasNo));
        this.decoderWorkerNo = this.maxCamerasNo;
        this.renderWorker = null;
        this.renderInterval = configs.renderInterval || 30;

        this.stateCameras = [];
        this.retriesCameras = [];
        this.channelsCamera = [];
        this.idxTimeline = [];
        this.paramCameras = [];
        this.restartTimer = [];
        this.restartInterval = 5000;

        this.speedRate = 1;
        this.playerStates = playerStateIdle;

        this.onShowLoading = this.defaultShowLoading;
        this.onHideLoading = this.defaultHideLoading;
        this.onShowOffline = this.defaultShowOffline;
        this.onHideOffline = this.defaultHideOffline;
        this.onShowTimeTrack = this.defaultTimeTrack;
        this.onShowVideoParams = this.defaultShowVideoParams;
    }

    //export functions
    setCameraSources(camera_id, timeline) {
        if (camera_id < this.maxCamerasNo) {
            this.arrayCameras[camera_id] = timeline;
            this.stateCameras[camera_id] = playerStateIdle;
            this.retriesCameras[camera_id] = this.retrieveTime;
            this.channelsCamera[camera_id] = 0;
            if (this.isPlayback) {
                this.idxTimeline[camera_id] = -1;
                this.seekTo(camera_id, this.pointerSecs);
            } else {
                this.idxTimeline[camera_id] = 0;
                let url = timeline[this.channelsCamera[camera_id]];
                this.sendWorkerCmd(camera_id, urlReq, url);
            }
        } else {
            this.logger.logError(
                "Index of camera sources",
                camera_id,
                "is greater than max number of camera",
                this.maxCamerasNo,
            );
        }
    }

    setGridLayout(camera_id, layout) {
        if (camera_id < this.maxChannels) {
            this.gridLayout[camera_id] = layout;
            this.updateGridLayout(this.gridLayout);
        } else {
            this.logger.logError(
                "Index of camera sources",
                camera_id,
                "is greater than max number of camera",
                this.maxCamerasNo,
            );
        }
    }

    setCanvasDiv(div) {
        this.canvasDiv = div;
    }

    setTimeTrackLine(
        timeTrackDiv = null,
        timeLabelDiv = null,
        callback = null,
    ) {
        if (this.isPlayback == false) {
            return;
        }
        if (timeLabelDiv != null) {
            this.timeLabelDiv = timeLabelDiv;
        }
        if (timeTrackDiv != null) {
            this.timeTrackDiv = timeTrackDiv;
        }
        if (callback != null) {
            this.onShowTimeTrack = callback;
        }
    }

    switchChannel(camera_id, channel_id) {
        if (
            camera_id < this.arrayCameras.length &&
            channel_id < this.arrayCameras[camera_id].length
        ) {
            this.channelsCamera[camera_id] = channel_id;
            this.stateCameras[camera_id] = playerStateIdle;
            this.retriesCameras[camera_id] = this.retrieveTime;
            this.channelsCamera[camera_id] = channel_id;
            if (this.isPlayback) {
                this.idxTimeline[camera_id] = -1;
                this.seekTo(camera_id, this.pointerSecs);
            } else {
                this.idxTimeline[camera_id] = 0;
                let url =
                    this.arrayCameras[camera_id][
                        this.channelsCamera[camera_id]
                    ];
                this.sendWorkerCmd(camera_id, urlReq, url);
            }
        } else {
            this.logger.logError(
                "Index of channel sources",
                channel_id,
                "is greater than max number of channels",
                this.maxCamerasNo,
            );
        }
    }

    start() {
        if (this.playerStates != playerStateIdle) {
            this.logger.logError("Player is running");
            return;
        }

        if (!this.canvasDiv) {
            this.logger.logError("Canvas DOM do not initialize");
            return;
        }

        if (this.arrayCameras.length > this.maxCamerasNo) {
            this.logger.logError(
                "Number of channel sources",
                this.channelSrcs.length,
                "is greater than max number of channels",
                this.maxCamerasNo,
            );
            return;
        }

        try {
            if (
                this.arrayCameras.every((timeline, camera_id) =>
                    timeline.every((value) => !value.length),
                )
            ) {
                return;
            }
        } catch (error) {}
        this.setInitialDisplayTime();
        this.initializeWorkers();
        if (this.isPlayback) {
            this.setTimeTrackInterval();
        }
    }

    destroy() {
        this.restartTimer.forEach((item, camera_id) => {
            clearTimeout(item);
        });

        this.arrayCameras.forEach((item, camera_id) => {
            this.onShowOffline(camera_id);
            this.stateCameras[camera_id] = playerStateIdle;
            this.retriesCameras[camera_id] = 0;
            this.channelsCamera[camera_id] = 0;
            this.sendWorkerCmd(camera_id, stopReq);
        });
        this.arrayCameras = [];

        this.renderWorker.stop();

        this.decoderWorker.forEach((worker) => {
            worker.terminate();
        });
        this.decoderWorker = [];
        this.playerStates = playerStateIdle;
    }

    fullscreen(i) {
        let tmp = this.gridLayout.map((item, index) => {
            if (index == i) {
                return {
                    width: this.canvasDiv.clientWidth,
                    height: this.canvasDiv.clientHeight,
                    left: 0,
                    bottom: 0,
                };
            } else {
                return {
                    width: 0,
                    height: 0,
                    left: 0,
                    bottom: 0,
                };
            }
        });
        this.updateGridLayout(tmp);
        this.renderWorker.fullscreen();
    }

    exitFullscreen() {
        this.updateGridLayout(this.gridLayout);
        this.renderWorker.exitfullscreen();
    }

    resume() {
        if (
            this.playerStates != playerStatePausing ||
            this.isPlayback == false
        ) {
            return;
        }
        this.arrayCameras.forEach((timeline, camera_id) => {
            if (this.stateCameras[camera_id] != playerStateIdle) {
                this.showLoadingDiv(camera_id);
                this.sendWorkerCmd(camera_id, resumeReq);
            }
        });
        this.setTimeTrackInterval();
        this.playerStates = playerStatePlaying;
    }

    pause() {
        if (
            this.playerStates != playerStatePlaying ||
            this.isPlayback == false
        ) {
            return;
        }
        this.arrayCameras.forEach((timeline, camera_id) => {
            if (this.stateCameras[camera_id] == playerStatePlaying) {
                this.sendWorkerCmd(camera_id, pauseReq);
                this.stateCameras[camera_id] == playerStatePausing;
            }
        });
        this.clearTimeTrackInterval();
        this.playerStates = playerStatePausing;
    }

    stop() {
        if (this.playerStates == playerStateIdle || this.isPlayback == false) {
            return;
        }
        this.arrayCameras.forEach((timeline, camera_id) => {
            this.showOfflineDiv(camera_id);
            this.retriesCameras[camera_id] = 0;
            clearTimeout(this.restartTimer[camera_id]);
            if (this.stateCameras[camera_id] != playerStateIdle) {
                this.sendWorkerCmd(camera_id, stopReq);
            }
            this.stateCameras[camera_id] = playerStateIdle;
        });
        this.playerStates = playerStateIdle;
    }

    playWithRate(rate = 1) {
        if (this.playerStates == playerStateIdle || this.isPlayback == false) {
            return;
        }
        switch (rate) {
            case 0.5:
                this.pointerInterval = 2000;
                this.speedRate = 0.5;
                break;
            case 1:
                this.pointerInterval = 1000;
                this.speedRate = 1;
                break;
            case 2:
                this.pointerInterval = 500;
                this.speedRate = 2;
                break;
            case 4:
                this.pointerInterval = 250;
                this.speedRate = 4;
                break;
            case 8:
                this.pointerInterval = 125;
                this.speedRate = 8;
                break;
            default:
                return;
        }
        this.clearTimeTrackInterval();
        this.arrayCameras.forEach((timeline, camera_id) => {
            if (this.stateCameras[camera_id] != playerStateIdle) {
                this.sendWorkerCmd(camera_id, speedReq, this.speedRate);
            }
        });

        this.setTimeTrackInterval();
    }

    getVideoParams(i) {
        if (this.arrayCameras[i] && this.paramCameras[i]) {
            return this.paramCameras[i];
        } else {
            return {};
        }
    }

    //internal functions
    initializeWorkers() {
        this.renderWorker = new RenderWorker({
            canvas: this.canvasDiv,
            interval: this.renderInterval,
            gridLayout: this.gridLayout,
            isDebug: this.isDebug,
        });

        for (let id = 0; id < this.decoderWorkerNo; id++) {
            this.decoderWorker[id] = new Worker(this.decoderPath);
            this.decoderWorker[id].onmessage = (evt) => {
                let objData = evt.data;
                switch (objData.t) {
                    case readyRes:
                        this.initDecoderWorker(id);
                        break;
                    case renderRes:
                        this.addFrameToRender(objData);
                        break;
                    case paramsRes:
                        this.addParamsToMem(objData);
                        break;
                    case timeLineRes:
                        this.addTimeTrack(objData.i, objData.s, objData.d);
                        break;
                    case errorRes:
                        this.handleErrorCode(objData);
                        break;
                    default:
                        this.logger.logError(objData);
                }
            };
        }
    }

    initDecoderWorker(id) {
        this.decoderWorker[id].postMessage({
            t: initReq,
            id: id,
            isDebug: this.isDebug,
        });
        this.arrayCameras.forEach((timeline, camera_id) => {
            if (id != this.camera2Worker(camera_id)) {
                return;
            }
            this.showOfflineDiv(camera_id);
            this.stateCameras[camera_id] = playerStateIdle;
            this.retriesCameras[camera_id] = this.retrieveTime;
            this.channelsCamera[camera_id] = 0;
            this.idxTimeline[camera_id] = 0;
            if (this.isPlayback == false) {
                this.showLoadingDiv(camera_id);
                let url = timeline[this.channelsCamera[camera_id]];
                this.sendWorkerCmd(camera_id, urlReq, url);
            }
        });
        if (
            this.arrayCameras.every(
                (timeline, camera_id) =>
                    this.stateCameras[camera_id] == playerStateIdle,
            )
        ) {
            this.playerStates = playerStatePlaying;
        }
    }

    addFrameToRender(frame) {
        if (this.arrayCameras[frame.i]) {
            this.hideAllDiv(frame.i);
            this.renderWorker.addFrame(frame);
            if (this.stateCameras[frame.i] != playerStatePlaying) {
                this.stateCameras[frame.i] = playerStatePlaying;
                this.retriesCameras[frame.i] = this.retrieveTime;
            }
        } else {
            this.logger.logError(
                "Failed to add frame: src id invalid",
                frame.i,
            );
        }
        if (this.playerStates == playerStateSeeking) {
            this.playerStates = playerStatePlaying;
        }
    }

    addParamsToMem(data) {
        if (this.arrayCameras[data.i]) {
            this.paramCameras[data.i] = {
                vcodec: data.v,
                resolution: `${data.w}x${data.h}`,
            };
            this.onShowVideoParams(data.i, this.paramCameras[data.i]);
        } else {
            this.logger.logError(
                "Failed to add params: src id invalid",
                data.i,
            );
        }
    }

    addTimeTrack(i, s, dur) {}

    updateGridLayout(gridLayout) {
        if (this.renderWorker) {
            this.renderWorker.updateGridLayout(gridLayout);
        }
    }

    updateTimeTrackLine(s = this.pointerSecs, d = this.durationSecs) {
        if (this.timeTrackDiv) {
            this.timeTrackDiv.value = s;
            this.timeTrackDiv.min = 0;
            this.timeTrackDiv.max = d;
        }

        if (this.timeLabelDiv) {
            this.timeLabelDiv.innerHTML =
                this.formatTime(s) + "/" + this.formatTime(d);
        }
        this.onShowTimeTrack(s, d);
    }

    handleErrorCode(data) {
        switch (data.e) {
            case disconnectErr:
                this.retriesCameras[data.i]--;
                if (this.retriesCameras[data.i] <= 0) {
                    this.showOfflineDiv(data.i);
                    break;
                }
                this.showLoadingDiv(data.i);
                this.restartTimer[data.i] = setTimeout(() => {
                    this.sendWorkerCmd(
                        data.i,
                        urlReq,
                        this.arrayCameras[data.i][this.channelsCamera[data.i]],
                    );
                }, this.restartInterval);
                break;
            case eofErr:
                this.stateCameras[data.i] = playerStateIdle;
                this.retriesCameras[data.i] = 0;
                this.showOfflineDiv(data.i);
                break;
            case noDataErr:
            case invalidPLaylistErr:
                this.stateCameras[data.i] = playerStateIdle;
                this.retriesCameras[data.i]--;
                if (this.retriesCameras[data.i] <= 0) {
                    this.showOfflineDiv(data.i);
                    break;
                }
                this.showLoadingDiv(data.i);
                let s_seek =
                    this.pointerSecs -
                    this.arrayCameras[data.i][this.channelsCamera[data.i]][
                        this.idxTimeline[data.i]
                    ]["start"];
                this.restartTimer[data.i] = setTimeout(() => {
                    this.sendWorkerCmd(
                        data.i,
                        urlSeekReq,
                        s_seek,
                        this.arrayCameras[data.i][this.channelsCamera[data.i]][
                            this.idxTimeline[data.i]
                        ]["base_url"],
                    );
                }, this.restartInterval);
                break;
            default:
                this.logger.logInfo(data);
                break;
        }
    }

    showLoadingDiv(i) {
        this.onHideOffline(i);
        this.onShowLoading(i);
    }

    showOfflineDiv(i) {
        this.onHideLoading(i);
        this.onShowOffline(i);
        this.renderWorker.clearFrameData(i);
    }

    hideAllDiv(i) {
        this.onHideLoading(i);
        this.onHideOffline(i);
    }

    defaultShowLoading(i) {
        this.logger.logInfo(`Screen i:${i} show loading div`);
    }

    defaultHideLoading(i) {
        this.logger.logInfo(`Screen i:${i} hide loading div`);
    }

    defaultShowOffline(i) {
        this.logger.logInfo(`Screen i:${i} is offline`);
    }

    defaultHideOffline(i) {
        this.logger.logInfo(`Screen i:${i} is online`);
    }

    defaultTimeTrack(s, dur) {
        this.logger.logInfo(`Screen i:NaN time track ${s}, duration $${dur}`);
    }

    defaultShowVideoParams(i, data) {
        this.logger.logInfo(`Screen i:${i} video info: `, data);
    }

    seekTo(camera_id, s) {
        if (this.restartTimer[camera_id]) {
            clearTimeout(this.restartTimer[camera_id]);
        }
        let channel_n = this.channelsCamera[camera_id];
        let timeline_n = this.arrayCameras[camera_id][channel_n];
        let idxSeek = timeline_n.findIndex(
            (period, idx) => s >= period["start"] && s < period["end"],
        );
        if (idxSeek == -1) {
            this.showOfflineDiv(camera_id);
            this.sendWorkerCmd(camera_id, stopReq);
            idxSeek = timeline_n.findIndex((period, idx) => s < period["end"]);
            this.idxTimeline[camera_id] =
                idxSeek != -1 ? idxSeek : timeline_n.length;
            this.stateCameras[camera_id] = playerStateIdle;
            return;
        }
        this.showLoadingDiv(camera_id);
        let s_seek = s - timeline_n[idxSeek]["start"];
        // if (this.idxTimeline[camera_id] != idxSeek || this.stateCameras[camera_id] == playerStateIdle) {
        if (1) {
            this.idxTimeline[camera_id] = idxSeek;
            this.sendWorkerCmd(
                camera_id,
                urlSeekReq,
                s_seek,
                timeline_n[idxSeek]["base_url"],
            );
        } else {
            this.sendWorkerCmd(camera_id, seekReq, s_seek);
        }
        this.stateCameras[camera_id] = playerStateSeeking;
    }

    setInitialDisplayTime() {
        if (this.isPlayback == false) {
            return;
        }
        this.updateTimeTrackLine();
        if (this.timeTrackDiv) {
            // this.timeTrackDiv.oninput = () => {
            //     if (this.playerStates != playerStateSeeking) {
            //         this.playerStates = playerStateSeeking;
            //         this.pointerSecs = this.timeTrackDiv.value;
            //         this.arrayCameras.forEach((timeline, camera_id) => {
            //             this.seekTo(camera_id, this.pointerSecs);
            //         })
            //         if (this.stateCameras.every(value => value === playerStateIdle)) {
            //             this.playerStates = playerStatePlaying;
            //         }
            //     }
            //     this.updateTimeTrackLine();
            // }
            this.timeTrackDiv.onchange = () => {
                if (this.playerStates != playerStateSeeking) {
                    this.playerStates = playerStateSeeking;
                    this.pointerSecs = this.timeTrackDiv.value;
                    this.arrayCameras.forEach((timeline, camera_id) => {
                        this.seekTo(camera_id, this.pointerSecs);
                    });
                    if (
                        this.stateCameras.every(
                            (value) => value === playerStateIdle,
                        )
                    ) {
                        this.playerStates = playerStatePlaying;
                    }
                }
                this.updateTimeTrackLine();
            };
        }
    }

    setTimeTrackInterval() {
        try {
            if (this.isPlayback == false) {
                return;
            }
            if (this.setIntervalPointer) {
                this.clearTimeTrackInterval();
            }

            this.setIntervalPointer = setInterval(() => {
                if (this.playerStates != playerStatePlaying) {
                    return;
                }

                if (this.retriesCameras.every((value) => value === 0)) {
                    this.clearTimeTrackInterval();
                }

                if (this.pointerSecs >= this.durationSecs) {
                    this.arrayCameras.forEach((timeline, camera_id) => {
                        this.sendWorkerCmd(camera_id, stopReq);
                    });
                    this.showOfflineDiv();
                    return;
                }

                this.arrayCameras.forEach((timeline, camera_id) => {
                    if (this.stateCameras[camera_id] == playerStateIdle) {
                        let channelId = this.channelsCamera[camera_id];
                        let timelineId = this.idxTimeline[camera_id];
                        if (
                            !timeline[channelId].length ||
                            timelineId >= timeline[channelId].length
                        ) {
                            return;
                        }

                        if (
                            this.pointerSecs >=
                            timeline[channelId][timelineId]["end"]
                        ) {
                            this.stateCameras[camera_id] = playerStateIdle;
                            this.showOfflineDiv(camera_id);
                            // if (++timelineId < timeline[channelId].length) {
                            //     this.idxTimeline[camera_id] = timelineId;
                            // }
                            timelineId++;
                            if (timelineId >= timeline[channelId].length) {
                                return;
                            } else {
                                this.idxTimeline[camera_id] = timelineId;
                            }
                        }

                        if (
                            this.pointerSecs ==
                            timeline[channelId][timelineId]["start"]
                        ) {
                            this.showLoadingDiv(camera_id);
                            this.sendWorkerCmd(
                                camera_id,
                                urlReq,
                                timeline[channelId][timelineId]["base_url"],
                            );
                            return;
                        }
                    }
                });
                this.pointerSecs++;
                this.updateTimeTrackLine();
            }, this.pointerInterval);
        } catch (error) {}
    }

    clearTimeTrackInterval() {
        if (this.isPlayback == false) {
            return;
        }
        if (this.setIntervalPointer) {
            clearInterval(this.setIntervalPointer);
        }
    }

    camera2Worker(i) {
        // let id = 0;
        // for (id = 0; id < this.decoderWorkerNo; id++) {
        //     if (i >= id * this.decoderWorkerNo && i < (id + 1) * this.decoderWorkerNo) {
        //         break;
        //     }
        // }
        // return id;
        return i;
    }

    formatTime(s) {
        var h =
            Math.floor(s / 3600) < 10
                ? "0" + Math.floor(s / 3600)
                : Math.floor(s / 3600);
        var m =
            Math.floor((s / 60) % 60) < 10
                ? "0" + Math.floor((s / 60) % 60)
                : Math.floor((s / 60) % 60);
        var s =
            Math.floor(s % 60) < 10
                ? "0" + Math.floor(s % 60)
                : Math.floor(s % 60);
        return h + ":" + m + ":" + s;
    }

    sendWorkerCmd(i, req, value1 = "", value2 = "") {
        let objData = {};
        switch (req) {
            case urlReq:
                objData = {
                    t: urlReq,
                    i: i,
                    u: value1,
                };
                break;
            case startReq:
                objData = {
                    t: startReq,
                    i: i,
                };
                break;
            case stopReq:
                objData = {
                    t: stopReq,
                    i: i,
                };
                break;
            case pauseReq:
                objData = {
                    t: pauseReq,
                    i: i,
                };
                break;
            case resumeReq:
                objData = {
                    t: resumeReq,
                    i: i,
                };
                break;
            case seekReq:
                objData = {
                    t: seekReq,
                    i: i,
                    ts: value1,
                };
                break;
            case speedReq:
                objData = {
                    t: speedReq,
                    i: i,
                    r: value1,
                };
                break;
            case urlSeekReq:
                objData = {
                    t: urlSeekReq,
                    i: i,
                    ts: value1,
                    u: value2,
                };
                break;
            default:
                return;
        }
        this.decoderWorker[this.camera2Worker(i)].postMessage(objData);
    }
}
