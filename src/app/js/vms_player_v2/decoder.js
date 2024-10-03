if ("function" === typeof importScripts) {
    importScripts("utils.js");
    importScripts("core.js");

    class Decoder {
        constructor() {
            this.decCtx = new Map();
            this.urlSrc = new Map();
            this.id = -1;
            this.isDebug = false;
            this.logger = null;
        }

        init(data) {
            this.id = data.id;
            this.isDebug = data.isDebug;
            this.logger = new Logger("Decoder " + this.id, this.isDebug);
        }

        setChannelSource(i, src) {
            if (this.decCtx.has(i)) {
                this.stop(i);
            }
            if (!this.decCtx.has(i)) {
                new VmsDecoder({
                    print: (text) => {},
                    printErr: (text) => {},
                    onAbort: (err) => {},
                }).then((instance) => {
                    this.decCtx.set(i, instance);
                    let ret = instance.cwrap("start", "number", [
                        "number",
                        "string",
                        "number",
                    ])(i, src, this.isDebug ? 1 : 0);
                });
            }
        }

        stop(i) {
            if (this.decCtx.has(i)) {
                let instance = this.decCtx.get(i);
                let ret = instance.cwrap("stop", "number", [])();
                this.decCtx.delete(i);
                instance = null;
            }
        }

        pause(i) {
            if (this.decCtx.has(i)) {
                let instance = this.decCtx.get(i);
                let ret = instance.cwrap("pause", "number", [])();
            }
        }

        resume(i) {
            if (this.decCtx.has(i)) {
                let instance = this.decCtx.get(i);
                let ret = instance.cwrap("resume", "number", [])();
            }
        }

        seek(i, s) {
            if (this.decCtx.has(i)) {
                let instance = this.decCtx.get(i);
                let ret = instance.cwrap("seek", "number", ["number"])(s);
            }
        }

        urlSeek(i, s, u) {
            if (this.decCtx.has(i)) {
                this.stop(i);
            }
            if (!this.decCtx.has(i)) {
                new VmsDecoder({
                    print: (text) => {},
                    printErr: (text) => {},
                    onAbort: (err) => {},
                }).then((instance) => {
                    this.decCtx.set(i, instance);
                    let ret = instance.cwrap("start", "number", [
                        "number",
                        "string",
                        "number",
                    ])(i, u, this.isDebug ? 1 : 0);

                    ret = instance.cwrap("seek", "number", ["number"])(s);
                });
            }
        }

        speed(i, rate) {
            if (this.decCtx.has(i)) {
                let instance = this.decCtx.get(i);
                let ret = instance.cwrap("speed", "number", ["number"])(rate);
                console.log("speed cmd ret", i, ret, rate);
            }
        }
    }

    self.decoder = new Decoder();

    self.onmessage = (evt) => {
        let objData = evt.data;
        switch (objData.t) {
            case initReq:
                self.decoder.init(objData);
                break;
            case urlReq:
                self.decoder.setChannelSource(objData.i, objData.u);
                break;
            case stopReq:
                self.decoder.stop(objData.i);
                break;
            case pauseReq:
                self.decoder.pause(objData.i);
                break;
            case resumeReq:
                self.decoder.resume(objData.i);
                break;
            case seekReq:
                self.decoder.seek(objData.i, objData.ts);
                break;
            case urlSeekReq:
                self.decoder.urlSeek(objData.i, objData.ts, objData.u);
                break;
            case speedReq:
                self.decoder.speed(objData.i, objData.r);
                break;
            default:
                this.logger.logInfo(objData);
                break;
        }
    };

    self.postMessage({
        t: readyRes,
    });
}
