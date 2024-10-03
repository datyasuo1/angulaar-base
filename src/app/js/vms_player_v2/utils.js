function Logger(moduleName = "default", isDebug = false) {
    this.module = moduleName;
    this.isDebug = isDebug;
}

Logger.prototype.log = function (...args) {
    if (this.isDebug)
        console.log(
            "[" + this.currentTimeStr() + "][" + this.module + "]",
            args,
        );
};

Logger.prototype.logError = function (...args) {
    console.error(
        "[" + this.currentTimeStr() + "][" + this.module + "][ER] ",
        args,
    );
};

Logger.prototype.logInfo = function (...args) {
    if (this.isDebug)
        console.log(
            "[" + this.currentTimeStr() + "][" + this.module + "][IF] ",
            args,
        );
};

Logger.prototype.logDebug = function (...args) {
    if (this.isDebug)
        console.debug(
            "[" + this.currentTimeStr() + "][" + this.module + "][DB] ",
            args,
        );
};

Logger.prototype.currentTimeStr = function () {
    var now = new Date(Date.now());
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var ms = now.getMilliseconds();
    return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        min +
        ":" +
        sec +
        ":" +
        ms
    );
};

//define type source
const sourceWsLive = 0;
const sourceHlsLive = 0;
const sourceHlsPlayback = 0;

//define decoder request
const initReq = 0;
const urlReq = 1;
const startReq = 2;
const stopReq = 3;
const pauseReq = 4;
const resumeReq = 5;
const seekReq = 6;
const speedReq = 7;
const urlSeekReq = 8;

//define decoder response
const readyRes = 0;
const renderRes = 1;
const audioRes = 2;
const paramsRes = 3;
const timeLineRes = 4;
const errorRes = 5;

//define error code
const noneErr = 0;
const disconnectErr = 1;
const eofErr = 2;
const noDataErr = 3;
const invalidPLaylistErr = 4;

//define player states
const playerStateIdle = 0;
const playerStatePlaying = 1;
const playerStatePausing = 2;
const playerStateSeeking = 3;
