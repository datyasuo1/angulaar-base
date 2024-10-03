"use strict";
var Module = {};
function assert(condition, text) {
    if (!condition) abort("Assertion failed: " + text);
}
function threadPrintErr() {
    var text = Array.prototype.slice.call(arguments).join(" ");
}
function threadAlert() {
    var text = Array.prototype.slice.call(arguments).join(" ");
    postMessage({
        cmd: "alert",
        text: text,
        threadId: Module["_pthread_self"](),
    });
}
var out = () => {
    throw "out() is not defined in worker.js.";
};
var err = threadPrintErr;
self.alert = threadAlert;
Module["instantiateWasm"] = (info, receiveInstance) => {
    var instance = new WebAssembly.Instance(Module["wasmModule"], info);
    receiveInstance(instance);
    Module["wasmModule"] = null;
    return instance.exports;
};
self.onmessage = (e) => {
    try {
        if (e.data.cmd === "load") {
            Module["wasmModule"] = e.data.wasmModule;
            Module["wasmMemory"] = e.data.wasmMemory;
            Module["buffer"] = Module["wasmMemory"].buffer;
            Module["ENVIRONMENT_IS_PTHREAD"] = true;
            if (typeof e.data.urlOrBlob == "string") {
                importScripts(e.data.urlOrBlob);
            } else {
                var objectUrl = URL.createObjectURL(e.data.urlOrBlob);
                importScripts(objectUrl);
                URL.revokeObjectURL(objectUrl);
            }
            VmsDecoder(Module).then(function (instance) {
                Module = instance;
            });
        } else if (e.data.cmd === "run") {
            Module["__performance_now_clock_drift"] =
                performance.now() - e.data.time;
            Module["__emscripten_thread_init"](
                e.data.threadInfoStruct,
                0,
                0,
                1,
            );
            assert(e.data.threadInfoStruct);
            Module["establishStackSpace"]();
            Module["PThread"].receiveObjectTransfer(e.data);
            Module["PThread"].threadInit();
            try {
                var result = Module["invokeEntryPoint"](
                    e.data.start_routine,
                    e.data.arg,
                );
                Module["checkStackCookie"]();
                if (Module["keepRuntimeAlive"]()) {
                    Module["PThread"].setExitStatus(result);
                } else {
                    Module["__emscripten_thread_exit"](result);
                }
            } catch (ex) {
                if (ex != "unwind") {
                    if (ex instanceof Module["ExitStatus"]) {
                        if (Module["keepRuntimeAlive"]()) {
                            err(
                                "Pthread 0x" +
                                    Module["_pthread_self"]().toString(16) +
                                    " called exit(), staying alive due to noExitRuntime.",
                            );
                        } else {
                            err(
                                "Pthread 0x" +
                                    Module["_pthread_self"]().toString(16) +
                                    " called exit(), calling _emscripten_thread_exit.",
                            );
                            Module["__emscripten_thread_exit"](ex.status);
                        }
                    } else {
                        throw ex;
                    }
                } else {
                    err(
                        "Pthread 0x" +
                            Module["_pthread_self"]().toString(16) +
                            " completed its main entry point with an `unwind`, keeping the worker alive for asynchronous operation.",
                    );
                }
            }
        } else if (e.data.cmd === "cancel") {
            if (Module["_pthread_self"]()) {
                Module["__emscripten_thread_exit"](-1);
            }
        } else if (e.data.target === "setimmediate") {
        } else if (e.data.cmd === "processProxyingQueue") {
            if (Module["_pthread_self"]()) {
                Module["_emscripten_proxy_execute_queue"](e.data.queue);
            }
            Atomics.sub(HEAP32, e.data.queue >> 2, 1);
        } else {
            err("worker.js received unknown command " + e.data.cmd);
            err(e.data);
        }
    } catch (ex) {
        err("worker.js onmessage() captured an uncaught exception: " + ex);
        if (ex && ex.stack) err(ex.stack);
        if (Module["__emscripten_thread_crashed"]) {
            Module["__emscripten_thread_crashed"]();
        }
        throw ex;
    }
};
