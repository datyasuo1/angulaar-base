var VmsDecoder = (() => {
    var _scriptDir =
        typeof document !== "undefined" && document.currentScript
            ? document.currentScript.src
            : undefined;

    return function (VmsDecoder) {
        VmsDecoder = VmsDecoder || {};

        function GROWABLE_HEAP_I8() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAP8;
        }
        function GROWABLE_HEAP_U8() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAPU8;
        }
        function GROWABLE_HEAP_I16() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAP16;
        }
        function GROWABLE_HEAP_U16() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAPU16;
        }
        function GROWABLE_HEAP_I32() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAP32;
        }
        function GROWABLE_HEAP_U32() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAPU32;
        }
        function GROWABLE_HEAP_F32() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAPF32;
        }
        function GROWABLE_HEAP_F64() {
            if (wasmMemory.buffer != buffer) {
                updateGlobalBufferAndViews(wasmMemory.buffer);
            }
            return HEAPF64;
        }
        var Module = typeof VmsDecoder != "undefined" ? VmsDecoder : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function (resolve, reject) {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
        });
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_main")) {
            Object.defineProperty(Module["ready"], "_main", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _main on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_main", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _main on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_start")) {
            Object.defineProperty(Module["ready"], "_start", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _start on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_start", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _start on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_stop")) {
            Object.defineProperty(Module["ready"], "_stop", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _stop on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_stop", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _stop on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_pause")) {
            Object.defineProperty(Module["ready"], "_pause", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _pause on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_pause", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _pause on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_resume")) {
            Object.defineProperty(Module["ready"], "_resume", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _resume on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_resume", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _resume on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_seek")) {
            Object.defineProperty(Module["ready"], "_seek", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _seek on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_seek", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _seek on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (!Object.getOwnPropertyDescriptor(Module["ready"], "_speed")) {
            Object.defineProperty(Module["ready"], "_speed", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _speed on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_speed", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _speed on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "__emscripten_thread_init",
            )
        ) {
            Object.defineProperty(Module["ready"], "__emscripten_thread_init", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting __emscripten_thread_init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "__emscripten_thread_init", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting __emscripten_thread_init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "__emscripten_thread_exit",
            )
        ) {
            Object.defineProperty(Module["ready"], "__emscripten_thread_exit", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting __emscripten_thread_exit on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "__emscripten_thread_exit", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting __emscripten_thread_exit on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "__emscripten_thread_crashed",
            )
        ) {
            Object.defineProperty(
                Module["ready"],
                "__emscripten_thread_crashed",
                {
                    configurable: true,
                    get: function () {
                        abort(
                            "You are getting __emscripten_thread_crashed on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                        );
                    },
                },
            );
            Object.defineProperty(
                Module["ready"],
                "__emscripten_thread_crashed",
                {
                    configurable: true,
                    set: function () {
                        abort(
                            "You are setting __emscripten_thread_crashed on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                        );
                    },
                },
            );
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "_emscripten_tls_init",
            )
        ) {
            Object.defineProperty(Module["ready"], "_emscripten_tls_init", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _emscripten_tls_init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_emscripten_tls_init", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _emscripten_tls_init on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(Module["ready"], "_pthread_self")
        ) {
            Object.defineProperty(Module["ready"], "_pthread_self", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting _pthread_self on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "_pthread_self", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting _pthread_self on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "establishStackSpace",
            )
        ) {
            Object.defineProperty(Module["ready"], "establishStackSpace", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting establishStackSpace on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "establishStackSpace", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting establishStackSpace on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "invokeEntryPoint",
            )
        ) {
            Object.defineProperty(Module["ready"], "invokeEntryPoint", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting invokeEntryPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "invokeEntryPoint", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting invokeEntryPoint on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(Module["ready"], "___stdio_exit")
        ) {
            Object.defineProperty(Module["ready"], "___stdio_exit", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting ___stdio_exit on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "___stdio_exit", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting ___stdio_exit on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "_emscripten_proxy_execute_queue",
            )
        ) {
            Object.defineProperty(
                Module["ready"],
                "_emscripten_proxy_execute_queue",
                {
                    configurable: true,
                    get: function () {
                        abort(
                            "You are getting _emscripten_proxy_execute_queue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                        );
                    },
                },
            );
            Object.defineProperty(
                Module["ready"],
                "_emscripten_proxy_execute_queue",
                {
                    configurable: true,
                    set: function () {
                        abort(
                            "You are setting _emscripten_proxy_execute_queue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                        );
                    },
                },
            );
        }
        if (
            !Object.getOwnPropertyDescriptor(
                Module["ready"],
                "onRuntimeInitialized",
            )
        ) {
            Object.defineProperty(Module["ready"], "onRuntimeInitialized", {
                configurable: true,
                get: function () {
                    abort(
                        "You are getting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
            Object.defineProperty(Module["ready"], "onRuntimeInitialized", {
                configurable: true,
                set: function () {
                    abort(
                        "You are setting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
                    );
                },
            });
        }
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
            throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = false;
        var ENVIRONMENT_IS_WORKER = true;
        var ENVIRONMENT_IS_NODE = false;
        var ENVIRONMENT_IS_SHELL = false;
        if (Module["ENVIRONMENT"]) {
            throw new Error(
                "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)",
            );
        }
        var ENVIRONMENT_IS_PTHREAD = Module["ENVIRONMENT_IS_PTHREAD"] || false;
        var scriptDirectory = "";
        function locateFile(path) {
            if (Module["locateFile"]) {
                return Module["locateFile"](path, scriptDirectory);
            }
            return scriptDirectory + path;
        }
        var read_, readAsync, readBinary, setWindowTitle;
        function logExceptionOnExit(e) {
            if (e instanceof ExitStatus) return;
            let toLog = e;
            if (e && typeof e == "object" && e.stack) {
                toLog = [e, e.stack];
            }
            err("exiting due to exception: " + toLog);
        }
        if (ENVIRONMENT_IS_SHELL) {
            if (
                (typeof process == "object" && typeof require === "function") ||
                typeof window == "object" ||
                typeof importScripts == "function"
            )
                throw new Error(
                    "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                );
            if (typeof read != "undefined") {
                read_ = function shell_read(f) {
                    return read(f);
                };
            }
            readBinary = function readBinary(f) {
                let data;
                if (typeof readbuffer == "function") {
                    return new Uint8Array(readbuffer(f));
                }
                data = read(f, "binary");
                assert(typeof data == "object");
                return data;
            };
            readAsync = function readAsync(f, onload, onerror) {
                setTimeout(() => onload(readBinary(f)), 0);
            };
            if (typeof scriptArgs != "undefined") {
                arguments_ = scriptArgs;
            } else if (typeof arguments != "undefined") {
                arguments_ = arguments;
            }
            if (typeof quit == "function") {
                quit_ = (status, toThrow) => {
                    logExceptionOnExit(toThrow);
                    quit(status);
                };
            }
            if (typeof print != "undefined") {
                if (typeof console == "undefined") console = {};
                console.log = print;
                console.warn = console.error =
                    typeof printErr != "undefined" ? printErr : print;
            }
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            } else if (
                typeof document != "undefined" &&
                document.currentScript
            ) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(
                    0,
                    scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1,
                );
            } else {
                scriptDirectory = "";
            }
            if (
                !(
                    typeof window == "object" ||
                    typeof importScripts == "function"
                )
            )
                throw new Error(
                    "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
                );
            {
                read_ = (url) => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    return xhr.responseText;
                };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = (url) => {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response);
                    };
                }
                readAsync = (url, onload, onerror) => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = () => {
                        if (
                            xhr.status == 200 ||
                            (xhr.status == 0 && xhr.response)
                        ) {
                            onload(xhr.response);
                            return;
                        }
                        onerror();
                    };
                    xhr.onerror = onerror;
                    xhr.send(null);
                };
            }
            setWindowTitle = (title) => (document.title = title);
        } else {
            throw new Error("environment detection error");
        }
        var out = Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        checkIncomingModuleAPI();
        if (Module["arguments"]) arguments_ = Module["arguments"];
        legacyModuleProp("arguments", "arguments_");
        if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
        legacyModuleProp("thisProgram", "thisProgram");
        if (Module["quit"]) quit_ = Module["quit"];
        legacyModuleProp("quit", "quit_");
        assert(
            typeof Module["memoryInitializerPrefixURL"] == "undefined",
            "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead",
        );
        assert(
            typeof Module["pthreadMainPrefixURL"] == "undefined",
            "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead",
        );
        assert(
            typeof Module["cdInitializerPrefixURL"] == "undefined",
            "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead",
        );
        assert(
            typeof Module["filePackagePrefixURL"] == "undefined",
            "Module.filePackagePrefixURL option was removed, use Module.locateFile instead",
        );
        assert(
            typeof Module["read"] == "undefined",
            "Module.read option was removed (modify read_ in JS)",
        );
        assert(
            typeof Module["readAsync"] == "undefined",
            "Module.readAsync option was removed (modify readAsync in JS)",
        );
        assert(
            typeof Module["readBinary"] == "undefined",
            "Module.readBinary option was removed (modify readBinary in JS)",
        );
        assert(
            typeof Module["setWindowTitle"] == "undefined",
            "Module.setWindowTitle option was removed (modify setWindowTitle in JS)",
        );
        assert(
            typeof Module["TOTAL_MEMORY"] == "undefined",
            "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY",
        );
        legacyModuleProp("read", "read_");
        legacyModuleProp("readAsync", "readAsync");
        legacyModuleProp("readBinary", "readBinary");
        legacyModuleProp("setWindowTitle", "setWindowTitle");
        assert(
            ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER || ENVIRONMENT_IS_NODE,
            "Pthreads do not work in this environment yet (need Web Workers, or an alternative to them)",
        );
        assert(
            !ENVIRONMENT_IS_WEB,
            "web environment detected but not enabled at build time.  Add 'web' to `-s ENVIRONMENT` to enable.",
        );
        assert(
            !ENVIRONMENT_IS_NODE,
            "node environment detected but not enabled at build time.  Add 'node' to `-s ENVIRONMENT` to enable.",
        );
        assert(
            !ENVIRONMENT_IS_SHELL,
            "shell environment detected but not enabled at build time.  Add 'shell' to `-s ENVIRONMENT` to enable.",
        );
        var POINTER_SIZE = 4;
        function warnOnce(text) {
            if (!warnOnce.shown) warnOnce.shown = {};
            if (!warnOnce.shown[text]) {
                warnOnce.shown[text] = 1;
                err(text);
            }
        }
        function convertJsFunctionToWasm(func, sig) {
            if (typeof WebAssembly.Function == "function") {
                var typeNames = { i: "i32", j: "i64", f: "f32", d: "f64" };
                var type = {
                    parameters: [],
                    results: sig[0] == "v" ? [] : [typeNames[sig[0]]],
                };
                for (var i = 1; i < sig.length; ++i) {
                    type.parameters.push(typeNames[sig[i]]);
                }
                return new WebAssembly.Function(type, func);
            }
            var typeSection = [1, 0, 1, 96];
            var sigRet = sig.slice(0, 1);
            var sigParam = sig.slice(1);
            var typeCodes = { i: 127, j: 126, f: 125, d: 124 };
            typeSection.push(sigParam.length);
            for (var i = 0; i < sigParam.length; ++i) {
                typeSection.push(typeCodes[sigParam[i]]);
            }
            if (sigRet == "v") {
                typeSection.push(0);
            } else {
                typeSection = typeSection.concat([1, typeCodes[sigRet]]);
            }
            typeSection[1] = typeSection.length - 2;
            var bytes = new Uint8Array(
                [0, 97, 115, 109, 1, 0, 0, 0].concat(
                    typeSection,
                    [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0],
                ),
            );
            var module = new WebAssembly.Module(bytes);
            var instance = new WebAssembly.Instance(module, { e: { f: func } });
            var wrappedFunc = instance.exports["f"];
            return wrappedFunc;
        }
        var freeTableIndexes = [];
        var functionsInTableMap;
        function getEmptyTableSlot() {
            if (freeTableIndexes.length) {
                return freeTableIndexes.pop();
            }
            try {
                wasmTable.grow(1);
            } catch (err) {
                if (!(err instanceof RangeError)) {
                    throw err;
                }
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
            }
            return wasmTable.length - 1;
        }
        function updateTableMap(offset, count) {
            for (var i = offset; i < offset + count; i++) {
                var item = getWasmTableEntry(i);
                if (item) {
                    functionsInTableMap.set(item, i);
                }
            }
        }
        function legacyModuleProp(prop, newName) {
            if (!Object.getOwnPropertyDescriptor(Module, prop)) {
                Object.defineProperty(Module, prop, {
                    configurable: true,
                    get: function () {
                        abort(
                            "Module." +
                                prop +
                                " has been replaced with plain " +
                                newName +
                                " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)",
                        );
                    },
                });
            }
        }
        function ignoredModuleProp(prop) {
            if (Object.getOwnPropertyDescriptor(Module, prop)) {
                abort(
                    "`Module." +
                        prop +
                        "` was supplied but `" +
                        prop +
                        "` not included in INCOMING_MODULE_JS_API",
                );
            }
        }
        function unexportedMessage(sym, isFSSybol) {
            var msg =
                "'" +
                sym +
                "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
            if (isFSSybol) {
                msg +=
                    ". Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you";
            }
            return msg;
        }
        function unexportedRuntimeSymbol(sym, isFSSybol) {
            if (!Object.getOwnPropertyDescriptor(Module, sym)) {
                Object.defineProperty(Module, sym, {
                    configurable: true,
                    get: function () {
                        abort(unexportedMessage(sym, isFSSybol));
                    },
                });
            }
        }
        function unexportedRuntimeFunction(sym, isFSSybol) {
            if (!Object.getOwnPropertyDescriptor(Module, sym)) {
                Module[sym] = () => abort(unexportedMessage(sym, isFSSybol));
            }
        }
        var tempRet0 = 0;
        var setTempRet0 = (value) => {
            tempRet0 = value;
        };
        var Atomics_load = Atomics.load;
        var Atomics_store = Atomics.store;
        var Atomics_compareExchange = Atomics.compareExchange;
        var wasmBinary;
        if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
        legacyModuleProp("wasmBinary", "wasmBinary");
        var noExitRuntime = Module["noExitRuntime"] || true;
        legacyModuleProp("noExitRuntime", "noExitRuntime");
        if (typeof WebAssembly != "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var wasmModule;
        var ABORT = false;
        var EXITSTATUS;
        function assert(condition, text) {
            if (!condition) {
                abort("Assertion failed" + (text ? ": " + text : ""));
            }
        }
        function getCFunc(ident) {
            var func = Module["_" + ident];
            assert(
                func,
                "Cannot call unknown function " +
                    ident +
                    ", make sure it is exported",
            );
            return func;
        }
        function ccall(ident, returnType, argTypes, args, opts) {
            var toC = {
                string: function (str) {
                    var ret = 0;
                    if (str !== null && str !== undefined && str !== 0) {
                        var len = (str.length << 2) + 1;
                        ret = stackAlloc(len);
                        stringToUTF8(str, ret, len);
                    }
                    return ret;
                },
                array: function (arr) {
                    var ret = stackAlloc(arr.length);
                    writeArrayToMemory(arr, ret);
                    return ret;
                },
            };
            function convertReturnValue(ret) {
                if (returnType === "string") return UTF8ToString(ret);
                if (returnType === "boolean") return Boolean(ret);
                return ret;
            }
            var func = getCFunc(ident);
            var cArgs = [];
            var stack = 0;
            assert(
                returnType !== "array",
                'Return type should not be "array".',
            );
            if (args) {
                for (var i = 0; i < args.length; i++) {
                    var converter = toC[argTypes[i]];
                    if (converter) {
                        if (stack === 0) stack = stackSave();
                        cArgs[i] = converter(args[i]);
                    } else {
                        cArgs[i] = args[i];
                    }
                }
            }
            var ret = func.apply(null, cArgs);
            function onDone(ret) {
                if (stack !== 0) stackRestore(stack);
                return convertReturnValue(ret);
            }
            ret = onDone(ret);
            return ret;
        }
        function cwrap(ident, returnType, argTypes, opts) {
            return function () {
                return ccall(ident, returnType, argTypes, arguments, opts);
            };
        }
        var ALLOC_STACK = 1;
        var UTF8Decoder =
            typeof TextDecoder != "undefined"
                ? new TextDecoder("utf8")
                : undefined;
        function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
            var endIdx = idx + maxBytesToRead;
            var endPtr = idx;
            while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
            if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
                return UTF8Decoder.decode(
                    heapOrArray.buffer instanceof SharedArrayBuffer
                        ? heapOrArray.slice(idx, endPtr)
                        : heapOrArray.subarray(idx, endPtr),
                );
            } else {
                var str = "";
                while (idx < endPtr) {
                    var u0 = heapOrArray[idx++];
                    if (!(u0 & 128)) {
                        str += String.fromCharCode(u0);
                        continue;
                    }
                    var u1 = heapOrArray[idx++] & 63;
                    if ((u0 & 224) == 192) {
                        str += String.fromCharCode(((u0 & 31) << 6) | u1);
                        continue;
                    }
                    var u2 = heapOrArray[idx++] & 63;
                    if ((u0 & 240) == 224) {
                        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
                    } else {
                        if ((u0 & 248) != 240)
                            warnOnce(
                                "Invalid UTF-8 leading byte 0x" +
                                    u0.toString(16) +
                                    " encountered when deserializing a UTF-8 string in wasm memory to a JS string!",
                            );
                        u0 =
                            ((u0 & 7) << 18) |
                            (u1 << 12) |
                            (u2 << 6) |
                            (heapOrArray[idx++] & 63);
                    }
                    if (u0 < 65536) {
                        str += String.fromCharCode(u0);
                    } else {
                        var ch = u0 - 65536;
                        str += String.fromCharCode(
                            55296 | (ch >> 10),
                            56320 | (ch & 1023),
                        );
                    }
                }
            }
            return str;
        }
        function UTF8ToString(ptr, maxBytesToRead) {
            return ptr
                ? UTF8ArrayToString(GROWABLE_HEAP_U8(), ptr, maxBytesToRead)
                : "";
        }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
            if (!(maxBytesToWrite > 0)) return 0;
            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1;
            for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343) {
                    var u1 = str.charCodeAt(++i);
                    u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
                }
                if (u <= 127) {
                    if (outIdx >= endIdx) break;
                    heap[outIdx++] = u;
                } else if (u <= 2047) {
                    if (outIdx + 1 >= endIdx) break;
                    heap[outIdx++] = 192 | (u >> 6);
                    heap[outIdx++] = 128 | (u & 63);
                } else if (u <= 65535) {
                    if (outIdx + 2 >= endIdx) break;
                    heap[outIdx++] = 224 | (u >> 12);
                    heap[outIdx++] = 128 | ((u >> 6) & 63);
                    heap[outIdx++] = 128 | (u & 63);
                } else {
                    if (outIdx + 3 >= endIdx) break;
                    if (u > 1114111)
                        warnOnce(
                            "Invalid Unicode code point 0x" +
                                u.toString(16) +
                                " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).",
                        );
                    heap[outIdx++] = 240 | (u >> 18);
                    heap[outIdx++] = 128 | ((u >> 12) & 63);
                    heap[outIdx++] = 128 | ((u >> 6) & 63);
                    heap[outIdx++] = 128 | (u & 63);
                }
            }
            heap[outIdx] = 0;
            return outIdx - startIdx;
        }
        function stringToUTF8(str, outPtr, maxBytesToWrite) {
            assert(
                typeof maxBytesToWrite == "number",
                "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!",
            );
            return stringToUTF8Array(
                str,
                GROWABLE_HEAP_U8(),
                outPtr,
                maxBytesToWrite,
            );
        }
        function lengthBytesUTF8(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343)
                    u =
                        (65536 + ((u & 1023) << 10)) |
                        (str.charCodeAt(++i) & 1023);
                if (u <= 127) ++len;
                else if (u <= 2047) len += 2;
                else if (u <= 65535) len += 3;
                else len += 4;
            }
            return len;
        }
        var UTF16Decoder =
            typeof TextDecoder != "undefined"
                ? new TextDecoder("utf-16le")
                : undefined;
        function allocateUTF8(str) {
            var size = lengthBytesUTF8(str) + 1;
            var ret = _malloc(size);
            if (ret) stringToUTF8Array(str, GROWABLE_HEAP_I8(), ret, size);
            return ret;
        }
        function allocateUTF8OnStack(str) {
            var size = lengthBytesUTF8(str) + 1;
            var ret = stackAlloc(size);
            stringToUTF8Array(str, GROWABLE_HEAP_I8(), ret, size);
            return ret;
        }
        function writeArrayToMemory(array, buffer) {
            assert(
                array.length >= 0,
                "writeArrayToMemory array must have a length (should be an array or typed array)",
            );
            GROWABLE_HEAP_I8().set(array, buffer);
        }
        function writeAsciiToMemory(str, buffer, dontAddNull) {
            for (var i = 0; i < str.length; ++i) {
                assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
                GROWABLE_HEAP_I8()[buffer++ >> 0] = str.charCodeAt(i);
            }
            if (!dontAddNull) GROWABLE_HEAP_I8()[buffer >> 0] = 0;
        }
        var buffer,
            HEAP8,
            HEAPU8,
            HEAP16,
            HEAPU16,
            HEAP32,
            HEAPU32,
            HEAPF32,
            HEAPF64;
        if (ENVIRONMENT_IS_PTHREAD) {
            buffer = Module["buffer"];
        }
        function updateGlobalBufferAndViews(buf) {
            buffer = buf;
            Module["HEAP8"] = HEAP8 = new Int8Array(buf);
            Module["HEAP16"] = HEAP16 = new Int16Array(buf);
            Module["HEAP32"] = HEAP32 = new Int32Array(buf);
            Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
            Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
            Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
            Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
            Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
        }
        var TOTAL_STACK = 5242880;
        if (Module["TOTAL_STACK"])
            assert(
                TOTAL_STACK === Module["TOTAL_STACK"],
                "the stack size can no longer be determined at runtime",
            );
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 33554432;
        legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
        assert(
            INITIAL_MEMORY >= TOTAL_STACK,
            "INITIAL_MEMORY should be larger than TOTAL_STACK, was " +
                INITIAL_MEMORY +
                "! (TOTAL_STACK=" +
                TOTAL_STACK +
                ")",
        );
        assert(
            typeof Int32Array != "undefined" &&
                typeof Float64Array !== "undefined" &&
                Int32Array.prototype.subarray != undefined &&
                Int32Array.prototype.set != undefined,
            "JS engine does not provide full typed array support",
        );
        if (ENVIRONMENT_IS_PTHREAD) {
            wasmMemory = Module["wasmMemory"];
            buffer = Module["buffer"];
        } else {
            if (Module["wasmMemory"]) {
                wasmMemory = Module["wasmMemory"];
            } else {
                wasmMemory = new WebAssembly.Memory({
                    initial: INITIAL_MEMORY / 65536,
                    maximum: 2147483648 / 65536,
                    shared: true,
                });
                if (!(wasmMemory.buffer instanceof SharedArrayBuffer)) {
                    err(
                        "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag",
                    );
                    if (ENVIRONMENT_IS_NODE) {
                        console.log(
                            "(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)",
                        );
                    }
                    throw Error("bad memory");
                }
            }
        }
        if (wasmMemory) {
            buffer = wasmMemory.buffer;
        }
        INITIAL_MEMORY = buffer.byteLength;
        assert(INITIAL_MEMORY % 65536 === 0);
        updateGlobalBufferAndViews(buffer);
        var wasmTable;
        function writeStackCookie() {
            var max = _emscripten_stack_get_end();
            assert((max & 3) == 0);
            GROWABLE_HEAP_I32()[max >> 2] = 34821223;
            GROWABLE_HEAP_I32()[(max + 4) >> 2] = 2310721022;
            GROWABLE_HEAP_I32()[0] = 1668509029;
        }
        function checkStackCookie() {
            if (ABORT) return;
            var max = _emscripten_stack_get_end();
            var cookie1 = GROWABLE_HEAP_U32()[max >> 2];
            var cookie2 = GROWABLE_HEAP_U32()[(max + 4) >> 2];
            if (cookie1 != 34821223 || cookie2 != 2310721022) {
                abort(
                    "Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" +
                        cookie2.toString(16) +
                        " 0x" +
                        cookie1.toString(16),
                );
            }
            if (GROWABLE_HEAP_I32()[0] !== 1668509029)
                abort(
                    "Runtime error: The application has corrupted its heap memory area (address zero)!",
                );
        }
        (function () {
            var h16 = new Int16Array(1);
            var h8 = new Int8Array(h16.buffer);
            h16[0] = 25459;
            if (h8[0] !== 115 || h8[1] !== 99)
                throw "Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)";
        })();
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATMAIN__ = [];
        var __ATPOSTRUN__ = [];
        var runtimeInitialized = false;
        function keepRuntimeAlive() {
            return noExitRuntime;
        }
        function preRun() {
            assert(!ENVIRONMENT_IS_PTHREAD);
            if (Module["preRun"]) {
                if (typeof Module["preRun"] == "function")
                    Module["preRun"] = [Module["preRun"]];
                while (Module["preRun"].length) {
                    addOnPreRun(Module["preRun"].shift());
                }
            }
            callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
            checkStackCookie();
            assert(!runtimeInitialized);
            runtimeInitialized = true;
            if (ENVIRONMENT_IS_PTHREAD) return;
            if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
            FS.ignorePermissions = false;
            TTY.init();
            callRuntimeCallbacks(__ATINIT__);
        }
        function preMain() {
            checkStackCookie();
            if (ENVIRONMENT_IS_PTHREAD) return;
            callRuntimeCallbacks(__ATMAIN__);
        }
        function postRun() {
            checkStackCookie();
            if (ENVIRONMENT_IS_PTHREAD) return;
            if (Module["postRun"]) {
                if (typeof Module["postRun"] == "function")
                    Module["postRun"] = [Module["postRun"]];
                while (Module["postRun"].length) {
                    addOnPostRun(Module["postRun"].shift());
                }
            }
            callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
            __ATPRERUN__.unshift(cb);
        }
        function addOnInit(cb) {
            __ATINIT__.unshift(cb);
        }
        function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb);
        }
        assert(
            Math.imul,
            "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
        );
        assert(
            Math.fround,
            "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
        );
        assert(
            Math.clz32,
            "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
        );
        assert(
            Math.trunc,
            "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
        );
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        var runDependencyTracking = {};
        function getUniqueRunDependency(id) {
            var orig = id;
            while (1) {
                if (!runDependencyTracking[id]) return id;
                id = orig + Math.random();
            }
        }
        function addRunDependency(id) {
            runDependencies++;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            }
            if (id) {
                assert(!runDependencyTracking[id]);
                runDependencyTracking[id] = 1;
                if (
                    runDependencyWatcher === null &&
                    typeof setInterval != "undefined"
                ) {
                    runDependencyWatcher = setInterval(function () {
                        if (ABORT) {
                            clearInterval(runDependencyWatcher);
                            runDependencyWatcher = null;
                            return;
                        }
                        var shown = false;
                        for (var dep in runDependencyTracking) {
                            if (!shown) {
                                shown = true;
                                err("still waiting on run dependencies:");
                            }
                            err("dependency: " + dep);
                        }
                        if (shown) {
                            err("(end of list)");
                        }
                    }, 1e4);
                }
            } else {
                err("warning: run dependency added without ID");
            }
        }
        function removeRunDependency(id) {
            runDependencies--;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            }
            if (id) {
                assert(runDependencyTracking[id]);
                delete runDependencyTracking[id];
            } else {
                err("warning: run dependency removed without ID");
            }
            if (runDependencies == 0) {
                if (runDependencyWatcher !== null) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null;
                }
                if (dependenciesFulfilled) {
                    var callback = dependenciesFulfilled;
                    dependenciesFulfilled = null;
                    callback();
                }
            }
        }
        Module["preloadedImages"] = {};
        Module["preloadedAudios"] = {};
        function abort(what) {
            if (ENVIRONMENT_IS_PTHREAD) {
                postMessage({ cmd: "onAbort", arg: what });
            } else {
                if (Module["onAbort"]) {
                    Module["onAbort"](what);
                }
            }
            what = "Aborted(" + what + ")";
            err(what);
            ABORT = true;
            EXITSTATUS = 1;
            var e = new WebAssembly.RuntimeError(what);
            readyPromiseReject(e);
            throw e;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
            return filename.startsWith(dataURIPrefix);
        }
        function isFileURI(filename) {
            return filename.startsWith("file://");
        }
        function createExportWrapper(name, fixedasm) {
            return function () {
                var displayName = name;
                var asm = fixedasm;
                if (!fixedasm) {
                    asm = Module["asm"];
                }
                assert(
                    runtimeInitialized,
                    "native function `" +
                        displayName +
                        "` called before runtime initialization",
                );
                if (!asm[name]) {
                    assert(
                        asm[name],
                        "exported native function `" +
                            displayName +
                            "` not found",
                    );
                }
                return asm[name].apply(null, arguments);
            };
        }
        var wasmBinaryFile;
        wasmBinaryFile = "core.wasm";
        if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
        }
        function getBinary(file) {
            try {
                if (file == wasmBinaryFile && wasmBinary) {
                    return new Uint8Array(wasmBinary);
                }
                if (readBinary) {
                    return readBinary(file);
                } else {
                    throw "both async and sync fetching of the wasm failed";
                }
            } catch (err) {
                abort(err);
            }
        }
        function getBinaryPromise() {
            if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if (typeof fetch == "function") {
                    return fetch(wasmBinaryFile, { credentials: "same-origin" })
                        .then(function (response) {
                            if (!response["ok"]) {
                                throw (
                                    "failed to load wasm binary file at '" +
                                    wasmBinaryFile +
                                    "'"
                                );
                            }
                            return response["arrayBuffer"]();
                        })
                        .catch(function () {
                            return getBinary(wasmBinaryFile);
                        });
                }
            }
            return Promise.resolve().then(function () {
                return getBinary(wasmBinaryFile);
            });
        }
        function createWasm() {
            var info = {
                env: asmLibraryArg,
                wasi_snapshot_preview1: asmLibraryArg,
            };
            function receiveInstance(instance, module) {
                var exports = instance.exports;
                Module["asm"] = exports;
                registerTlsInit(Module["asm"]["emscripten_tls_init"]);
                wasmTable = Module["asm"]["__indirect_function_table"];
                assert(wasmTable, "table not found in wasm exports");
                addOnInit(Module["asm"]["__wasm_call_ctors"]);
                wasmModule = module;
                if (!ENVIRONMENT_IS_PTHREAD) {
                    removeRunDependency("wasm-instantiate");
                }
            }
            if (!ENVIRONMENT_IS_PTHREAD) {
                addRunDependency("wasm-instantiate");
            }
            var trueModule = Module;
            function receiveInstantiationResult(result) {
                assert(
                    Module === trueModule,
                    "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?",
                );
                trueModule = null;
                receiveInstance(result["instance"], result["module"]);
            }
            function instantiateArrayBuffer(receiver) {
                return getBinaryPromise()
                    .then(function (binary) {
                        return WebAssembly.instantiate(binary, info);
                    })
                    .then(function (instance) {
                        return instance;
                    })
                    .then(receiver, function (reason) {
                        err("failed to asynchronously prepare wasm: " + reason);
                        if (isFileURI(wasmBinaryFile)) {
                            err(
                                "warning: Loading from a file URI (" +
                                    wasmBinaryFile +
                                    ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing",
                            );
                        }
                        abort(reason);
                    });
            }
            function instantiateAsync() {
                if (
                    !wasmBinary &&
                    typeof WebAssembly.instantiateStreaming == "function" &&
                    !isDataURI(wasmBinaryFile) &&
                    typeof fetch == "function"
                ) {
                    return fetch(wasmBinaryFile, {
                        credentials: "same-origin",
                    }).then(function (response) {
                        var result = WebAssembly.instantiateStreaming(
                            response,
                            info,
                        );
                        return result.then(
                            receiveInstantiationResult,
                            function (reason) {
                                err("wasm streaming compile failed: " + reason);
                                err(
                                    "falling back to ArrayBuffer instantiation",
                                );
                                return instantiateArrayBuffer(
                                    receiveInstantiationResult,
                                );
                            },
                        );
                    });
                } else {
                    return instantiateArrayBuffer(receiveInstantiationResult);
                }
            }
            if (Module["instantiateWasm"]) {
                try {
                    var exports = Module["instantiateWasm"](
                        info,
                        receiveInstance,
                    );
                    return exports;
                } catch (e) {
                    err(
                        "Module.instantiateWasm callback failed with error: " +
                            e,
                    );
                    return false;
                }
            }
            instantiateAsync().catch(readyPromiseReject);
            return {};
        }
        var tempDouble;
        var tempI64;
        var ASM_CONSTS = {
            226840: function ($0, $1, $2) {
                self.postMessage({ t: $2, i: $0, e: $1 });
                return 0;
            },
            226900: function ($0, $1, $2, $3, $4) {
                self.postMessage({
                    t: $4,
                    i: $0,
                    v: UTF8ToString($1),
                    w: $2,
                    h: $3,
                });
                return 0;
            },
            226990: function ($0, $1, $2, $3, $4) {
                self.postMessage({ t: $4, i: $0, s: $1, d: $2, r: $3 });
            },
            227055: function ($0, $1, $2, $3, $4, $5) {
                var outArray = GROWABLE_HEAP_I8().subarray($0, $1);
                var data = new Uint8Array(outArray);
                var obj = { t: $5, i: $4, d: data, w: $2, h: $3 };
                self.postMessage(obj, [obj.d.buffer]);
                obj = null;
            },
        };
        function callRuntimeCallbacks(callbacks) {
            while (callbacks.length > 0) {
                var callback = callbacks.shift();
                if (typeof callback == "function") {
                    callback(Module);
                    continue;
                }
                var func = callback.func;
                if (typeof func == "number") {
                    if (callback.arg === undefined) {
                        getWasmTableEntry(func)();
                    } else {
                        getWasmTableEntry(func)(callback.arg);
                    }
                } else {
                    func(callback.arg === undefined ? null : callback.arg);
                }
            }
        }
        function withStackSave(f) {
            var stack = stackSave();
            var ret = f();
            stackRestore(stack);
            return ret;
        }
        function demangle(func) {
            warnOnce(
                "warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling",
            );
            return func;
        }
        function demangleAll(text) {
            var regex = /\b_Z[\w\d_]+/g;
            return text.replace(regex, function (x) {
                var y = demangle(x);
                return x === y ? x : y + " [" + x + "]";
            });
        }
        function killThread(pthread_ptr) {
            assert(
                !ENVIRONMENT_IS_PTHREAD,
                "Internal Error! killThread() can only ever be called from main application thread!",
            );
            assert(
                pthread_ptr,
                "Internal Error! Null pthread_ptr in killThread!",
            );
            GROWABLE_HEAP_I32()[pthread_ptr >> 2] = 0;
            var pthread = PThread.pthreads[pthread_ptr];
            delete PThread.pthreads[pthread_ptr];
            pthread.worker.terminate();
            __emscripten_thread_free_data(pthread_ptr);
            PThread.runningWorkers.splice(
                PThread.runningWorkers.indexOf(pthread.worker),
                1,
            );
            pthread.worker.pthread = undefined;
        }
        function cancelThread(pthread_ptr) {
            assert(
                !ENVIRONMENT_IS_PTHREAD,
                "Internal Error! cancelThread() can only ever be called from main application thread!",
            );
            assert(
                pthread_ptr,
                "Internal Error! Null pthread_ptr in cancelThread!",
            );
            var pthread = PThread.pthreads[pthread_ptr];
            pthread.worker.postMessage({ cmd: "cancel" });
        }
        function cleanupThread(pthread_ptr) {
            assert(
                !ENVIRONMENT_IS_PTHREAD,
                "Internal Error! cleanupThread() can only ever be called from main application thread!",
            );
            assert(
                pthread_ptr,
                "Internal Error! Null pthread_ptr in cleanupThread!",
            );
            var pthread = PThread.pthreads[pthread_ptr];
            if (pthread) {
                GROWABLE_HEAP_I32()[pthread_ptr >> 2] = 0;
                var worker = pthread.worker;
                PThread.returnWorkerToPool(worker);
            }
        }
        function zeroMemory(address, size) {
            GROWABLE_HEAP_U8().fill(0, address, address + size);
        }
        function ptrToString(ptr) {
            return "0x" + ptr.toString(16).padStart(8, "0");
        }
        function spawnThread(threadParams) {
            assert(
                !ENVIRONMENT_IS_PTHREAD,
                "Internal Error! spawnThread() can only ever be called from main application thread!",
            );
            assert(threadParams.pthread_ptr, "Internal error, no pthread ptr!");
            var worker = PThread.getNewWorker();
            if (!worker) {
                return 6;
            }
            assert(!worker.pthread, "Internal error!");
            PThread.runningWorkers.push(worker);
            var pthread = (PThread.pthreads[threadParams.pthread_ptr] = {
                worker: worker,
                threadInfoStruct: threadParams.pthread_ptr,
            });
            worker.pthread = pthread;
            var msg = {
                cmd: "run",
                start_routine: threadParams.startRoutine,
                arg: threadParams.arg,
                threadInfoStruct: threadParams.pthread_ptr,
            };
            worker.runPthread = () => {
                msg.time = performance.now();
                worker.postMessage(msg, threadParams.transferList);
            };
            if (worker.loaded) {
                worker.runPthread();
                delete worker.runPthread;
            }
            return 0;
        }
        function _exit(status) {
            exit(status);
        }
        function handleException(e) {
            if (e instanceof ExitStatus || e == "unwind") {
                return EXITSTATUS;
            }
            quit_(1, e);
        }
        var PThread = {
            unusedWorkers: [],
            runningWorkers: [],
            tlsInitFunctions: [],
            init: function () {
                if (ENVIRONMENT_IS_PTHREAD) {
                    PThread.initWorker();
                } else {
                    PThread.initMainThread();
                }
            },
            initMainThread: function () {},
            initWorker: function () {
                noExitRuntime = false;
            },
            pthreads: {},
            setExitStatus: function (status) {
                EXITSTATUS = status;
            },
            terminateAllThreads: function () {
                assert(
                    !ENVIRONMENT_IS_PTHREAD,
                    "Internal Error! terminateAllThreads() can only ever be called from main application thread!",
                );
                for (var t in PThread.pthreads) {
                    var pthread = PThread.pthreads[t];
                    if (pthread && pthread.worker) {
                        PThread.returnWorkerToPool(pthread.worker);
                    }
                }
                assert(Object.keys(PThread.pthreads).length === 0);
                assert(PThread.runningWorkers.length === 0);
                for (var i = 0; i < PThread.unusedWorkers.length; ++i) {
                    var worker = PThread.unusedWorkers[i];
                    assert(!worker.pthread);
                    worker.terminate();
                }
                PThread.unusedWorkers = [];
            },
            returnWorkerToPool: function (worker) {
                PThread.runWithoutMainThreadQueuedCalls(function () {
                    delete PThread.pthreads[worker.pthread.threadInfoStruct];
                    PThread.unusedWorkers.push(worker);
                    PThread.runningWorkers.splice(
                        PThread.runningWorkers.indexOf(worker),
                        1,
                    );
                    __emscripten_thread_free_data(
                        worker.pthread.threadInfoStruct,
                    );
                    worker.pthread = undefined;
                });
            },
            runWithoutMainThreadQueuedCalls: function (func) {
                assert(
                    PThread.mainRuntimeThread,
                    "runWithoutMainThreadQueuedCalls must be done on the main runtime thread",
                );
                assert(__emscripten_allow_main_runtime_queued_calls);
                GROWABLE_HEAP_I32()[
                    __emscripten_allow_main_runtime_queued_calls >> 2
                ] = 0;
                try {
                    func();
                } finally {
                    GROWABLE_HEAP_I32()[
                        __emscripten_allow_main_runtime_queued_calls >> 2
                    ] = 1;
                }
            },
            receiveObjectTransfer: function (data) {},
            threadInit: function () {
                for (var i in PThread.tlsInitFunctions) {
                    if (PThread.tlsInitFunctions.hasOwnProperty(i))
                        PThread.tlsInitFunctions[i]();
                }
            },
            loadWasmModuleToWorker: function (worker, onFinishedLoading) {
                worker.onmessage = (e) => {
                    var d = e["data"];
                    var cmd = d["cmd"];
                    if (worker.pthread)
                        PThread.currentProxiedOperationCallerThread =
                            worker.pthread.threadInfoStruct;
                    if (
                        d["targetThread"] &&
                        d["targetThread"] != _pthread_self()
                    ) {
                        var thread = PThread.pthreads[d.targetThread];
                        if (thread) {
                            thread.worker.postMessage(d, d["transferList"]);
                        } else {
                            err(
                                'Internal error! Worker sent a message "' +
                                    cmd +
                                    '" to target pthread ' +
                                    d["targetThread"] +
                                    ", but that thread no longer exists!",
                            );
                        }
                        PThread.currentProxiedOperationCallerThread = undefined;
                        return;
                    }
                    if (cmd === "processProxyingQueue") {
                        _emscripten_proxy_execute_queue(d["queue"]);
                        Atomics.sub(GROWABLE_HEAP_I32(), d["queue"] >> 2, 1);
                    } else if (cmd === "spawnThread") {
                        spawnThread(d);
                    } else if (cmd === "cleanupThread") {
                        cleanupThread(d["thread"]);
                    } else if (cmd === "killThread") {
                        killThread(d["thread"]);
                    } else if (cmd === "cancelThread") {
                        cancelThread(d["thread"]);
                    } else if (cmd === "loaded") {
                        worker.loaded = true;
                        if (onFinishedLoading) onFinishedLoading(worker);
                        if (worker.runPthread) {
                            worker.runPthread();
                            delete worker.runPthread;
                        }
                    } else if (cmd === "print") {
                        out("Thread " + d["threadId"] + ": " + d["text"]);
                    } else if (cmd === "printErr") {
                        err("Thread " + d["threadId"] + ": " + d["text"]);
                    } else if (cmd === "alert") {
                        alert("Thread " + d["threadId"] + ": " + d["text"]);
                    } else if (d.target === "setimmediate") {
                        worker.postMessage(d);
                    } else if (cmd === "onAbort") {
                        if (Module["onAbort"]) {
                            Module["onAbort"](d["arg"]);
                        }
                    } else if (cmd) {
                        err("worker sent an unknown command " + cmd);
                    }
                    PThread.currentProxiedOperationCallerThread = undefined;
                };
                worker.onerror = (e) => {
                    var message = "worker sent an error!";
                    if (worker.pthread) {
                        var pthread_ptr = worker.pthread.threadInfoStruct;
                        if (pthread_ptr) {
                            message =
                                "Pthread " +
                                ptrToString(pthread_ptr) +
                                " sent an error!";
                        }
                    }
                    err(
                        message +
                            " " +
                            e.filename +
                            ":" +
                            e.lineno +
                            ": " +
                            e.message,
                    );
                    throw e;
                };
                assert(
                    wasmMemory instanceof WebAssembly.Memory,
                    "WebAssembly memory should have been loaded by now!",
                );
                assert(
                    wasmModule instanceof WebAssembly.Module,
                    "WebAssembly Module should have been loaded by now!",
                );
                worker.postMessage({
                    cmd: "load",
                    urlOrBlob: Module["mainScriptUrlOrBlob"] || _scriptDir,
                    wasmMemory: wasmMemory,
                    wasmModule: wasmModule,
                });
            },
            allocateUnusedWorker: function () {
                var pthreadMainJs = locateFile("core.worker.js");
                PThread.unusedWorkers.push(new Worker(pthreadMainJs));
            },
            getNewWorker: function () {
                if (PThread.unusedWorkers.length == 0) {
                    err(
                        "Tried to spawn a new thread, but the thread pool is exhausted.\n" +
                            "This might result in a deadlock unless some threads eventually exit or the code explicitly breaks out to the event loop.\n" +
                            "If you want to increase the pool size, use setting `-s PTHREAD_POOL_SIZE=...`." +
                            "\nIf you want to throw an explicit error instead of the risk of deadlocking in those cases, use setting `-s PTHREAD_POOL_SIZE_STRICT=2`.",
                    );
                    PThread.allocateUnusedWorker();
                    PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0]);
                }
                return PThread.unusedWorkers.pop();
            },
        };
        function establishStackSpace() {
            var pthread_ptr = _pthread_self();
            var stackTop = GROWABLE_HEAP_I32()[(pthread_ptr + 44) >> 2];
            var stackSize = GROWABLE_HEAP_I32()[(pthread_ptr + 48) >> 2];
            var stackMax = stackTop - stackSize;
            assert(stackTop != 0);
            assert(stackMax != 0);
            assert(stackTop > stackMax);
            _emscripten_stack_set_limits(stackTop, stackMax);
            stackRestore(stackTop);
            writeStackCookie();
        }
        Module["establishStackSpace"] = establishStackSpace;
        function exitOnMainThread(returnCode) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(1, 0, returnCode);
            try {
                _exit(returnCode);
            } catch (e) {
                handleException(e);
            }
        }
        var wasmTableMirror = [];
        function getWasmTableEntry(funcPtr) {
            var func = wasmTableMirror[funcPtr];
            if (!func) {
                if (funcPtr >= wasmTableMirror.length)
                    wasmTableMirror.length = funcPtr + 1;
                wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
            }
            assert(
                wasmTable.get(funcPtr) == func,
                "JavaScript-side Wasm function table mirror is out of date!",
            );
            return func;
        }
        function invokeEntryPoint(ptr, arg) {
            return getWasmTableEntry(ptr)(arg);
        }
        Module["invokeEntryPoint"] = invokeEntryPoint;
        function jsStackTrace() {
            var error = new Error();
            if (!error.stack) {
                try {
                    throw new Error();
                } catch (e) {
                    error = e;
                }
                if (!error.stack) {
                    return "(no stack trace available)";
                }
            }
            return error.stack.toString();
        }
        function registerTlsInit(tlsInitFunc) {
            PThread.tlsInitFunctions.push(tlsInitFunc);
        }
        function setWasmTableEntry(idx, func) {
            wasmTable.set(idx, func);
            wasmTableMirror[idx] = func;
        }
        function ___assert_fail(condition, filename, line, func) {
            abort(
                "Assertion failed: " +
                    UTF8ToString(condition) +
                    ", at: " +
                    [
                        filename ? UTF8ToString(filename) : "unknown filename",
                        line,
                        func ? UTF8ToString(func) : "unknown function",
                    ],
            );
        }
        function ___emscripten_init_main_thread_js(tb) {
            __emscripten_thread_init(
                tb,
                !ENVIRONMENT_IS_WORKER,
                1,
                !ENVIRONMENT_IS_WEB,
            );
            PThread.mainRuntimeThread = true;
            PThread.threadInit();
        }
        function ___emscripten_thread_cleanup(thread) {
            if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread);
            else postMessage({ cmd: "cleanupThread", thread: thread });
        }
        function pthreadCreateProxied(pthread_ptr, attr, start_routine, arg) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    2,
                    1,
                    pthread_ptr,
                    attr,
                    start_routine,
                    arg,
                );
            return ___pthread_create_js(pthread_ptr, attr, start_routine, arg);
        }
        function ___pthread_create_js(pthread_ptr, attr, start_routine, arg) {
            if (typeof SharedArrayBuffer == "undefined") {
                err(
                    "Current environment does not support SharedArrayBuffer, pthreads are not available!",
                );
                return 6;
            }
            var transferList = [];
            var error = 0;
            if (
                ENVIRONMENT_IS_PTHREAD &&
                (transferList.length === 0 || error)
            ) {
                return pthreadCreateProxied(
                    pthread_ptr,
                    attr,
                    start_routine,
                    arg,
                );
            }
            if (error) return error;
            var threadParams = {
                startRoutine: start_routine,
                pthread_ptr: pthread_ptr,
                arg: arg,
                transferList: transferList,
            };
            if (ENVIRONMENT_IS_PTHREAD) {
                threadParams.cmd = "spawnThread";
                postMessage(threadParams, transferList);
                return 0;
            }
            return spawnThread(threadParams);
        }
        function setErrNo(value) {
            GROWABLE_HEAP_I32()[___errno_location() >> 2] = value;
            return value;
        }
        var PATH = {
            splitPath: function (filename) {
                var splitPathRe =
                    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                return splitPathRe.exec(filename).slice(1);
            },
            normalizeArray: function (parts, allowAboveRoot) {
                var up = 0;
                for (var i = parts.length - 1; i >= 0; i--) {
                    var last = parts[i];
                    if (last === ".") {
                        parts.splice(i, 1);
                    } else if (last === "..") {
                        parts.splice(i, 1);
                        up++;
                    } else if (up) {
                        parts.splice(i, 1);
                        up--;
                    }
                }
                if (allowAboveRoot) {
                    for (; up; up--) {
                        parts.unshift("..");
                    }
                }
                return parts;
            },
            normalize: function (path) {
                var isAbsolute = path.charAt(0) === "/",
                    trailingSlash = path.substr(-1) === "/";
                path = PATH.normalizeArray(
                    path.split("/").filter(function (p) {
                        return !!p;
                    }),
                    !isAbsolute,
                ).join("/");
                if (!path && !isAbsolute) {
                    path = ".";
                }
                if (path && trailingSlash) {
                    path += "/";
                }
                return (isAbsolute ? "/" : "") + path;
            },
            dirname: function (path) {
                var result = PATH.splitPath(path),
                    root = result[0],
                    dir = result[1];
                if (!root && !dir) {
                    return ".";
                }
                if (dir) {
                    dir = dir.substr(0, dir.length - 1);
                }
                return root + dir;
            },
            basename: function (path) {
                if (path === "/") return "/";
                path = PATH.normalize(path);
                path = path.replace(/\/$/, "");
                var lastSlash = path.lastIndexOf("/");
                if (lastSlash === -1) return path;
                return path.substr(lastSlash + 1);
            },
            extname: function (path) {
                return PATH.splitPath(path)[3];
            },
            join: function () {
                var paths = Array.prototype.slice.call(arguments, 0);
                return PATH.normalize(paths.join("/"));
            },
            join2: function (l, r) {
                return PATH.normalize(l + "/" + r);
            },
        };
        function getRandomDevice() {
            if (
                typeof crypto == "object" &&
                typeof crypto["getRandomValues"] == "function"
            ) {
                var randomBuffer = new Uint8Array(1);
                return function () {
                    crypto.getRandomValues(randomBuffer);
                    return randomBuffer[0];
                };
            } else
                return function () {
                    abort(
                        "no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };",
                    );
                };
        }
        var PATH_FS = {
            resolve: function () {
                var resolvedPath = "",
                    resolvedAbsolute = false;
                for (
                    var i = arguments.length - 1;
                    i >= -1 && !resolvedAbsolute;
                    i--
                ) {
                    var path = i >= 0 ? arguments[i] : FS.cwd();
                    if (typeof path != "string") {
                        throw new TypeError(
                            "Arguments to path.resolve must be strings",
                        );
                    } else if (!path) {
                        return "";
                    }
                    resolvedPath = path + "/" + resolvedPath;
                    resolvedAbsolute = path.charAt(0) === "/";
                }
                resolvedPath = PATH.normalizeArray(
                    resolvedPath.split("/").filter(function (p) {
                        return !!p;
                    }),
                    !resolvedAbsolute,
                ).join("/");
                return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
            },
            relative: function (from, to) {
                from = PATH_FS.resolve(from).substr(1);
                to = PATH_FS.resolve(to).substr(1);
                function trim(arr) {
                    var start = 0;
                    for (; start < arr.length; start++) {
                        if (arr[start] !== "") break;
                    }
                    var end = arr.length - 1;
                    for (; end >= 0; end--) {
                        if (arr[end] !== "") break;
                    }
                    if (start > end) return [];
                    return arr.slice(start, end - start + 1);
                }
                var fromParts = trim(from.split("/"));
                var toParts = trim(to.split("/"));
                var length = Math.min(fromParts.length, toParts.length);
                var samePartsLength = length;
                for (var i = 0; i < length; i++) {
                    if (fromParts[i] !== toParts[i]) {
                        samePartsLength = i;
                        break;
                    }
                }
                var outputParts = [];
                for (var i = samePartsLength; i < fromParts.length; i++) {
                    outputParts.push("..");
                }
                outputParts = outputParts.concat(
                    toParts.slice(samePartsLength),
                );
                return outputParts.join("/");
            },
        };
        var TTY = {
            ttys: [],
            init: function () {},
            shutdown: function () {},
            register: function (dev, ops) {
                TTY.ttys[dev] = { input: [], output: [], ops: ops };
                FS.registerDevice(dev, TTY.stream_ops);
            },
            stream_ops: {
                open: function (stream) {
                    var tty = TTY.ttys[stream.node.rdev];
                    if (!tty) {
                        throw new FS.ErrnoError(43);
                    }
                    stream.tty = tty;
                    stream.seekable = false;
                },
                close: function (stream) {
                    stream.tty.ops.flush(stream.tty);
                },
                flush: function (stream) {
                    stream.tty.ops.flush(stream.tty);
                },
                read: function (stream, buffer, offset, length, pos) {
                    if (!stream.tty || !stream.tty.ops.get_char) {
                        throw new FS.ErrnoError(60);
                    }
                    var bytesRead = 0;
                    for (var i = 0; i < length; i++) {
                        var result;
                        try {
                            result = stream.tty.ops.get_char(stream.tty);
                        } catch (e) {
                            throw new FS.ErrnoError(29);
                        }
                        if (result === undefined && bytesRead === 0) {
                            throw new FS.ErrnoError(6);
                        }
                        if (result === null || result === undefined) break;
                        bytesRead++;
                        buffer[offset + i] = result;
                    }
                    if (bytesRead) {
                        stream.node.timestamp = Date.now();
                    }
                    return bytesRead;
                },
                write: function (stream, buffer, offset, length, pos) {
                    if (!stream.tty || !stream.tty.ops.put_char) {
                        throw new FS.ErrnoError(60);
                    }
                    try {
                        for (var i = 0; i < length; i++) {
                            stream.tty.ops.put_char(
                                stream.tty,
                                buffer[offset + i],
                            );
                        }
                    } catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                    if (length) {
                        stream.node.timestamp = Date.now();
                    }
                    return i;
                },
            },
            default_tty_ops: {
                get_char: function (tty) {
                    if (!tty.input.length) {
                        var result = null;
                        if (
                            typeof window != "undefined" &&
                            typeof window.prompt == "function"
                        ) {
                            result = window.prompt("Input: ");
                            if (result !== null) {
                                result += "\n";
                            }
                        } else if (typeof readline == "function") {
                            result = readline();
                            if (result !== null) {
                                result += "\n";
                            }
                        }
                        if (!result) {
                            return null;
                        }
                        tty.input = intArrayFromString(result, true);
                    }
                    return tty.input.shift();
                },
                put_char: function (tty, val) {
                    if (val === null || val === 10) {
                        out(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    } else {
                        if (val != 0) tty.output.push(val);
                    }
                },
                flush: function (tty) {
                    if (tty.output && tty.output.length > 0) {
                        out(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    }
                },
            },
            default_tty1_ops: {
                put_char: function (tty, val) {
                    if (val === null || val === 10) {
                        err(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    } else {
                        if (val != 0) tty.output.push(val);
                    }
                },
                flush: function (tty) {
                    if (tty.output && tty.output.length > 0) {
                        err(UTF8ArrayToString(tty.output, 0));
                        tty.output = [];
                    }
                },
            },
        };
        function alignMemory(size, alignment) {
            assert(alignment, "alignment argument is required");
            return Math.ceil(size / alignment) * alignment;
        }
        function mmapAlloc(size) {
            size = alignMemory(size, 65536);
            var ptr = _emscripten_builtin_memalign(65536, size);
            if (!ptr) return 0;
            zeroMemory(ptr, size);
            return ptr;
        }
        var MEMFS = {
            ops_table: null,
            mount: function (mount) {
                return MEMFS.createNode(null, "/", 16384 | 511, 0);
            },
            createNode: function (parent, name, mode, dev) {
                if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
                    throw new FS.ErrnoError(63);
                }
                if (!MEMFS.ops_table) {
                    MEMFS.ops_table = {
                        dir: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                                lookup: MEMFS.node_ops.lookup,
                                mknod: MEMFS.node_ops.mknod,
                                rename: MEMFS.node_ops.rename,
                                unlink: MEMFS.node_ops.unlink,
                                rmdir: MEMFS.node_ops.rmdir,
                                readdir: MEMFS.node_ops.readdir,
                                symlink: MEMFS.node_ops.symlink,
                            },
                            stream: { llseek: MEMFS.stream_ops.llseek },
                        },
                        file: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                            },
                            stream: {
                                llseek: MEMFS.stream_ops.llseek,
                                read: MEMFS.stream_ops.read,
                                write: MEMFS.stream_ops.write,
                                allocate: MEMFS.stream_ops.allocate,
                                mmap: MEMFS.stream_ops.mmap,
                                msync: MEMFS.stream_ops.msync,
                            },
                        },
                        link: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                                readlink: MEMFS.node_ops.readlink,
                            },
                            stream: {},
                        },
                        chrdev: {
                            node: {
                                getattr: MEMFS.node_ops.getattr,
                                setattr: MEMFS.node_ops.setattr,
                            },
                            stream: FS.chrdev_stream_ops,
                        },
                    };
                }
                var node = FS.createNode(parent, name, mode, dev);
                if (FS.isDir(node.mode)) {
                    node.node_ops = MEMFS.ops_table.dir.node;
                    node.stream_ops = MEMFS.ops_table.dir.stream;
                    node.contents = {};
                } else if (FS.isFile(node.mode)) {
                    node.node_ops = MEMFS.ops_table.file.node;
                    node.stream_ops = MEMFS.ops_table.file.stream;
                    node.usedBytes = 0;
                    node.contents = null;
                } else if (FS.isLink(node.mode)) {
                    node.node_ops = MEMFS.ops_table.link.node;
                    node.stream_ops = MEMFS.ops_table.link.stream;
                } else if (FS.isChrdev(node.mode)) {
                    node.node_ops = MEMFS.ops_table.chrdev.node;
                    node.stream_ops = MEMFS.ops_table.chrdev.stream;
                }
                node.timestamp = Date.now();
                if (parent) {
                    parent.contents[name] = node;
                    parent.timestamp = node.timestamp;
                }
                return node;
            },
            getFileDataAsTypedArray: function (node) {
                if (!node.contents) return new Uint8Array(0);
                if (node.contents.subarray)
                    return node.contents.subarray(0, node.usedBytes);
                return new Uint8Array(node.contents);
            },
            expandFileStorage: function (node, newCapacity) {
                var prevCapacity = node.contents ? node.contents.length : 0;
                if (prevCapacity >= newCapacity) return;
                var CAPACITY_DOUBLING_MAX = 1024 * 1024;
                newCapacity = Math.max(
                    newCapacity,
                    (prevCapacity *
                        (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>>
                        0,
                );
                if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
                var oldContents = node.contents;
                node.contents = new Uint8Array(newCapacity);
                if (node.usedBytes > 0)
                    node.contents.set(
                        oldContents.subarray(0, node.usedBytes),
                        0,
                    );
            },
            resizeFileStorage: function (node, newSize) {
                if (node.usedBytes == newSize) return;
                if (newSize == 0) {
                    node.contents = null;
                    node.usedBytes = 0;
                } else {
                    var oldContents = node.contents;
                    node.contents = new Uint8Array(newSize);
                    if (oldContents) {
                        node.contents.set(
                            oldContents.subarray(
                                0,
                                Math.min(newSize, node.usedBytes),
                            ),
                        );
                    }
                    node.usedBytes = newSize;
                }
            },
            node_ops: {
                getattr: function (node) {
                    var attr = {};
                    attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
                    attr.ino = node.id;
                    attr.mode = node.mode;
                    attr.nlink = 1;
                    attr.uid = 0;
                    attr.gid = 0;
                    attr.rdev = node.rdev;
                    if (FS.isDir(node.mode)) {
                        attr.size = 4096;
                    } else if (FS.isFile(node.mode)) {
                        attr.size = node.usedBytes;
                    } else if (FS.isLink(node.mode)) {
                        attr.size = node.link.length;
                    } else {
                        attr.size = 0;
                    }
                    attr.atime = new Date(node.timestamp);
                    attr.mtime = new Date(node.timestamp);
                    attr.ctime = new Date(node.timestamp);
                    attr.blksize = 4096;
                    attr.blocks = Math.ceil(attr.size / attr.blksize);
                    return attr;
                },
                setattr: function (node, attr) {
                    if (attr.mode !== undefined) {
                        node.mode = attr.mode;
                    }
                    if (attr.timestamp !== undefined) {
                        node.timestamp = attr.timestamp;
                    }
                    if (attr.size !== undefined) {
                        MEMFS.resizeFileStorage(node, attr.size);
                    }
                },
                lookup: function (parent, name) {
                    throw FS.genericErrors[44];
                },
                mknod: function (parent, name, mode, dev) {
                    return MEMFS.createNode(parent, name, mode, dev);
                },
                rename: function (old_node, new_dir, new_name) {
                    if (FS.isDir(old_node.mode)) {
                        var new_node;
                        try {
                            new_node = FS.lookupNode(new_dir, new_name);
                        } catch (e) {}
                        if (new_node) {
                            for (var i in new_node.contents) {
                                throw new FS.ErrnoError(55);
                            }
                        }
                    }
                    delete old_node.parent.contents[old_node.name];
                    old_node.parent.timestamp = Date.now();
                    old_node.name = new_name;
                    new_dir.contents[new_name] = old_node;
                    new_dir.timestamp = old_node.parent.timestamp;
                    old_node.parent = new_dir;
                },
                unlink: function (parent, name) {
                    delete parent.contents[name];
                    parent.timestamp = Date.now();
                },
                rmdir: function (parent, name) {
                    var node = FS.lookupNode(parent, name);
                    for (var i in node.contents) {
                        throw new FS.ErrnoError(55);
                    }
                    delete parent.contents[name];
                    parent.timestamp = Date.now();
                },
                readdir: function (node) {
                    var entries = [".", ".."];
                    for (var key in node.contents) {
                        if (!node.contents.hasOwnProperty(key)) {
                            continue;
                        }
                        entries.push(key);
                    }
                    return entries;
                },
                symlink: function (parent, newname, oldpath) {
                    var node = MEMFS.createNode(
                        parent,
                        newname,
                        511 | 40960,
                        0,
                    );
                    node.link = oldpath;
                    return node;
                },
                readlink: function (node) {
                    if (!FS.isLink(node.mode)) {
                        throw new FS.ErrnoError(28);
                    }
                    return node.link;
                },
            },
            stream_ops: {
                read: function (stream, buffer, offset, length, position) {
                    var contents = stream.node.contents;
                    if (position >= stream.node.usedBytes) return 0;
                    var size = Math.min(
                        stream.node.usedBytes - position,
                        length,
                    );
                    assert(size >= 0);
                    if (size > 8 && contents.subarray) {
                        buffer.set(
                            contents.subarray(position, position + size),
                            offset,
                        );
                    } else {
                        for (var i = 0; i < size; i++)
                            buffer[offset + i] = contents[position + i];
                    }
                    return size;
                },
                write: function (
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                    canOwn,
                ) {
                    assert(!(buffer instanceof ArrayBuffer));
                    if (buffer.buffer === GROWABLE_HEAP_I8().buffer) {
                        canOwn = false;
                    }
                    if (!length) return 0;
                    var node = stream.node;
                    node.timestamp = Date.now();
                    if (
                        buffer.subarray &&
                        (!node.contents || node.contents.subarray)
                    ) {
                        if (canOwn) {
                            assert(
                                position === 0,
                                "canOwn must imply no weird position inside the file",
                            );
                            node.contents = buffer.subarray(
                                offset,
                                offset + length,
                            );
                            node.usedBytes = length;
                            return length;
                        } else if (node.usedBytes === 0 && position === 0) {
                            node.contents = buffer.slice(
                                offset,
                                offset + length,
                            );
                            node.usedBytes = length;
                            return length;
                        } else if (position + length <= node.usedBytes) {
                            node.contents.set(
                                buffer.subarray(offset, offset + length),
                                position,
                            );
                            return length;
                        }
                    }
                    MEMFS.expandFileStorage(node, position + length);
                    if (node.contents.subarray && buffer.subarray) {
                        node.contents.set(
                            buffer.subarray(offset, offset + length),
                            position,
                        );
                    } else {
                        for (var i = 0; i < length; i++) {
                            node.contents[position + i] = buffer[offset + i];
                        }
                    }
                    node.usedBytes = Math.max(
                        node.usedBytes,
                        position + length,
                    );
                    return length;
                },
                llseek: function (stream, offset, whence) {
                    var position = offset;
                    if (whence === 1) {
                        position += stream.position;
                    } else if (whence === 2) {
                        if (FS.isFile(stream.node.mode)) {
                            position += stream.node.usedBytes;
                        }
                    }
                    if (position < 0) {
                        throw new FS.ErrnoError(28);
                    }
                    return position;
                },
                allocate: function (stream, offset, length) {
                    MEMFS.expandFileStorage(stream.node, offset + length);
                    stream.node.usedBytes = Math.max(
                        stream.node.usedBytes,
                        offset + length,
                    );
                },
                mmap: function (
                    stream,
                    address,
                    length,
                    position,
                    prot,
                    flags,
                ) {
                    if (address !== 0) {
                        throw new FS.ErrnoError(28);
                    }
                    if (!FS.isFile(stream.node.mode)) {
                        throw new FS.ErrnoError(43);
                    }
                    var ptr;
                    var allocated;
                    var contents = stream.node.contents;
                    if (!(flags & 2) && contents.buffer === buffer) {
                        allocated = false;
                        ptr = contents.byteOffset;
                    } else {
                        if (
                            position > 0 ||
                            position + length < contents.length
                        ) {
                            if (contents.subarray) {
                                contents = contents.subarray(
                                    position,
                                    position + length,
                                );
                            } else {
                                contents = Array.prototype.slice.call(
                                    contents,
                                    position,
                                    position + length,
                                );
                            }
                        }
                        allocated = true;
                        ptr = mmapAlloc(length);
                        if (!ptr) {
                            throw new FS.ErrnoError(48);
                        }
                        GROWABLE_HEAP_I8().set(contents, ptr);
                    }
                    return { ptr: ptr, allocated: allocated };
                },
                msync: function (stream, buffer, offset, length, mmapFlags) {
                    if (!FS.isFile(stream.node.mode)) {
                        throw new FS.ErrnoError(43);
                    }
                    if (mmapFlags & 2) {
                        return 0;
                    }
                    var bytesWritten = MEMFS.stream_ops.write(
                        stream,
                        buffer,
                        0,
                        length,
                        offset,
                        false,
                    );
                    return 0;
                },
            },
        };
        function asyncLoad(url, onload, onerror, noRunDep) {
            var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
            readAsync(
                url,
                function (arrayBuffer) {
                    assert(
                        arrayBuffer,
                        'Loading data file "' +
                            url +
                            '" failed (no arrayBuffer).',
                    );
                    onload(new Uint8Array(arrayBuffer));
                    if (dep) removeRunDependency(dep);
                },
                function (event) {
                    if (onerror) {
                        onerror();
                    } else {
                        throw 'Loading data file "' + url + '" failed.';
                    }
                },
            );
            if (dep) addRunDependency(dep);
        }
        var ERRNO_MESSAGES = {
            0: "Success",
            1: "Arg list too long",
            2: "Permission denied",
            3: "Address already in use",
            4: "Address not available",
            5: "Address family not supported by protocol family",
            6: "No more processes",
            7: "Socket already connected",
            8: "Bad file number",
            9: "Trying to read unreadable message",
            10: "Mount device busy",
            11: "Operation canceled",
            12: "No children",
            13: "Connection aborted",
            14: "Connection refused",
            15: "Connection reset by peer",
            16: "File locking deadlock error",
            17: "Destination address required",
            18: "Math arg out of domain of func",
            19: "Quota exceeded",
            20: "File exists",
            21: "Bad address",
            22: "File too large",
            23: "Host is unreachable",
            24: "Identifier removed",
            25: "Illegal byte sequence",
            26: "Connection already in progress",
            27: "Interrupted system call",
            28: "Invalid argument",
            29: "I/O error",
            30: "Socket is already connected",
            31: "Is a directory",
            32: "Too many symbolic links",
            33: "Too many open files",
            34: "Too many links",
            35: "Message too long",
            36: "Multihop attempted",
            37: "File or path name too long",
            38: "Network interface is not configured",
            39: "Connection reset by network",
            40: "Network is unreachable",
            41: "Too many open files in system",
            42: "No buffer space available",
            43: "No such device",
            44: "No such file or directory",
            45: "Exec format error",
            46: "No record locks available",
            47: "The link has been severed",
            48: "Not enough core",
            49: "No message of desired type",
            50: "Protocol not available",
            51: "No space left on device",
            52: "Function not implemented",
            53: "Socket is not connected",
            54: "Not a directory",
            55: "Directory not empty",
            56: "State not recoverable",
            57: "Socket operation on non-socket",
            59: "Not a typewriter",
            60: "No such device or address",
            61: "Value too large for defined data type",
            62: "Previous owner died",
            63: "Not super-user",
            64: "Broken pipe",
            65: "Protocol error",
            66: "Unknown protocol",
            67: "Protocol wrong type for socket",
            68: "Math result not representable",
            69: "Read only file system",
            70: "Illegal seek",
            71: "No such process",
            72: "Stale file handle",
            73: "Connection timed out",
            74: "Text file busy",
            75: "Cross-device link",
            100: "Device not a stream",
            101: "Bad font file fmt",
            102: "Invalid slot",
            103: "Invalid request code",
            104: "No anode",
            105: "Block device required",
            106: "Channel number out of range",
            107: "Level 3 halted",
            108: "Level 3 reset",
            109: "Link number out of range",
            110: "Protocol driver not attached",
            111: "No CSI structure available",
            112: "Level 2 halted",
            113: "Invalid exchange",
            114: "Invalid request descriptor",
            115: "Exchange full",
            116: "No data (for no delay io)",
            117: "Timer expired",
            118: "Out of streams resources",
            119: "Machine is not on the network",
            120: "Package not installed",
            121: "The object is remote",
            122: "Advertise error",
            123: "Srmount error",
            124: "Communication error on send",
            125: "Cross mount point (not really error)",
            126: "Given log. name not unique",
            127: "f.d. invalid for this operation",
            128: "Remote address changed",
            129: "Can   access a needed shared lib",
            130: "Accessing a corrupted shared lib",
            131: ".lib section in a.out corrupted",
            132: "Attempting to link in too many libs",
            133: "Attempting to exec a shared library",
            135: "Streams pipe error",
            136: "Too many users",
            137: "Socket type not supported",
            138: "Not supported",
            139: "Protocol family not supported",
            140: "Can't send after socket shutdown",
            141: "Too many references",
            142: "Host is down",
            148: "No medium (in tape drive)",
            156: "Level 2 not synchronized",
        };
        var ERRNO_CODES = {};
        var FS = {
            root: null,
            mounts: [],
            devices: {},
            streams: [],
            nextInode: 1,
            nameTable: null,
            currentPath: "/",
            initialized: false,
            ignorePermissions: true,
            ErrnoError: null,
            genericErrors: {},
            filesystems: null,
            syncFSRequests: 0,
            lookupPath: (path, opts = {}) => {
                path = PATH_FS.resolve(FS.cwd(), path);
                if (!path) return { path: "", node: null };
                var defaults = { follow_mount: true, recurse_count: 0 };
                opts = Object.assign(defaults, opts);
                if (opts.recurse_count > 8) {
                    throw new FS.ErrnoError(32);
                }
                var parts = PATH.normalizeArray(
                    path.split("/").filter((p) => !!p),
                    false,
                );
                var current = FS.root;
                var current_path = "/";
                for (var i = 0; i < parts.length; i++) {
                    var islast = i === parts.length - 1;
                    if (islast && opts.parent) {
                        break;
                    }
                    current = FS.lookupNode(current, parts[i]);
                    current_path = PATH.join2(current_path, parts[i]);
                    if (FS.isMountpoint(current)) {
                        if (!islast || (islast && opts.follow_mount)) {
                            current = current.mounted.root;
                        }
                    }
                    if (!islast || opts.follow) {
                        var count = 0;
                        while (FS.isLink(current.mode)) {
                            var link = FS.readlink(current_path);
                            current_path = PATH_FS.resolve(
                                PATH.dirname(current_path),
                                link,
                            );
                            var lookup = FS.lookupPath(current_path, {
                                recurse_count: opts.recurse_count + 1,
                            });
                            current = lookup.node;
                            if (count++ > 40) {
                                throw new FS.ErrnoError(32);
                            }
                        }
                    }
                }
                return { path: current_path, node: current };
            },
            getPath: (node) => {
                var path;
                while (true) {
                    if (FS.isRoot(node)) {
                        var mount = node.mount.mountpoint;
                        if (!path) return mount;
                        return mount[mount.length - 1] !== "/"
                            ? mount + "/" + path
                            : mount + path;
                    }
                    path = path ? node.name + "/" + path : node.name;
                    node = node.parent;
                }
            },
            hashName: (parentid, name) => {
                var hash = 0;
                for (var i = 0; i < name.length; i++) {
                    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
                }
                return ((parentid + hash) >>> 0) % FS.nameTable.length;
            },
            hashAddNode: (node) => {
                var hash = FS.hashName(node.parent.id, node.name);
                node.name_next = FS.nameTable[hash];
                FS.nameTable[hash] = node;
            },
            hashRemoveNode: (node) => {
                var hash = FS.hashName(node.parent.id, node.name);
                if (FS.nameTable[hash] === node) {
                    FS.nameTable[hash] = node.name_next;
                } else {
                    var current = FS.nameTable[hash];
                    while (current) {
                        if (current.name_next === node) {
                            current.name_next = node.name_next;
                            break;
                        }
                        current = current.name_next;
                    }
                }
            },
            lookupNode: (parent, name) => {
                var errCode = FS.mayLookup(parent);
                if (errCode) {
                    throw new FS.ErrnoError(errCode, parent);
                }
                var hash = FS.hashName(parent.id, name);
                for (
                    var node = FS.nameTable[hash];
                    node;
                    node = node.name_next
                ) {
                    var nodeName = node.name;
                    if (node.parent.id === parent.id && nodeName === name) {
                        return node;
                    }
                }
                return FS.lookup(parent, name);
            },
            createNode: (parent, name, mode, rdev) => {
                assert(typeof parent == "object");
                var node = new FS.FSNode(parent, name, mode, rdev);
                FS.hashAddNode(node);
                return node;
            },
            destroyNode: (node) => {
                FS.hashRemoveNode(node);
            },
            isRoot: (node) => {
                return node === node.parent;
            },
            isMountpoint: (node) => {
                return !!node.mounted;
            },
            isFile: (mode) => {
                return (mode & 61440) === 32768;
            },
            isDir: (mode) => {
                return (mode & 61440) === 16384;
            },
            isLink: (mode) => {
                return (mode & 61440) === 40960;
            },
            isChrdev: (mode) => {
                return (mode & 61440) === 8192;
            },
            isBlkdev: (mode) => {
                return (mode & 61440) === 24576;
            },
            isFIFO: (mode) => {
                return (mode & 61440) === 4096;
            },
            isSocket: (mode) => {
                return (mode & 49152) === 49152;
            },
            flagModes: {
                r: 0,
                "r+": 2,
                w: 577,
                "w+": 578,
                a: 1089,
                "a+": 1090,
            },
            modeStringToFlags: (str) => {
                var flags = FS.flagModes[str];
                if (typeof flags == "undefined") {
                    throw new Error("Unknown file open mode: " + str);
                }
                return flags;
            },
            flagsToPermissionString: (flag) => {
                var perms = ["r", "w", "rw"][flag & 3];
                if (flag & 512) {
                    perms += "w";
                }
                return perms;
            },
            nodePermissions: (node, perms) => {
                if (FS.ignorePermissions) {
                    return 0;
                }
                if (perms.includes("r") && !(node.mode & 292)) {
                    return 2;
                } else if (perms.includes("w") && !(node.mode & 146)) {
                    return 2;
                } else if (perms.includes("x") && !(node.mode & 73)) {
                    return 2;
                }
                return 0;
            },
            mayLookup: (dir) => {
                var errCode = FS.nodePermissions(dir, "x");
                if (errCode) return errCode;
                if (!dir.node_ops.lookup) return 2;
                return 0;
            },
            mayCreate: (dir, name) => {
                try {
                    var node = FS.lookupNode(dir, name);
                    return 20;
                } catch (e) {}
                return FS.nodePermissions(dir, "wx");
            },
            mayDelete: (dir, name, isdir) => {
                var node;
                try {
                    node = FS.lookupNode(dir, name);
                } catch (e) {
                    return e.errno;
                }
                var errCode = FS.nodePermissions(dir, "wx");
                if (errCode) {
                    return errCode;
                }
                if (isdir) {
                    if (!FS.isDir(node.mode)) {
                        return 54;
                    }
                    if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                        return 10;
                    }
                } else {
                    if (FS.isDir(node.mode)) {
                        return 31;
                    }
                }
                return 0;
            },
            mayOpen: (node, flags) => {
                if (!node) {
                    return 44;
                }
                if (FS.isLink(node.mode)) {
                    return 32;
                } else if (FS.isDir(node.mode)) {
                    if (
                        FS.flagsToPermissionString(flags) !== "r" ||
                        flags & 512
                    ) {
                        return 31;
                    }
                }
                return FS.nodePermissions(
                    node,
                    FS.flagsToPermissionString(flags),
                );
            },
            MAX_OPEN_FDS: 4096,
            nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
                for (var fd = fd_start; fd <= fd_end; fd++) {
                    if (!FS.streams[fd]) {
                        return fd;
                    }
                }
                throw new FS.ErrnoError(33);
            },
            getStream: (fd) => FS.streams[fd],
            createStream: (stream, fd_start, fd_end) => {
                if (!FS.FSStream) {
                    FS.FSStream = function () {};
                    FS.FSStream.prototype = {
                        object: {
                            get: function () {
                                return this.node;
                            },
                            set: function (val) {
                                this.node = val;
                            },
                        },
                        isRead: {
                            get: function () {
                                return (this.flags & 2097155) !== 1;
                            },
                        },
                        isWrite: {
                            get: function () {
                                return (this.flags & 2097155) !== 0;
                            },
                        },
                        isAppend: {
                            get: function () {
                                return this.flags & 1024;
                            },
                        },
                    };
                }
                stream = Object.assign(new FS.FSStream(), stream);
                var fd = FS.nextfd(fd_start, fd_end);
                stream.fd = fd;
                FS.streams[fd] = stream;
                return stream;
            },
            closeStream: (fd) => {
                FS.streams[fd] = null;
            },
            chrdev_stream_ops: {
                open: (stream) => {
                    var device = FS.getDevice(stream.node.rdev);
                    stream.stream_ops = device.stream_ops;
                    if (stream.stream_ops.open) {
                        stream.stream_ops.open(stream);
                    }
                },
                llseek: () => {
                    throw new FS.ErrnoError(70);
                },
            },
            major: (dev) => dev >> 8,
            minor: (dev) => dev & 255,
            makedev: (ma, mi) => (ma << 8) | mi,
            registerDevice: (dev, ops) => {
                FS.devices[dev] = { stream_ops: ops };
            },
            getDevice: (dev) => FS.devices[dev],
            getMounts: (mount) => {
                var mounts = [];
                var check = [mount];
                while (check.length) {
                    var m = check.pop();
                    mounts.push(m);
                    check.push.apply(check, m.mounts);
                }
                return mounts;
            },
            syncfs: (populate, callback) => {
                if (typeof populate == "function") {
                    callback = populate;
                    populate = false;
                }
                FS.syncFSRequests++;
                if (FS.syncFSRequests > 1) {
                    err(
                        "warning: " +
                            FS.syncFSRequests +
                            " FS.syncfs operations in flight at once, probably just doing extra work",
                    );
                }
                var mounts = FS.getMounts(FS.root.mount);
                var completed = 0;
                function doCallback(errCode) {
                    assert(FS.syncFSRequests > 0);
                    FS.syncFSRequests--;
                    return callback(errCode);
                }
                function done(errCode) {
                    if (errCode) {
                        if (!done.errored) {
                            done.errored = true;
                            return doCallback(errCode);
                        }
                        return;
                    }
                    if (++completed >= mounts.length) {
                        doCallback(null);
                    }
                }
                mounts.forEach((mount) => {
                    if (!mount.type.syncfs) {
                        return done(null);
                    }
                    mount.type.syncfs(mount, populate, done);
                });
            },
            mount: (type, opts, mountpoint) => {
                if (typeof type == "string") {
                    throw type;
                }
                var root = mountpoint === "/";
                var pseudo = !mountpoint;
                var node;
                if (root && FS.root) {
                    throw new FS.ErrnoError(10);
                } else if (!root && !pseudo) {
                    var lookup = FS.lookupPath(mountpoint, {
                        follow_mount: false,
                    });
                    mountpoint = lookup.path;
                    node = lookup.node;
                    if (FS.isMountpoint(node)) {
                        throw new FS.ErrnoError(10);
                    }
                    if (!FS.isDir(node.mode)) {
                        throw new FS.ErrnoError(54);
                    }
                }
                var mount = {
                    type: type,
                    opts: opts,
                    mountpoint: mountpoint,
                    mounts: [],
                };
                var mountRoot = type.mount(mount);
                mountRoot.mount = mount;
                mount.root = mountRoot;
                if (root) {
                    FS.root = mountRoot;
                } else if (node) {
                    node.mounted = mount;
                    if (node.mount) {
                        node.mount.mounts.push(mount);
                    }
                }
                return mountRoot;
            },
            unmount: (mountpoint) => {
                var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
                if (!FS.isMountpoint(lookup.node)) {
                    throw new FS.ErrnoError(28);
                }
                var node = lookup.node;
                var mount = node.mounted;
                var mounts = FS.getMounts(mount);
                Object.keys(FS.nameTable).forEach((hash) => {
                    var current = FS.nameTable[hash];
                    while (current) {
                        var next = current.name_next;
                        if (mounts.includes(current.mount)) {
                            FS.destroyNode(current);
                        }
                        current = next;
                    }
                });
                node.mounted = null;
                var idx = node.mount.mounts.indexOf(mount);
                assert(idx !== -1);
                node.mount.mounts.splice(idx, 1);
            },
            lookup: (parent, name) => {
                return parent.node_ops.lookup(parent, name);
            },
            mknod: (path, mode, dev) => {
                var lookup = FS.lookupPath(path, { parent: true });
                var parent = lookup.node;
                var name = PATH.basename(path);
                if (!name || name === "." || name === "..") {
                    throw new FS.ErrnoError(28);
                }
                var errCode = FS.mayCreate(parent, name);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.mknod) {
                    throw new FS.ErrnoError(63);
                }
                return parent.node_ops.mknod(parent, name, mode, dev);
            },
            create: (path, mode) => {
                mode = mode !== undefined ? mode : 438;
                mode &= 4095;
                mode |= 32768;
                return FS.mknod(path, mode, 0);
            },
            mkdir: (path, mode) => {
                mode = mode !== undefined ? mode : 511;
                mode &= 511 | 512;
                mode |= 16384;
                return FS.mknod(path, mode, 0);
            },
            mkdirTree: (path, mode) => {
                var dirs = path.split("/");
                var d = "";
                for (var i = 0; i < dirs.length; ++i) {
                    if (!dirs[i]) continue;
                    d += "/" + dirs[i];
                    try {
                        FS.mkdir(d, mode);
                    } catch (e) {
                        if (e.errno != 20) throw e;
                    }
                }
            },
            mkdev: (path, mode, dev) => {
                if (typeof dev == "undefined") {
                    dev = mode;
                    mode = 438;
                }
                mode |= 8192;
                return FS.mknod(path, mode, dev);
            },
            symlink: (oldpath, newpath) => {
                if (!PATH_FS.resolve(oldpath)) {
                    throw new FS.ErrnoError(44);
                }
                var lookup = FS.lookupPath(newpath, { parent: true });
                var parent = lookup.node;
                if (!parent) {
                    throw new FS.ErrnoError(44);
                }
                var newname = PATH.basename(newpath);
                var errCode = FS.mayCreate(parent, newname);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.symlink) {
                    throw new FS.ErrnoError(63);
                }
                return parent.node_ops.symlink(parent, newname, oldpath);
            },
            rename: (old_path, new_path) => {
                var old_dirname = PATH.dirname(old_path);
                var new_dirname = PATH.dirname(new_path);
                var old_name = PATH.basename(old_path);
                var new_name = PATH.basename(new_path);
                var lookup, old_dir, new_dir;
                lookup = FS.lookupPath(old_path, { parent: true });
                old_dir = lookup.node;
                lookup = FS.lookupPath(new_path, { parent: true });
                new_dir = lookup.node;
                if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
                if (old_dir.mount !== new_dir.mount) {
                    throw new FS.ErrnoError(75);
                }
                var old_node = FS.lookupNode(old_dir, old_name);
                var relative = PATH_FS.relative(old_path, new_dirname);
                if (relative.charAt(0) !== ".") {
                    throw new FS.ErrnoError(28);
                }
                relative = PATH_FS.relative(new_path, old_dirname);
                if (relative.charAt(0) !== ".") {
                    throw new FS.ErrnoError(55);
                }
                var new_node;
                try {
                    new_node = FS.lookupNode(new_dir, new_name);
                } catch (e) {}
                if (old_node === new_node) {
                    return;
                }
                var isdir = FS.isDir(old_node.mode);
                var errCode = FS.mayDelete(old_dir, old_name, isdir);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                errCode = new_node
                    ? FS.mayDelete(new_dir, new_name, isdir)
                    : FS.mayCreate(new_dir, new_name);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!old_dir.node_ops.rename) {
                    throw new FS.ErrnoError(63);
                }
                if (
                    FS.isMountpoint(old_node) ||
                    (new_node && FS.isMountpoint(new_node))
                ) {
                    throw new FS.ErrnoError(10);
                }
                if (new_dir !== old_dir) {
                    errCode = FS.nodePermissions(old_dir, "w");
                    if (errCode) {
                        throw new FS.ErrnoError(errCode);
                    }
                }
                FS.hashRemoveNode(old_node);
                try {
                    old_dir.node_ops.rename(old_node, new_dir, new_name);
                } catch (e) {
                    throw e;
                } finally {
                    FS.hashAddNode(old_node);
                }
            },
            rmdir: (path) => {
                var lookup = FS.lookupPath(path, { parent: true });
                var parent = lookup.node;
                var name = PATH.basename(path);
                var node = FS.lookupNode(parent, name);
                var errCode = FS.mayDelete(parent, name, true);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.rmdir) {
                    throw new FS.ErrnoError(63);
                }
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                parent.node_ops.rmdir(parent, name);
                FS.destroyNode(node);
            },
            readdir: (path) => {
                var lookup = FS.lookupPath(path, { follow: true });
                var node = lookup.node;
                if (!node.node_ops.readdir) {
                    throw new FS.ErrnoError(54);
                }
                return node.node_ops.readdir(node);
            },
            unlink: (path) => {
                var lookup = FS.lookupPath(path, { parent: true });
                var parent = lookup.node;
                if (!parent) {
                    throw new FS.ErrnoError(44);
                }
                var name = PATH.basename(path);
                var node = FS.lookupNode(parent, name);
                var errCode = FS.mayDelete(parent, name, false);
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                if (!parent.node_ops.unlink) {
                    throw new FS.ErrnoError(63);
                }
                if (FS.isMountpoint(node)) {
                    throw new FS.ErrnoError(10);
                }
                parent.node_ops.unlink(parent, name);
                FS.destroyNode(node);
            },
            readlink: (path) => {
                var lookup = FS.lookupPath(path);
                var link = lookup.node;
                if (!link) {
                    throw new FS.ErrnoError(44);
                }
                if (!link.node_ops.readlink) {
                    throw new FS.ErrnoError(28);
                }
                return PATH_FS.resolve(
                    FS.getPath(link.parent),
                    link.node_ops.readlink(link),
                );
            },
            stat: (path, dontFollow) => {
                var lookup = FS.lookupPath(path, { follow: !dontFollow });
                var node = lookup.node;
                if (!node) {
                    throw new FS.ErrnoError(44);
                }
                if (!node.node_ops.getattr) {
                    throw new FS.ErrnoError(63);
                }
                return node.node_ops.getattr(node);
            },
            lstat: (path) => {
                return FS.stat(path, true);
            },
            chmod: (path, mode, dontFollow) => {
                var node;
                if (typeof path == "string") {
                    var lookup = FS.lookupPath(path, { follow: !dontFollow });
                    node = lookup.node;
                } else {
                    node = path;
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63);
                }
                node.node_ops.setattr(node, {
                    mode: (mode & 4095) | (node.mode & ~4095),
                    timestamp: Date.now(),
                });
            },
            lchmod: (path, mode) => {
                FS.chmod(path, mode, true);
            },
            fchmod: (fd, mode) => {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8);
                }
                FS.chmod(stream.node, mode);
            },
            chown: (path, uid, gid, dontFollow) => {
                var node;
                if (typeof path == "string") {
                    var lookup = FS.lookupPath(path, { follow: !dontFollow });
                    node = lookup.node;
                } else {
                    node = path;
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63);
                }
                node.node_ops.setattr(node, { timestamp: Date.now() });
            },
            lchown: (path, uid, gid) => {
                FS.chown(path, uid, gid, true);
            },
            fchown: (fd, uid, gid) => {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8);
                }
                FS.chown(stream.node, uid, gid);
            },
            truncate: (path, len) => {
                if (len < 0) {
                    throw new FS.ErrnoError(28);
                }
                var node;
                if (typeof path == "string") {
                    var lookup = FS.lookupPath(path, { follow: true });
                    node = lookup.node;
                } else {
                    node = path;
                }
                if (!node.node_ops.setattr) {
                    throw new FS.ErrnoError(63);
                }
                if (FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(31);
                }
                if (!FS.isFile(node.mode)) {
                    throw new FS.ErrnoError(28);
                }
                var errCode = FS.nodePermissions(node, "w");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                node.node_ops.setattr(node, {
                    size: len,
                    timestamp: Date.now(),
                });
            },
            ftruncate: (fd, len) => {
                var stream = FS.getStream(fd);
                if (!stream) {
                    throw new FS.ErrnoError(8);
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(28);
                }
                FS.truncate(stream.node, len);
            },
            utime: (path, atime, mtime) => {
                var lookup = FS.lookupPath(path, { follow: true });
                var node = lookup.node;
                node.node_ops.setattr(node, {
                    timestamp: Math.max(atime, mtime),
                });
            },
            open: (path, flags, mode, fd_start, fd_end) => {
                if (path === "") {
                    throw new FS.ErrnoError(44);
                }
                flags =
                    typeof flags == "string"
                        ? FS.modeStringToFlags(flags)
                        : flags;
                mode = typeof mode == "undefined" ? 438 : mode;
                if (flags & 64) {
                    mode = (mode & 4095) | 32768;
                } else {
                    mode = 0;
                }
                var node;
                if (typeof path == "object") {
                    node = path;
                } else {
                    path = PATH.normalize(path);
                    try {
                        var lookup = FS.lookupPath(path, {
                            follow: !(flags & 131072),
                        });
                        node = lookup.node;
                    } catch (e) {}
                }
                var created = false;
                if (flags & 64) {
                    if (node) {
                        if (flags & 128) {
                            throw new FS.ErrnoError(20);
                        }
                    } else {
                        node = FS.mknod(path, mode, 0);
                        created = true;
                    }
                }
                if (!node) {
                    throw new FS.ErrnoError(44);
                }
                if (FS.isChrdev(node.mode)) {
                    flags &= ~512;
                }
                if (flags & 65536 && !FS.isDir(node.mode)) {
                    throw new FS.ErrnoError(54);
                }
                if (!created) {
                    var errCode = FS.mayOpen(node, flags);
                    if (errCode) {
                        throw new FS.ErrnoError(errCode);
                    }
                }
                if (flags & 512) {
                    FS.truncate(node, 0);
                }
                flags &= ~(128 | 512 | 131072);
                var stream = FS.createStream(
                    {
                        node: node,
                        path: FS.getPath(node),
                        flags: flags,
                        seekable: true,
                        position: 0,
                        stream_ops: node.stream_ops,
                        ungotten: [],
                        error: false,
                    },
                    fd_start,
                    fd_end,
                );
                if (stream.stream_ops.open) {
                    stream.stream_ops.open(stream);
                }
                if (Module["logReadFiles"] && !(flags & 1)) {
                    if (!FS.readFiles) FS.readFiles = {};
                    if (!(path in FS.readFiles)) {
                        FS.readFiles[path] = 1;
                    }
                }
                return stream;
            },
            close: (stream) => {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if (stream.getdents) stream.getdents = null;
                try {
                    if (stream.stream_ops.close) {
                        stream.stream_ops.close(stream);
                    }
                } catch (e) {
                    throw e;
                } finally {
                    FS.closeStream(stream.fd);
                }
                stream.fd = null;
            },
            isClosed: (stream) => {
                return stream.fd === null;
            },
            llseek: (stream, offset, whence) => {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if (!stream.seekable || !stream.stream_ops.llseek) {
                    throw new FS.ErrnoError(70);
                }
                if (whence != 0 && whence != 1 && whence != 2) {
                    throw new FS.ErrnoError(28);
                }
                stream.position = stream.stream_ops.llseek(
                    stream,
                    offset,
                    whence,
                );
                stream.ungotten = [];
                return stream.position;
            },
            read: (stream, buffer, offset, length, position) => {
                if (length < 0 || position < 0) {
                    throw new FS.ErrnoError(28);
                }
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if ((stream.flags & 2097155) === 1) {
                    throw new FS.ErrnoError(8);
                }
                if (FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(31);
                }
                if (!stream.stream_ops.read) {
                    throw new FS.ErrnoError(28);
                }
                var seeking = typeof position != "undefined";
                if (!seeking) {
                    position = stream.position;
                } else if (!stream.seekable) {
                    throw new FS.ErrnoError(70);
                }
                var bytesRead = stream.stream_ops.read(
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                );
                if (!seeking) stream.position += bytesRead;
                return bytesRead;
            },
            write: (stream, buffer, offset, length, position, canOwn) => {
                if (length < 0 || position < 0) {
                    throw new FS.ErrnoError(28);
                }
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(8);
                }
                if (FS.isDir(stream.node.mode)) {
                    throw new FS.ErrnoError(31);
                }
                if (!stream.stream_ops.write) {
                    throw new FS.ErrnoError(28);
                }
                if (stream.seekable && stream.flags & 1024) {
                    FS.llseek(stream, 0, 2);
                }
                var seeking = typeof position != "undefined";
                if (!seeking) {
                    position = stream.position;
                } else if (!stream.seekable) {
                    throw new FS.ErrnoError(70);
                }
                var bytesWritten = stream.stream_ops.write(
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                    canOwn,
                );
                if (!seeking) stream.position += bytesWritten;
                return bytesWritten;
            },
            allocate: (stream, offset, length) => {
                if (FS.isClosed(stream)) {
                    throw new FS.ErrnoError(8);
                }
                if (offset < 0 || length <= 0) {
                    throw new FS.ErrnoError(28);
                }
                if ((stream.flags & 2097155) === 0) {
                    throw new FS.ErrnoError(8);
                }
                if (
                    !FS.isFile(stream.node.mode) &&
                    !FS.isDir(stream.node.mode)
                ) {
                    throw new FS.ErrnoError(43);
                }
                if (!stream.stream_ops.allocate) {
                    throw new FS.ErrnoError(138);
                }
                stream.stream_ops.allocate(stream, offset, length);
            },
            mmap: (stream, address, length, position, prot, flags) => {
                if (
                    (prot & 2) !== 0 &&
                    (flags & 2) === 0 &&
                    (stream.flags & 2097155) !== 2
                ) {
                    throw new FS.ErrnoError(2);
                }
                if ((stream.flags & 2097155) === 1) {
                    throw new FS.ErrnoError(2);
                }
                if (!stream.stream_ops.mmap) {
                    throw new FS.ErrnoError(43);
                }
                return stream.stream_ops.mmap(
                    stream,
                    address,
                    length,
                    position,
                    prot,
                    flags,
                );
            },
            msync: (stream, buffer, offset, length, mmapFlags) => {
                if (!stream || !stream.stream_ops.msync) {
                    return 0;
                }
                return stream.stream_ops.msync(
                    stream,
                    buffer,
                    offset,
                    length,
                    mmapFlags,
                );
            },
            munmap: (stream) => 0,
            ioctl: (stream, cmd, arg) => {
                if (!stream.stream_ops.ioctl) {
                    throw new FS.ErrnoError(59);
                }
                return stream.stream_ops.ioctl(stream, cmd, arg);
            },
            readFile: (path, opts = {}) => {
                opts.flags = opts.flags || 0;
                opts.encoding = opts.encoding || "binary";
                if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
                    throw new Error(
                        'Invalid encoding type "' + opts.encoding + '"',
                    );
                }
                var ret;
                var stream = FS.open(path, opts.flags);
                var stat = FS.stat(path);
                var length = stat.size;
                var buf = new Uint8Array(length);
                FS.read(stream, buf, 0, length, 0);
                if (opts.encoding === "utf8") {
                    ret = UTF8ArrayToString(buf, 0);
                } else if (opts.encoding === "binary") {
                    ret = buf;
                }
                FS.close(stream);
                return ret;
            },
            writeFile: (path, data, opts = {}) => {
                opts.flags = opts.flags || 577;
                var stream = FS.open(path, opts.flags, opts.mode);
                if (typeof data == "string") {
                    var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
                    var actualNumBytes = stringToUTF8Array(
                        data,
                        buf,
                        0,
                        buf.length,
                    );
                    FS.write(
                        stream,
                        buf,
                        0,
                        actualNumBytes,
                        undefined,
                        opts.canOwn,
                    );
                } else if (ArrayBuffer.isView(data)) {
                    FS.write(
                        stream,
                        data,
                        0,
                        data.byteLength,
                        undefined,
                        opts.canOwn,
                    );
                } else {
                    throw new Error("Unsupported data type");
                }
                FS.close(stream);
            },
            cwd: () => FS.currentPath,
            chdir: (path) => {
                var lookup = FS.lookupPath(path, { follow: true });
                if (lookup.node === null) {
                    throw new FS.ErrnoError(44);
                }
                if (!FS.isDir(lookup.node.mode)) {
                    throw new FS.ErrnoError(54);
                }
                var errCode = FS.nodePermissions(lookup.node, "x");
                if (errCode) {
                    throw new FS.ErrnoError(errCode);
                }
                FS.currentPath = lookup.path;
            },
            createDefaultDirectories: () => {
                FS.mkdir("/tmp");
                FS.mkdir("/home");
                FS.mkdir("/home/web_user");
            },
            createDefaultDevices: () => {
                FS.mkdir("/dev");
                FS.registerDevice(FS.makedev(1, 3), {
                    read: () => 0,
                    write: (stream, buffer, offset, length, pos) => length,
                });
                FS.mkdev("/dev/null", FS.makedev(1, 3));
                TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
                TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
                FS.mkdev("/dev/tty", FS.makedev(5, 0));
                FS.mkdev("/dev/tty1", FS.makedev(6, 0));
                var random_device = getRandomDevice();
                FS.createDevice("/dev", "random", random_device);
                FS.createDevice("/dev", "urandom", random_device);
                FS.mkdir("/dev/shm");
                FS.mkdir("/dev/shm/tmp");
            },
            createSpecialDirectories: () => {
                FS.mkdir("/proc");
                var proc_self = FS.mkdir("/proc/self");
                FS.mkdir("/proc/self/fd");
                FS.mount(
                    {
                        mount: () => {
                            var node = FS.createNode(
                                proc_self,
                                "fd",
                                16384 | 511,
                                73,
                            );
                            node.node_ops = {
                                lookup: (parent, name) => {
                                    var fd = +name;
                                    var stream = FS.getStream(fd);
                                    if (!stream) throw new FS.ErrnoError(8);
                                    var ret = {
                                        parent: null,
                                        mount: { mountpoint: "fake" },
                                        node_ops: {
                                            readlink: () => stream.path,
                                        },
                                    };
                                    ret.parent = ret;
                                    return ret;
                                },
                            };
                            return node;
                        },
                    },
                    {},
                    "/proc/self/fd",
                );
            },
            createStandardStreams: () => {
                if (Module["stdin"]) {
                    FS.createDevice("/dev", "stdin", Module["stdin"]);
                } else {
                    FS.symlink("/dev/tty", "/dev/stdin");
                }
                if (Module["stdout"]) {
                    FS.createDevice("/dev", "stdout", null, Module["stdout"]);
                } else {
                    FS.symlink("/dev/tty", "/dev/stdout");
                }
                if (Module["stderr"]) {
                    FS.createDevice("/dev", "stderr", null, Module["stderr"]);
                } else {
                    FS.symlink("/dev/tty1", "/dev/stderr");
                }
                var stdin = FS.open("/dev/stdin", 0);
                var stdout = FS.open("/dev/stdout", 1);
                var stderr = FS.open("/dev/stderr", 1);
                assert(
                    stdin.fd === 0,
                    "invalid handle for stdin (" + stdin.fd + ")",
                );
                assert(
                    stdout.fd === 1,
                    "invalid handle for stdout (" + stdout.fd + ")",
                );
                assert(
                    stderr.fd === 2,
                    "invalid handle for stderr (" + stderr.fd + ")",
                );
            },
            ensureErrnoError: () => {
                if (FS.ErrnoError) return;
                FS.ErrnoError = function ErrnoError(errno, node) {
                    this.node = node;
                    this.setErrno = function (errno) {
                        this.errno = errno;
                        for (var key in ERRNO_CODES) {
                            if (ERRNO_CODES[key] === errno) {
                                this.code = key;
                                break;
                            }
                        }
                    };
                    this.setErrno(errno);
                    this.message = ERRNO_MESSAGES[errno];
                    if (this.stack) {
                        Object.defineProperty(this, "stack", {
                            value: new Error().stack,
                            writable: true,
                        });
                        this.stack = demangleAll(this.stack);
                    }
                };
                FS.ErrnoError.prototype = new Error();
                FS.ErrnoError.prototype.constructor = FS.ErrnoError;
                [44].forEach((code) => {
                    FS.genericErrors[code] = new FS.ErrnoError(code);
                    FS.genericErrors[code].stack = "<generic error, no stack>";
                });
            },
            staticInit: () => {
                FS.ensureErrnoError();
                FS.nameTable = new Array(4096);
                FS.mount(MEMFS, {}, "/");
                FS.createDefaultDirectories();
                FS.createDefaultDevices();
                FS.createSpecialDirectories();
                FS.filesystems = { MEMFS: MEMFS };
            },
            init: (input, output, error) => {
                assert(
                    !FS.init.initialized,
                    "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)",
                );
                FS.init.initialized = true;
                FS.ensureErrnoError();
                Module["stdin"] = input || Module["stdin"];
                Module["stdout"] = output || Module["stdout"];
                Module["stderr"] = error || Module["stderr"];
                FS.createStandardStreams();
            },
            quit: () => {
                FS.init.initialized = false;
                ___stdio_exit();
                for (var i = 0; i < FS.streams.length; i++) {
                    var stream = FS.streams[i];
                    if (!stream) {
                        continue;
                    }
                    FS.close(stream);
                }
            },
            getMode: (canRead, canWrite) => {
                var mode = 0;
                if (canRead) mode |= 292 | 73;
                if (canWrite) mode |= 146;
                return mode;
            },
            findObject: (path, dontResolveLastLink) => {
                var ret = FS.analyzePath(path, dontResolveLastLink);
                if (ret.exists) {
                    return ret.object;
                } else {
                    return null;
                }
            },
            analyzePath: (path, dontResolveLastLink) => {
                try {
                    var lookup = FS.lookupPath(path, {
                        follow: !dontResolveLastLink,
                    });
                    path = lookup.path;
                } catch (e) {}
                var ret = {
                    isRoot: false,
                    exists: false,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: false,
                    parentPath: null,
                    parentObject: null,
                };
                try {
                    var lookup = FS.lookupPath(path, { parent: true });
                    ret.parentExists = true;
                    ret.parentPath = lookup.path;
                    ret.parentObject = lookup.node;
                    ret.name = PATH.basename(path);
                    lookup = FS.lookupPath(path, {
                        follow: !dontResolveLastLink,
                    });
                    ret.exists = true;
                    ret.path = lookup.path;
                    ret.object = lookup.node;
                    ret.name = lookup.node.name;
                    ret.isRoot = lookup.path === "/";
                } catch (e) {
                    ret.error = e.errno;
                }
                return ret;
            },
            createPath: (parent, path, canRead, canWrite) => {
                parent =
                    typeof parent == "string" ? parent : FS.getPath(parent);
                var parts = path.split("/").reverse();
                while (parts.length) {
                    var part = parts.pop();
                    if (!part) continue;
                    var current = PATH.join2(parent, part);
                    try {
                        FS.mkdir(current);
                    } catch (e) {}
                    parent = current;
                }
                return current;
            },
            createFile: (parent, name, properties, canRead, canWrite) => {
                var path = PATH.join2(
                    typeof parent == "string" ? parent : FS.getPath(parent),
                    name,
                );
                var mode = FS.getMode(canRead, canWrite);
                return FS.create(path, mode);
            },
            createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
                var path = name;
                if (parent) {
                    parent =
                        typeof parent == "string" ? parent : FS.getPath(parent);
                    path = name ? PATH.join2(parent, name) : parent;
                }
                var mode = FS.getMode(canRead, canWrite);
                var node = FS.create(path, mode);
                if (data) {
                    if (typeof data == "string") {
                        var arr = new Array(data.length);
                        for (var i = 0, len = data.length; i < len; ++i)
                            arr[i] = data.charCodeAt(i);
                        data = arr;
                    }
                    FS.chmod(node, mode | 146);
                    var stream = FS.open(node, 577);
                    FS.write(stream, data, 0, data.length, 0, canOwn);
                    FS.close(stream);
                    FS.chmod(node, mode);
                }
                return node;
            },
            createDevice: (parent, name, input, output) => {
                var path = PATH.join2(
                    typeof parent == "string" ? parent : FS.getPath(parent),
                    name,
                );
                var mode = FS.getMode(!!input, !!output);
                if (!FS.createDevice.major) FS.createDevice.major = 64;
                var dev = FS.makedev(FS.createDevice.major++, 0);
                FS.registerDevice(dev, {
                    open: (stream) => {
                        stream.seekable = false;
                    },
                    close: (stream) => {
                        if (output && output.buffer && output.buffer.length) {
                            output(10);
                        }
                    },
                    read: (stream, buffer, offset, length, pos) => {
                        var bytesRead = 0;
                        for (var i = 0; i < length; i++) {
                            var result;
                            try {
                                result = input();
                            } catch (e) {
                                throw new FS.ErrnoError(29);
                            }
                            if (result === undefined && bytesRead === 0) {
                                throw new FS.ErrnoError(6);
                            }
                            if (result === null || result === undefined) break;
                            bytesRead++;
                            buffer[offset + i] = result;
                        }
                        if (bytesRead) {
                            stream.node.timestamp = Date.now();
                        }
                        return bytesRead;
                    },
                    write: (stream, buffer, offset, length, pos) => {
                        for (var i = 0; i < length; i++) {
                            try {
                                output(buffer[offset + i]);
                            } catch (e) {
                                throw new FS.ErrnoError(29);
                            }
                        }
                        if (length) {
                            stream.node.timestamp = Date.now();
                        }
                        return i;
                    },
                });
                return FS.mkdev(path, mode, dev);
            },
            forceLoadFile: (obj) => {
                if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
                    return true;
                if (typeof XMLHttpRequest != "undefined") {
                    throw new Error(
                        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
                    );
                } else if (read_) {
                    try {
                        obj.contents = intArrayFromString(read_(obj.url), true);
                        obj.usedBytes = obj.contents.length;
                    } catch (e) {
                        throw new FS.ErrnoError(29);
                    }
                } else {
                    throw new Error(
                        "Cannot load without read() or XMLHttpRequest.",
                    );
                }
            },
            createLazyFile: (parent, name, url, canRead, canWrite) => {
                function LazyUint8Array() {
                    this.lengthKnown = false;
                    this.chunks = [];
                }
                LazyUint8Array.prototype.get = function LazyUint8Array_get(
                    idx,
                ) {
                    if (idx > this.length - 1 || idx < 0) {
                        return undefined;
                    }
                    var chunkOffset = idx % this.chunkSize;
                    var chunkNum = (idx / this.chunkSize) | 0;
                    return this.getter(chunkNum)[chunkOffset];
                };
                LazyUint8Array.prototype.setDataGetter =
                    function LazyUint8Array_setDataGetter(getter) {
                        this.getter = getter;
                    };
                LazyUint8Array.prototype.cacheLength =
                    function LazyUint8Array_cacheLength() {
                        var xhr = new XMLHttpRequest();
                        xhr.open("HEAD", url, false);
                        xhr.send(null);
                        if (
                            !(
                                (xhr.status >= 200 && xhr.status < 300) ||
                                xhr.status === 304
                            )
                        )
                            throw new Error(
                                "Couldn't load " +
                                    url +
                                    ". Status: " +
                                    xhr.status,
                            );
                        var datalength = Number(
                            xhr.getResponseHeader("Content-length"),
                        );
                        var header;
                        var hasByteServing =
                            (header = xhr.getResponseHeader("Accept-Ranges")) &&
                            header === "bytes";
                        var usesGzip =
                            (header =
                                xhr.getResponseHeader("Content-Encoding")) &&
                            header === "gzip";
                        var chunkSize = 1024 * 1024;
                        if (!hasByteServing) chunkSize = datalength;
                        var doXHR = (from, to) => {
                            if (from > to)
                                throw new Error(
                                    "invalid range (" +
                                        from +
                                        ", " +
                                        to +
                                        ") or no bytes requested!",
                                );
                            if (to > datalength - 1)
                                throw new Error(
                                    "only " +
                                        datalength +
                                        " bytes available! programmer error!",
                                );
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET", url, false);
                            if (datalength !== chunkSize)
                                xhr.setRequestHeader(
                                    "Range",
                                    "bytes=" + from + "-" + to,
                                );
                            xhr.responseType = "arraybuffer";
                            if (xhr.overrideMimeType) {
                                xhr.overrideMimeType(
                                    "text/plain; charset=x-user-defined",
                                );
                            }
                            xhr.send(null);
                            if (
                                !(
                                    (xhr.status >= 200 && xhr.status < 300) ||
                                    xhr.status === 304
                                )
                            )
                                throw new Error(
                                    "Couldn't load " +
                                        url +
                                        ". Status: " +
                                        xhr.status,
                                );
                            if (xhr.response !== undefined) {
                                return new Uint8Array(xhr.response || []);
                            } else {
                                return intArrayFromString(
                                    xhr.responseText || "",
                                    true,
                                );
                            }
                        };
                        var lazyArray = this;
                        lazyArray.setDataGetter((chunkNum) => {
                            var start = chunkNum * chunkSize;
                            var end = (chunkNum + 1) * chunkSize - 1;
                            end = Math.min(end, datalength - 1);
                            if (
                                typeof lazyArray.chunks[chunkNum] == "undefined"
                            ) {
                                lazyArray.chunks[chunkNum] = doXHR(start, end);
                            }
                            if (
                                typeof lazyArray.chunks[chunkNum] == "undefined"
                            )
                                throw new Error("doXHR failed!");
                            return lazyArray.chunks[chunkNum];
                        });
                        if (usesGzip || !datalength) {
                            chunkSize = datalength = 1;
                            datalength = this.getter(0).length;
                            chunkSize = datalength;
                            out(
                                "LazyFiles on gzip forces download of the whole file when length is accessed",
                            );
                        }
                        this._length = datalength;
                        this._chunkSize = chunkSize;
                        this.lengthKnown = true;
                    };
                if (typeof XMLHttpRequest != "undefined") {
                    if (!ENVIRONMENT_IS_WORKER)
                        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var lazyArray = new LazyUint8Array();
                    Object.defineProperties(lazyArray, {
                        length: {
                            get: function () {
                                if (!this.lengthKnown) {
                                    this.cacheLength();
                                }
                                return this._length;
                            },
                        },
                        chunkSize: {
                            get: function () {
                                if (!this.lengthKnown) {
                                    this.cacheLength();
                                }
                                return this._chunkSize;
                            },
                        },
                    });
                    var properties = { isDevice: false, contents: lazyArray };
                } else {
                    var properties = { isDevice: false, url: url };
                }
                var node = FS.createFile(
                    parent,
                    name,
                    properties,
                    canRead,
                    canWrite,
                );
                if (properties.contents) {
                    node.contents = properties.contents;
                } else if (properties.url) {
                    node.contents = null;
                    node.url = properties.url;
                }
                Object.defineProperties(node, {
                    usedBytes: {
                        get: function () {
                            return this.contents.length;
                        },
                    },
                });
                var stream_ops = {};
                var keys = Object.keys(node.stream_ops);
                keys.forEach((key) => {
                    var fn = node.stream_ops[key];
                    stream_ops[key] = function forceLoadLazyFile() {
                        FS.forceLoadFile(node);
                        return fn.apply(null, arguments);
                    };
                });
                stream_ops.read = (
                    stream,
                    buffer,
                    offset,
                    length,
                    position,
                ) => {
                    FS.forceLoadFile(node);
                    var contents = stream.node.contents;
                    if (position >= contents.length) return 0;
                    var size = Math.min(contents.length - position, length);
                    assert(size >= 0);
                    if (contents.slice) {
                        for (var i = 0; i < size; i++) {
                            buffer[offset + i] = contents[position + i];
                        }
                    } else {
                        for (var i = 0; i < size; i++) {
                            buffer[offset + i] = contents.get(position + i);
                        }
                    }
                    return size;
                };
                node.stream_ops = stream_ops;
                return node;
            },
            createPreloadedFile: (
                parent,
                name,
                url,
                canRead,
                canWrite,
                onload,
                onerror,
                dontCreateFile,
                canOwn,
                preFinish,
            ) => {
                var fullname = name
                    ? PATH_FS.resolve(PATH.join2(parent, name))
                    : parent;
                var dep = getUniqueRunDependency("cp " + fullname);
                function processData(byteArray) {
                    function finish(byteArray) {
                        if (preFinish) preFinish();
                        if (!dontCreateFile) {
                            FS.createDataFile(
                                parent,
                                name,
                                byteArray,
                                canRead,
                                canWrite,
                                canOwn,
                            );
                        }
                        if (onload) onload();
                        removeRunDependency(dep);
                    }
                    if (
                        Browser.handledByPreloadPlugin(
                            byteArray,
                            fullname,
                            finish,
                            () => {
                                if (onerror) onerror();
                                removeRunDependency(dep);
                            },
                        )
                    ) {
                        return;
                    }
                    finish(byteArray);
                }
                addRunDependency(dep);
                if (typeof url == "string") {
                    asyncLoad(
                        url,
                        (byteArray) => processData(byteArray),
                        onerror,
                    );
                } else {
                    processData(url);
                }
            },
            indexedDB: () => {
                return (
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                );
            },
            DB_NAME: () => {
                return "EM_FS_" + window.location.pathname;
            },
            DB_VERSION: 20,
            DB_STORE_NAME: "FILE_DATA",
            saveFilesToDB: (paths, onload, onerror) => {
                onload = onload || (() => {});
                onerror = onerror || (() => {});
                var indexedDB = FS.indexedDB();
                try {
                    var openRequest = indexedDB.open(
                        FS.DB_NAME(),
                        FS.DB_VERSION,
                    );
                } catch (e) {
                    return onerror(e);
                }
                openRequest.onupgradeneeded = () => {
                    out("creating db");
                    var db = openRequest.result;
                    db.createObjectStore(FS.DB_STORE_NAME);
                };
                openRequest.onsuccess = () => {
                    var db = openRequest.result;
                    var transaction = db.transaction(
                        [FS.DB_STORE_NAME],
                        "readwrite",
                    );
                    var files = transaction.objectStore(FS.DB_STORE_NAME);
                    var ok = 0,
                        fail = 0,
                        total = paths.length;
                    function finish() {
                        if (fail == 0) onload();
                        else onerror();
                    }
                    paths.forEach((path) => {
                        var putRequest = files.put(
                            FS.analyzePath(path).object.contents,
                            path,
                        );
                        putRequest.onsuccess = () => {
                            ok++;
                            if (ok + fail == total) finish();
                        };
                        putRequest.onerror = () => {
                            fail++;
                            if (ok + fail == total) finish();
                        };
                    });
                    transaction.onerror = onerror;
                };
                openRequest.onerror = onerror;
            },
            loadFilesFromDB: (paths, onload, onerror) => {
                onload = onload || (() => {});
                onerror = onerror || (() => {});
                var indexedDB = FS.indexedDB();
                try {
                    var openRequest = indexedDB.open(
                        FS.DB_NAME(),
                        FS.DB_VERSION,
                    );
                } catch (e) {
                    return onerror(e);
                }
                openRequest.onupgradeneeded = onerror;
                openRequest.onsuccess = () => {
                    var db = openRequest.result;
                    try {
                        var transaction = db.transaction(
                            [FS.DB_STORE_NAME],
                            "readonly",
                        );
                    } catch (e) {
                        onerror(e);
                        return;
                    }
                    var files = transaction.objectStore(FS.DB_STORE_NAME);
                    var ok = 0,
                        fail = 0,
                        total = paths.length;
                    function finish() {
                        if (fail == 0) onload();
                        else onerror();
                    }
                    paths.forEach((path) => {
                        var getRequest = files.get(path);
                        getRequest.onsuccess = () => {
                            if (FS.analyzePath(path).exists) {
                                FS.unlink(path);
                            }
                            FS.createDataFile(
                                PATH.dirname(path),
                                PATH.basename(path),
                                getRequest.result,
                                true,
                                true,
                                true,
                            );
                            ok++;
                            if (ok + fail == total) finish();
                        };
                        getRequest.onerror = () => {
                            fail++;
                            if (ok + fail == total) finish();
                        };
                    });
                    transaction.onerror = onerror;
                };
                openRequest.onerror = onerror;
            },
            absolutePath: () => {
                abort(
                    "FS.absolutePath has been removed; use PATH_FS.resolve instead",
                );
            },
            createFolder: () => {
                abort("FS.createFolder has been removed; use FS.mkdir instead");
            },
            createLink: () => {
                abort("FS.createLink has been removed; use FS.symlink instead");
            },
            joinPath: () => {
                abort("FS.joinPath has been removed; use PATH.join instead");
            },
            mmapAlloc: () => {
                abort(
                    "FS.mmapAlloc has been replaced by the top level function mmapAlloc",
                );
            },
            standardizePath: () => {
                abort(
                    "FS.standardizePath has been removed; use PATH.normalize instead",
                );
            },
        };
        var SYSCALLS = {
            DEFAULT_POLLMASK: 5,
            calculateAt: function (dirfd, path, allowEmpty) {
                if (path[0] === "/") {
                    return path;
                }
                var dir;
                if (dirfd === -100) {
                    dir = FS.cwd();
                } else {
                    var dirstream = FS.getStream(dirfd);
                    if (!dirstream) throw new FS.ErrnoError(8);
                    dir = dirstream.path;
                }
                if (path.length == 0) {
                    if (!allowEmpty) {
                        throw new FS.ErrnoError(44);
                    }
                    return dir;
                }
                return PATH.join2(dir, path);
            },
            doStat: function (func, path, buf) {
                try {
                    var stat = func(path);
                } catch (e) {
                    if (
                        e &&
                        e.node &&
                        PATH.normalize(path) !==
                            PATH.normalize(FS.getPath(e.node))
                    ) {
                        return -54;
                    }
                    throw e;
                }
                GROWABLE_HEAP_I32()[buf >> 2] = stat.dev;
                GROWABLE_HEAP_I32()[(buf + 4) >> 2] = 0;
                GROWABLE_HEAP_I32()[(buf + 8) >> 2] = stat.ino;
                GROWABLE_HEAP_I32()[(buf + 12) >> 2] = stat.mode;
                GROWABLE_HEAP_I32()[(buf + 16) >> 2] = stat.nlink;
                GROWABLE_HEAP_I32()[(buf + 20) >> 2] = stat.uid;
                GROWABLE_HEAP_I32()[(buf + 24) >> 2] = stat.gid;
                GROWABLE_HEAP_I32()[(buf + 28) >> 2] = stat.rdev;
                GROWABLE_HEAP_I32()[(buf + 32) >> 2] = 0;
                (tempI64 = [
                    stat.size >>> 0,
                    ((tempDouble = stat.size),
                    +Math.abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math.min(
                                  +Math.floor(tempDouble / 4294967296),
                                  4294967295,
                              ) |
                                  0) >>>
                              0
                            : ~~+Math.ceil(
                                  (tempDouble - +(~~tempDouble >>> 0)) /
                                      4294967296,
                              ) >>> 0
                        : 0),
                ]),
                    (GROWABLE_HEAP_I32()[(buf + 40) >> 2] = tempI64[0]),
                    (GROWABLE_HEAP_I32()[(buf + 44) >> 2] = tempI64[1]);
                GROWABLE_HEAP_I32()[(buf + 48) >> 2] = 4096;
                GROWABLE_HEAP_I32()[(buf + 52) >> 2] = stat.blocks;
                GROWABLE_HEAP_I32()[(buf + 56) >> 2] =
                    (stat.atime.getTime() / 1e3) | 0;
                GROWABLE_HEAP_I32()[(buf + 60) >> 2] = 0;
                GROWABLE_HEAP_I32()[(buf + 64) >> 2] =
                    (stat.mtime.getTime() / 1e3) | 0;
                GROWABLE_HEAP_I32()[(buf + 68) >> 2] = 0;
                GROWABLE_HEAP_I32()[(buf + 72) >> 2] =
                    (stat.ctime.getTime() / 1e3) | 0;
                GROWABLE_HEAP_I32()[(buf + 76) >> 2] = 0;
                (tempI64 = [
                    stat.ino >>> 0,
                    ((tempDouble = stat.ino),
                    +Math.abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math.min(
                                  +Math.floor(tempDouble / 4294967296),
                                  4294967295,
                              ) |
                                  0) >>>
                              0
                            : ~~+Math.ceil(
                                  (tempDouble - +(~~tempDouble >>> 0)) /
                                      4294967296,
                              ) >>> 0
                        : 0),
                ]),
                    (GROWABLE_HEAP_I32()[(buf + 80) >> 2] = tempI64[0]),
                    (GROWABLE_HEAP_I32()[(buf + 84) >> 2] = tempI64[1]);
                return 0;
            },
            doMsync: function (addr, stream, len, flags, offset) {
                var buffer = GROWABLE_HEAP_U8().slice(addr, addr + len);
                FS.msync(stream, buffer, offset, len, flags);
            },
            doMkdir: function (path, mode) {
                path = PATH.normalize(path);
                if (path[path.length - 1] === "/")
                    path = path.substr(0, path.length - 1);
                FS.mkdir(path, mode, 0);
                return 0;
            },
            doMknod: function (path, mode, dev) {
                switch (mode & 61440) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                        break;
                    default:
                        return -28;
                }
                FS.mknod(path, mode, dev);
                return 0;
            },
            doReadlink: function (path, buf, bufsize) {
                if (bufsize <= 0) return -28;
                var ret = FS.readlink(path);
                var len = Math.min(bufsize, lengthBytesUTF8(ret));
                var endChar = GROWABLE_HEAP_I8()[buf + len];
                stringToUTF8(ret, buf, bufsize + 1);
                GROWABLE_HEAP_I8()[buf + len] = endChar;
                return len;
            },
            doAccess: function (path, amode) {
                if (amode & ~7) {
                    return -28;
                }
                var lookup = FS.lookupPath(path, { follow: true });
                var node = lookup.node;
                if (!node) {
                    return -44;
                }
                var perms = "";
                if (amode & 4) perms += "r";
                if (amode & 2) perms += "w";
                if (amode & 1) perms += "x";
                if (perms && FS.nodePermissions(node, perms)) {
                    return -2;
                }
                return 0;
            },
            doReadv: function (stream, iov, iovcnt, offset) {
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = GROWABLE_HEAP_I32()[(iov + i * 8) >> 2];
                    var len = GROWABLE_HEAP_I32()[(iov + (i * 8 + 4)) >> 2];
                    var curr = FS.read(
                        stream,
                        GROWABLE_HEAP_I8(),
                        ptr,
                        len,
                        offset,
                    );
                    if (curr < 0) return -1;
                    ret += curr;
                    if (curr < len) break;
                }
                return ret;
            },
            doWritev: function (stream, iov, iovcnt, offset) {
                var ret = 0;
                for (var i = 0; i < iovcnt; i++) {
                    var ptr = GROWABLE_HEAP_I32()[(iov + i * 8) >> 2];
                    var len = GROWABLE_HEAP_I32()[(iov + (i * 8 + 4)) >> 2];
                    var curr = FS.write(
                        stream,
                        GROWABLE_HEAP_I8(),
                        ptr,
                        len,
                        offset,
                    );
                    if (curr < 0) return -1;
                    ret += curr;
                }
                return ret;
            },
            varargs: undefined,
            get: function () {
                assert(SYSCALLS.varargs != undefined);
                SYSCALLS.varargs += 4;
                var ret = GROWABLE_HEAP_I32()[(SYSCALLS.varargs - 4) >> 2];
                return ret;
            },
            getStr: function (ptr) {
                var ret = UTF8ToString(ptr);
                return ret;
            },
            getStreamFromFD: function (fd) {
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                return stream;
            },
            get64: function (low, high) {
                if (low >= 0) assert(high === 0);
                else assert(high === -1);
                return low;
            },
        };
        function ___syscall_fcntl64(fd, cmd, varargs) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    3,
                    1,
                    fd,
                    cmd,
                    varargs,
                );
            SYSCALLS.varargs = varargs;
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                switch (cmd) {
                    case 0: {
                        var arg = SYSCALLS.get();
                        if (arg < 0) {
                            return -28;
                        }
                        var newStream;
                        newStream = FS.open(stream.path, stream.flags, 0, arg);
                        return newStream.fd;
                    }
                    case 1:
                    case 2:
                        return 0;
                    case 3:
                        return stream.flags;
                    case 4: {
                        var arg = SYSCALLS.get();
                        stream.flags |= arg;
                        return 0;
                    }
                    case 5: {
                        var arg = SYSCALLS.get();
                        var offset = 0;
                        GROWABLE_HEAP_I16()[(arg + offset) >> 1] = 2;
                        return 0;
                    }
                    case 6:
                    case 7:
                        return 0;
                    case 16:
                    case 8:
                        return -28;
                    case 9:
                        setErrNo(28);
                        return -1;
                    default: {
                        return -28;
                    }
                }
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        function ___syscall_openat(dirfd, path, flags, varargs) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    4,
                    1,
                    dirfd,
                    path,
                    flags,
                    varargs,
                );
            SYSCALLS.varargs = varargs;
            try {
                path = SYSCALLS.getStr(path);
                path = SYSCALLS.calculateAt(dirfd, path);
                var mode = varargs ? SYSCALLS.get() : 0;
                return FS.open(path, flags, mode).fd;
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return -e.errno;
            }
        }
        function __emscripten_date_now() {
            return Date.now();
        }
        function __emscripten_default_pthread_stack_size() {
            return 2097152;
        }
        function __emscripten_fetch_free(id) {
            delete Fetch.xhrs[id - 1];
        }
        var nowIsMonotonic = true;
        function __emscripten_get_now_is_monotonic() {
            return nowIsMonotonic;
        }
        function __emscripten_notify_proxying_queue(
            targetThreadId,
            currThreadId,
            mainThreadId,
            queue,
        ) {
            if (targetThreadId == currThreadId) {
                setTimeout(() => {
                    if (_pthread_self()) {
                        _emscripten_proxy_execute_queue(queue);
                    }
                    Atomics.sub(GROWABLE_HEAP_I32(), queue >> 2, 1);
                });
            } else if (ENVIRONMENT_IS_PTHREAD) {
                postMessage({
                    targetThread: targetThreadId,
                    cmd: "processProxyingQueue",
                    queue: queue,
                });
            } else {
                var pthread = PThread.pthreads[targetThreadId];
                var worker = pthread && pthread.worker;
                if (!worker) {
                    err(
                        "Cannot send message to thread with ID " +
                            targetThreadId +
                            ", unknown thread ID!",
                    );
                    return;
                }
                worker.postMessage({
                    cmd: "processProxyingQueue",
                    queue: queue,
                });
            }
            return 1;
        }
        function __emscripten_set_offscreencanvas_size(target, width, height) {
            err(
                "emscripten_set_offscreencanvas_size: Build with -sOFFSCREENCANVAS_SUPPORT=1 to enable transferring canvases to pthreads.",
            );
            return -1;
        }
        function __gmtime_js(time, tmPtr) {
            var date = new Date(GROWABLE_HEAP_I32()[time >> 2] * 1e3);
            GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getUTCSeconds();
            GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2] = date.getUTCMinutes();
            GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2] = date.getUTCHours();
            GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2] = date.getUTCDate();
            GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2] = date.getUTCMonth();
            GROWABLE_HEAP_I32()[(tmPtr + 20) >> 2] =
                date.getUTCFullYear() - 1900;
            GROWABLE_HEAP_I32()[(tmPtr + 24) >> 2] = date.getUTCDay();
            var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
            var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
            GROWABLE_HEAP_I32()[(tmPtr + 28) >> 2] = yday;
        }
        function __localtime_js(time, tmPtr) {
            var date = new Date(GROWABLE_HEAP_I32()[time >> 2] * 1e3);
            GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getSeconds();
            GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2] = date.getMinutes();
            GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2] = date.getHours();
            GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2] = date.getDate();
            GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2] = date.getMonth();
            GROWABLE_HEAP_I32()[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
            GROWABLE_HEAP_I32()[(tmPtr + 24) >> 2] = date.getDay();
            var start = new Date(date.getFullYear(), 0, 1);
            var yday =
                ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
            GROWABLE_HEAP_I32()[(tmPtr + 28) >> 2] = yday;
            GROWABLE_HEAP_I32()[(tmPtr + 36) >> 2] = -(
                date.getTimezoneOffset() * 60
            );
            var summerOffset = new Date(
                date.getFullYear(),
                6,
                1,
            ).getTimezoneOffset();
            var winterOffset = start.getTimezoneOffset();
            var dst =
                (summerOffset != winterOffset &&
                    date.getTimezoneOffset() ==
                        Math.min(winterOffset, summerOffset)) | 0;
            GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2] = dst;
        }
        function __mktime_js(tmPtr) {
            var date = new Date(
                GROWABLE_HEAP_I32()[(tmPtr + 20) >> 2] + 1900,
                GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2],
                GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2],
                GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2],
                GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2],
                GROWABLE_HEAP_I32()[tmPtr >> 2],
                0,
            );
            var dst = GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2];
            var guessedOffset = date.getTimezoneOffset();
            var start = new Date(date.getFullYear(), 0, 1);
            var summerOffset = new Date(
                date.getFullYear(),
                6,
                1,
            ).getTimezoneOffset();
            var winterOffset = start.getTimezoneOffset();
            var dstOffset = Math.min(winterOffset, summerOffset);
            if (dst < 0) {
                GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2] = Number(
                    summerOffset != winterOffset && dstOffset == guessedOffset,
                );
            } else if (dst > 0 != (dstOffset == guessedOffset)) {
                var nonDstOffset = Math.max(winterOffset, summerOffset);
                var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
                date.setTime(
                    date.getTime() + (trueOffset - guessedOffset) * 6e4,
                );
            }
            GROWABLE_HEAP_I32()[(tmPtr + 24) >> 2] = date.getDay();
            var yday =
                ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
            GROWABLE_HEAP_I32()[(tmPtr + 28) >> 2] = yday;
            GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getSeconds();
            GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2] = date.getMinutes();
            GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2] = date.getHours();
            GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2] = date.getDate();
            GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2] = date.getMonth();
            return (date.getTime() / 1e3) | 0;
        }
        function _tzset_impl(timezone, daylight, tzname) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    5,
                    1,
                    timezone,
                    daylight,
                    tzname,
                );
            var currentYear = new Date().getFullYear();
            var winter = new Date(currentYear, 0, 1);
            var summer = new Date(currentYear, 6, 1);
            var winterOffset = winter.getTimezoneOffset();
            var summerOffset = summer.getTimezoneOffset();
            var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
            GROWABLE_HEAP_I32()[timezone >> 2] = stdTimezoneOffset * 60;
            GROWABLE_HEAP_I32()[daylight >> 2] = Number(
                winterOffset != summerOffset,
            );
            function extractZone(date) {
                var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                return match ? match[1] : "GMT";
            }
            var winterName = extractZone(winter);
            var summerName = extractZone(summer);
            var winterNamePtr = allocateUTF8(winterName);
            var summerNamePtr = allocateUTF8(summerName);
            if (summerOffset < winterOffset) {
                GROWABLE_HEAP_I32()[tzname >> 2] = winterNamePtr;
                GROWABLE_HEAP_I32()[(tzname + 4) >> 2] = summerNamePtr;
            } else {
                GROWABLE_HEAP_I32()[tzname >> 2] = summerNamePtr;
                GROWABLE_HEAP_I32()[(tzname + 4) >> 2] = winterNamePtr;
            }
        }
        function __tzset_js(timezone, daylight, tzname) {
            if (__tzset_js.called) return;
            __tzset_js.called = true;
            _tzset_impl(timezone, daylight, tzname);
        }
        function _abort() {
            abort("native code called abort()");
        }
        var readAsmConstArgsArray = [];
        function readAsmConstArgs(sigPtr, buf) {
            assert(Array.isArray(readAsmConstArgsArray));
            assert(buf % 16 == 0);
            readAsmConstArgsArray.length = 0;
            var ch;
            buf >>= 2;
            while ((ch = GROWABLE_HEAP_U8()[sigPtr++])) {
                assert(
                    ch === 100 || ch === 102 || ch === 105,
                    "Invalid character " +
                        ch +
                        '("' +
                        String.fromCharCode(ch) +
                        '") in readAsmConstArgs! Use only "d", "f" or "i", and do not specify "v" for void return argument.',
                );
                var readAsmConstArgsDouble = ch < 105;
                if (readAsmConstArgsDouble && buf & 1) buf++;
                readAsmConstArgsArray.push(
                    readAsmConstArgsDouble
                        ? GROWABLE_HEAP_F64()[buf++ >> 1]
                        : GROWABLE_HEAP_I32()[buf],
                );
                ++buf;
            }
            return readAsmConstArgsArray;
        }
        function _emscripten_asm_const_int(code, sigPtr, argbuf) {
            var args = readAsmConstArgs(sigPtr, argbuf);
            if (!ASM_CONSTS.hasOwnProperty(code))
                abort("No EM_ASM constant found at address " + code);
            return ASM_CONSTS[code].apply(null, args);
        }
        function _emscripten_set_main_loop_timing(mode, value) {
            Browser.mainLoop.timingMode = mode;
            Browser.mainLoop.timingValue = value;
            if (!Browser.mainLoop.func) {
                err(
                    "emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.",
                );
                return 1;
            }
            if (!Browser.mainLoop.running) {
                runtimeKeepalivePush();
                Browser.mainLoop.running = true;
            }
            if (mode == 0) {
                Browser.mainLoop.scheduler =
                    function Browser_mainLoop_scheduler_setTimeout() {
                        var timeUntilNextTick =
                            Math.max(
                                0,
                                Browser.mainLoop.tickStartTime +
                                    value -
                                    _emscripten_get_now(),
                            ) | 0;
                        setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
                    };
                Browser.mainLoop.method = "timeout";
            } else if (mode == 1) {
                Browser.mainLoop.scheduler =
                    function Browser_mainLoop_scheduler_rAF() {
                        Browser.requestAnimationFrame(Browser.mainLoop.runner);
                    };
                Browser.mainLoop.method = "rAF";
            } else if (mode == 2) {
                if (typeof setImmediate == "undefined") {
                    var setImmediates = [];
                    var emscriptenMainLoopMessageId = "setimmediate";
                    var Browser_setImmediate_messageHandler = function (event) {
                        if (
                            event.data === emscriptenMainLoopMessageId ||
                            event.data.target === emscriptenMainLoopMessageId
                        ) {
                            event.stopPropagation();
                            setImmediates.shift()();
                        }
                    };
                    addEventListener(
                        "message",
                        Browser_setImmediate_messageHandler,
                        true,
                    );
                    setImmediate = function Browser_emulated_setImmediate(
                        func,
                    ) {
                        setImmediates.push(func);
                        if (ENVIRONMENT_IS_WORKER) {
                            if (Module["setImmediates"] === undefined)
                                Module["setImmediates"] = [];
                            Module["setImmediates"].push(func);
                            postMessage({
                                target: emscriptenMainLoopMessageId,
                            });
                        } else postMessage(emscriptenMainLoopMessageId, "*");
                    };
                }
                Browser.mainLoop.scheduler =
                    function Browser_mainLoop_scheduler_setImmediate() {
                        setImmediate(Browser.mainLoop.runner);
                    };
                Browser.mainLoop.method = "immediate";
            }
            return 0;
        }
        var _emscripten_get_now;
        if (ENVIRONMENT_IS_PTHREAD) {
            _emscripten_get_now = () =>
                performance.now() - Module["__performance_now_clock_drift"];
        } else _emscripten_get_now = () => performance.now();
        function runtimeKeepalivePush() {}
        function maybeExit() {}
        function setMainLoop(
            browserIterationFunc,
            fps,
            simulateInfiniteLoop,
            arg,
            noSetTiming,
        ) {
            assert(
                !Browser.mainLoop.func,
                "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.",
            );
            Browser.mainLoop.func = browserIterationFunc;
            Browser.mainLoop.arg = arg;
            var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
            function checkIsRunning() {
                if (
                    thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop
                ) {
                    runtimeKeepalivePop();
                    maybeExit();
                    return false;
                }
                return true;
            }
            Browser.mainLoop.running = false;
            Browser.mainLoop.runner = function Browser_mainLoop_runner() {
                if (ABORT) return;
                if (Browser.mainLoop.queue.length > 0) {
                    var start = Date.now();
                    var blocker = Browser.mainLoop.queue.shift();
                    blocker.func(blocker.arg);
                    if (Browser.mainLoop.remainingBlockers) {
                        var remaining = Browser.mainLoop.remainingBlockers;
                        var next =
                            remaining % 1 == 0
                                ? remaining - 1
                                : Math.floor(remaining);
                        if (blocker.counted) {
                            Browser.mainLoop.remainingBlockers = next;
                        } else {
                            next = next + 0.5;
                            Browser.mainLoop.remainingBlockers =
                                (8 * remaining + next) / 9;
                        }
                    }
                    out(
                        'main loop blocker "' +
                            blocker.name +
                            '" took ' +
                            (Date.now() - start) +
                            " ms",
                    );
                    Browser.mainLoop.updateStatus();
                    if (!checkIsRunning()) return;
                    setTimeout(Browser.mainLoop.runner, 0);
                    return;
                }
                if (!checkIsRunning()) return;
                Browser.mainLoop.currentFrameNumber =
                    (Browser.mainLoop.currentFrameNumber + 1) | 0;
                if (
                    Browser.mainLoop.timingMode == 1 &&
                    Browser.mainLoop.timingValue > 1 &&
                    Browser.mainLoop.currentFrameNumber %
                        Browser.mainLoop.timingValue !=
                        0
                ) {
                    Browser.mainLoop.scheduler();
                    return;
                } else if (Browser.mainLoop.timingMode == 0) {
                    Browser.mainLoop.tickStartTime = _emscripten_get_now();
                }
                if (Browser.mainLoop.method === "timeout" && Module.ctx) {
                    warnOnce(
                        "Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!",
                    );
                    Browser.mainLoop.method = "";
                }
                Browser.mainLoop.runIter(browserIterationFunc);
                checkStackCookie();
                if (!checkIsRunning()) return;
                if (
                    typeof SDL == "object" &&
                    SDL.audio &&
                    SDL.audio.queueNewAudioData
                )
                    SDL.audio.queueNewAudioData();
                Browser.mainLoop.scheduler();
            };
            if (!noSetTiming) {
                if (fps && fps > 0)
                    _emscripten_set_main_loop_timing(0, 1e3 / fps);
                else _emscripten_set_main_loop_timing(1, 1);
                Browser.mainLoop.scheduler();
            }
            if (simulateInfiniteLoop) {
                throw "unwind";
            }
        }
        function callUserCallback(func, synchronous) {
            if (ABORT) {
                err(
                    "user callback triggered after runtime exited or application aborted.  Ignoring.",
                );
                return;
            }
            if (synchronous) {
                func();
                return;
            }
            try {
                func();
                if (ENVIRONMENT_IS_PTHREAD) maybeExit();
            } catch (e) {
                handleException(e);
            }
        }
        function runtimeKeepalivePop() {}
        function safeSetTimeout(func, timeout) {
            runtimeKeepalivePush();
            return setTimeout(function () {
                runtimeKeepalivePop();
                callUserCallback(func);
            }, timeout);
        }
        var Browser = {
            mainLoop: {
                running: false,
                scheduler: null,
                method: "",
                currentlyRunningMainloop: 0,
                func: null,
                arg: 0,
                timingMode: 0,
                timingValue: 0,
                currentFrameNumber: 0,
                queue: [],
                pause: function () {
                    Browser.mainLoop.scheduler = null;
                    Browser.mainLoop.currentlyRunningMainloop++;
                },
                resume: function () {
                    Browser.mainLoop.currentlyRunningMainloop++;
                    var timingMode = Browser.mainLoop.timingMode;
                    var timingValue = Browser.mainLoop.timingValue;
                    var func = Browser.mainLoop.func;
                    Browser.mainLoop.func = null;
                    setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
                    _emscripten_set_main_loop_timing(timingMode, timingValue);
                    Browser.mainLoop.scheduler();
                },
                updateStatus: function () {
                    if (Module["setStatus"]) {
                        var message =
                            Module["statusMessage"] || "Please wait...";
                        var remaining = Browser.mainLoop.remainingBlockers;
                        var expected = Browser.mainLoop.expectedBlockers;
                        if (remaining) {
                            if (remaining < expected) {
                                Module["setStatus"](
                                    message +
                                        " (" +
                                        (expected - remaining) +
                                        "/" +
                                        expected +
                                        ")",
                                );
                            } else {
                                Module["setStatus"](message);
                            }
                        } else {
                            Module["setStatus"]("");
                        }
                    }
                },
                runIter: function (func) {
                    if (ABORT) return;
                    if (Module["preMainLoop"]) {
                        var preRet = Module["preMainLoop"]();
                        if (preRet === false) {
                            return;
                        }
                    }
                    callUserCallback(func);
                    if (Module["postMainLoop"]) Module["postMainLoop"]();
                },
            },
            isFullscreen: false,
            pointerLock: false,
            moduleContextCreatedCallbacks: [],
            workers: [],
            init: function () {
                if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
                if (Browser.initted) return;
                Browser.initted = true;
                try {
                    new Blob();
                    Browser.hasBlobConstructor = true;
                } catch (e) {
                    Browser.hasBlobConstructor = false;
                    out(
                        "warning: no blob constructor, cannot create blobs with mimetypes",
                    );
                }
                Browser.BlobBuilder =
                    typeof MozBlobBuilder != "undefined"
                        ? MozBlobBuilder
                        : typeof WebKitBlobBuilder != "undefined"
                          ? WebKitBlobBuilder
                          : !Browser.hasBlobConstructor
                            ? out("warning: no BlobBuilder")
                            : null;
                Browser.URLObject =
                    typeof window != "undefined"
                        ? window.URL
                            ? window.URL
                            : window.webkitURL
                        : undefined;
                if (
                    !Module.noImageDecoding &&
                    typeof Browser.URLObject == "undefined"
                ) {
                    out(
                        "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.",
                    );
                    Module.noImageDecoding = true;
                }
                var imagePlugin = {};
                imagePlugin["canHandle"] = function imagePlugin_canHandle(
                    name,
                ) {
                    return (
                        !Module.noImageDecoding &&
                        /\.(jpg|jpeg|png|bmp)$/i.test(name)
                    );
                };
                imagePlugin["handle"] = function imagePlugin_handle(
                    byteArray,
                    name,
                    onload,
                    onerror,
                ) {
                    var b = null;
                    if (Browser.hasBlobConstructor) {
                        try {
                            b = new Blob([byteArray], {
                                type: Browser.getMimetype(name),
                            });
                            if (b.size !== byteArray.length) {
                                b = new Blob(
                                    [new Uint8Array(byteArray).buffer],
                                    { type: Browser.getMimetype(name) },
                                );
                            }
                        } catch (e) {
                            warnOnce(
                                "Blob constructor present but fails: " +
                                    e +
                                    "; falling back to blob builder",
                            );
                        }
                    }
                    if (!b) {
                        var bb = new Browser.BlobBuilder();
                        bb.append(new Uint8Array(byteArray).buffer);
                        b = bb.getBlob();
                    }
                    var url = Browser.URLObject.createObjectURL(b);
                    assert(
                        typeof url == "string",
                        "createObjectURL must return a url as a string",
                    );
                    var img = new Image();
                    img.onload = () => {
                        assert(
                            img.complete,
                            "Image " + name + " could not be decoded",
                        );
                        var canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        Module["preloadedImages"][name] = canvas;
                        Browser.URLObject.revokeObjectURL(url);
                        if (onload) onload(byteArray);
                    };
                    img.onerror = (event) => {
                        out("Image " + url + " could not be decoded");
                        if (onerror) onerror();
                    };
                    img.src = url;
                };
                Module["preloadPlugins"].push(imagePlugin);
                var audioPlugin = {};
                audioPlugin["canHandle"] = function audioPlugin_canHandle(
                    name,
                ) {
                    return (
                        !Module.noAudioDecoding &&
                        name.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
                    );
                };
                audioPlugin["handle"] = function audioPlugin_handle(
                    byteArray,
                    name,
                    onload,
                    onerror,
                ) {
                    var done = false;
                    function finish(audio) {
                        if (done) return;
                        done = true;
                        Module["preloadedAudios"][name] = audio;
                        if (onload) onload(byteArray);
                    }
                    function fail() {
                        if (done) return;
                        done = true;
                        Module["preloadedAudios"][name] = new Audio();
                        if (onerror) onerror();
                    }
                    if (Browser.hasBlobConstructor) {
                        try {
                            var b = new Blob([byteArray], {
                                type: Browser.getMimetype(name),
                            });
                        } catch (e) {
                            return fail();
                        }
                        var url = Browser.URLObject.createObjectURL(b);
                        assert(
                            typeof url == "string",
                            "createObjectURL must return a url as a string",
                        );
                        var audio = new Audio();
                        audio.addEventListener(
                            "canplaythrough",
                            function () {
                                finish(audio);
                            },
                            false,
                        );
                        audio.onerror = function audio_onerror(event) {
                            if (done) return;
                            out(
                                "warning: browser could not fully decode audio " +
                                    name +
                                    ", trying slower base64 approach",
                            );
                            function encode64(data) {
                                var BASE =
                                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                                var PAD = "=";
                                var ret = "";
                                var leftchar = 0;
                                var leftbits = 0;
                                for (var i = 0; i < data.length; i++) {
                                    leftchar = (leftchar << 8) | data[i];
                                    leftbits += 8;
                                    while (leftbits >= 6) {
                                        var curr =
                                            (leftchar >> (leftbits - 6)) & 63;
                                        leftbits -= 6;
                                        ret += BASE[curr];
                                    }
                                }
                                if (leftbits == 2) {
                                    ret += BASE[(leftchar & 3) << 4];
                                    ret += PAD + PAD;
                                } else if (leftbits == 4) {
                                    ret += BASE[(leftchar & 15) << 2];
                                    ret += PAD;
                                }
                                return ret;
                            }
                            audio.src =
                                "data:audio/x-" +
                                name.substr(-3) +
                                ";base64," +
                                encode64(byteArray);
                            finish(audio);
                        };
                        audio.src = url;
                        safeSetTimeout(function () {
                            finish(audio);
                        }, 1e4);
                    } else {
                        return fail();
                    }
                };
                Module["preloadPlugins"].push(audioPlugin);
                function pointerLockChange() {
                    Browser.pointerLock =
                        document["pointerLockElement"] === Module["canvas"] ||
                        document["mozPointerLockElement"] ===
                            Module["canvas"] ||
                        document["webkitPointerLockElement"] ===
                            Module["canvas"] ||
                        document["msPointerLockElement"] === Module["canvas"];
                }
                var canvas = Module["canvas"];
                if (canvas) {
                    canvas.requestPointerLock =
                        canvas["requestPointerLock"] ||
                        canvas["mozRequestPointerLock"] ||
                        canvas["webkitRequestPointerLock"] ||
                        canvas["msRequestPointerLock"] ||
                        function () {};
                    canvas.exitPointerLock =
                        document["exitPointerLock"] ||
                        document["mozExitPointerLock"] ||
                        document["webkitExitPointerLock"] ||
                        document["msExitPointerLock"] ||
                        function () {};
                    canvas.exitPointerLock =
                        canvas.exitPointerLock.bind(document);
                    document.addEventListener(
                        "pointerlockchange",
                        pointerLockChange,
                        false,
                    );
                    document.addEventListener(
                        "mozpointerlockchange",
                        pointerLockChange,
                        false,
                    );
                    document.addEventListener(
                        "webkitpointerlockchange",
                        pointerLockChange,
                        false,
                    );
                    document.addEventListener(
                        "mspointerlockchange",
                        pointerLockChange,
                        false,
                    );
                    if (Module["elementPointerLock"]) {
                        canvas.addEventListener(
                            "click",
                            function (ev) {
                                if (
                                    !Browser.pointerLock &&
                                    Module["canvas"].requestPointerLock
                                ) {
                                    Module["canvas"].requestPointerLock();
                                    ev.preventDefault();
                                }
                            },
                            false,
                        );
                    }
                }
            },
            handledByPreloadPlugin: function (
                byteArray,
                fullname,
                finish,
                onerror,
            ) {
                Browser.init();
                var handled = false;
                Module["preloadPlugins"].forEach(function (plugin) {
                    if (handled) return;
                    if (plugin["canHandle"](fullname)) {
                        plugin["handle"](byteArray, fullname, finish, onerror);
                        handled = true;
                    }
                });
                return handled;
            },
            createContext: function (
                canvas,
                useWebGL,
                setInModule,
                webGLContextAttributes,
            ) {
                if (useWebGL && Module.ctx && canvas == Module.canvas)
                    return Module.ctx;
                var ctx;
                var contextHandle;
                if (useWebGL) {
                    var contextAttributes = {
                        antialias: false,
                        alpha: false,
                        majorVersion: 1,
                    };
                    if (webGLContextAttributes) {
                        for (var attribute in webGLContextAttributes) {
                            contextAttributes[attribute] =
                                webGLContextAttributes[attribute];
                        }
                    }
                    if (typeof GL != "undefined") {
                        contextHandle = GL.createContext(
                            canvas,
                            contextAttributes,
                        );
                        if (contextHandle) {
                            ctx = GL.getContext(contextHandle).GLctx;
                        }
                    }
                } else {
                    ctx = canvas.getContext("2d");
                }
                if (!ctx) return null;
                if (setInModule) {
                    if (!useWebGL)
                        assert(
                            typeof GLctx == "undefined",
                            "cannot set in module if GLctx is used, but we are a non-GL context that would replace it",
                        );
                    Module.ctx = ctx;
                    if (useWebGL) GL.makeContextCurrent(contextHandle);
                    Module.useWebGL = useWebGL;
                    Browser.moduleContextCreatedCallbacks.forEach(
                        function (callback) {
                            callback();
                        },
                    );
                    Browser.init();
                }
                return ctx;
            },
            destroyContext: function (canvas, useWebGL, setInModule) {},
            fullscreenHandlersInstalled: false,
            lockPointer: undefined,
            resizeCanvas: undefined,
            requestFullscreen: function (lockPointer, resizeCanvas) {
                Browser.lockPointer = lockPointer;
                Browser.resizeCanvas = resizeCanvas;
                if (typeof Browser.lockPointer == "undefined")
                    Browser.lockPointer = true;
                if (typeof Browser.resizeCanvas == "undefined")
                    Browser.resizeCanvas = false;
                var canvas = Module["canvas"];
                function fullscreenChange() {
                    Browser.isFullscreen = false;
                    var canvasContainer = canvas.parentNode;
                    if (
                        (document["fullscreenElement"] ||
                            document["mozFullScreenElement"] ||
                            document["msFullscreenElement"] ||
                            document["webkitFullscreenElement"] ||
                            document["webkitCurrentFullScreenElement"]) ===
                        canvasContainer
                    ) {
                        canvas.exitFullscreen = Browser.exitFullscreen;
                        if (Browser.lockPointer) canvas.requestPointerLock();
                        Browser.isFullscreen = true;
                        if (Browser.resizeCanvas) {
                            Browser.setFullscreenCanvasSize();
                        } else {
                            Browser.updateCanvasDimensions(canvas);
                        }
                    } else {
                        canvasContainer.parentNode.insertBefore(
                            canvas,
                            canvasContainer,
                        );
                        canvasContainer.parentNode.removeChild(canvasContainer);
                        if (Browser.resizeCanvas) {
                            Browser.setWindowedCanvasSize();
                        } else {
                            Browser.updateCanvasDimensions(canvas);
                        }
                    }
                    if (Module["onFullScreen"])
                        Module["onFullScreen"](Browser.isFullscreen);
                    if (Module["onFullscreen"])
                        Module["onFullscreen"](Browser.isFullscreen);
                }
                if (!Browser.fullscreenHandlersInstalled) {
                    Browser.fullscreenHandlersInstalled = true;
                    document.addEventListener(
                        "fullscreenchange",
                        fullscreenChange,
                        false,
                    );
                    document.addEventListener(
                        "mozfullscreenchange",
                        fullscreenChange,
                        false,
                    );
                    document.addEventListener(
                        "webkitfullscreenchange",
                        fullscreenChange,
                        false,
                    );
                    document.addEventListener(
                        "MSFullscreenChange",
                        fullscreenChange,
                        false,
                    );
                }
                var canvasContainer = document.createElement("div");
                canvas.parentNode.insertBefore(canvasContainer, canvas);
                canvasContainer.appendChild(canvas);
                canvasContainer.requestFullscreen =
                    canvasContainer["requestFullscreen"] ||
                    canvasContainer["mozRequestFullScreen"] ||
                    canvasContainer["msRequestFullscreen"] ||
                    (canvasContainer["webkitRequestFullscreen"]
                        ? function () {
                              canvasContainer["webkitRequestFullscreen"](
                                  Element["ALLOW_KEYBOARD_INPUT"],
                              );
                          }
                        : null) ||
                    (canvasContainer["webkitRequestFullScreen"]
                        ? function () {
                              canvasContainer["webkitRequestFullScreen"](
                                  Element["ALLOW_KEYBOARD_INPUT"],
                              );
                          }
                        : null);
                canvasContainer.requestFullscreen();
            },
            requestFullScreen: function () {
                abort(
                    "Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)",
                );
            },
            exitFullscreen: function () {
                if (!Browser.isFullscreen) {
                    return false;
                }
                var CFS =
                    document["exitFullscreen"] ||
                    document["cancelFullScreen"] ||
                    document["mozCancelFullScreen"] ||
                    document["msExitFullscreen"] ||
                    document["webkitCancelFullScreen"] ||
                    function () {};
                CFS.apply(document, []);
                return true;
            },
            nextRAF: 0,
            fakeRequestAnimationFrame: function (func) {
                var now = Date.now();
                if (Browser.nextRAF === 0) {
                    Browser.nextRAF = now + 1e3 / 60;
                } else {
                    while (now + 2 >= Browser.nextRAF) {
                        Browser.nextRAF += 1e3 / 60;
                    }
                }
                var delay = Math.max(Browser.nextRAF - now, 0);
                setTimeout(func, delay);
            },
            requestAnimationFrame: function (func) {
                if (typeof requestAnimationFrame == "function") {
                    requestAnimationFrame(func);
                    return;
                }
                var RAF = Browser.fakeRequestAnimationFrame;
                RAF(func);
            },
            safeSetTimeout: function (func) {
                return safeSetTimeout(func);
            },
            safeRequestAnimationFrame: function (func) {
                runtimeKeepalivePush();
                return Browser.requestAnimationFrame(function () {
                    runtimeKeepalivePop();
                    callUserCallback(func);
                });
            },
            getMimetype: function (name) {
                return {
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    png: "image/png",
                    bmp: "image/bmp",
                    ogg: "audio/ogg",
                    wav: "audio/wav",
                    mp3: "audio/mpeg",
                }[name.substr(name.lastIndexOf(".") + 1)];
            },
            getUserMedia: function (func) {
                if (!window.getUserMedia) {
                    window.getUserMedia =
                        navigator["getUserMedia"] ||
                        navigator["mozGetUserMedia"];
                }
                window.getUserMedia(func);
            },
            getMovementX: function (event) {
                return (
                    event["movementX"] ||
                    event["mozMovementX"] ||
                    event["webkitMovementX"] ||
                    0
                );
            },
            getMovementY: function (event) {
                return (
                    event["movementY"] ||
                    event["mozMovementY"] ||
                    event["webkitMovementY"] ||
                    0
                );
            },
            getMouseWheelDelta: function (event) {
                var delta = 0;
                switch (event.type) {
                    case "DOMMouseScroll":
                        delta = event.detail / 3;
                        break;
                    case "mousewheel":
                        delta = event.wheelDelta / 120;
                        break;
                    case "wheel":
                        delta = event.deltaY;
                        switch (event.deltaMode) {
                            case 0:
                                delta /= 100;
                                break;
                            case 1:
                                delta /= 3;
                                break;
                            case 2:
                                delta *= 80;
                                break;
                            default:
                                throw (
                                    "unrecognized mouse wheel delta mode: " +
                                    event.deltaMode
                                );
                        }
                        break;
                    default:
                        throw "unrecognized mouse wheel event: " + event.type;
                }
                return delta;
            },
            mouseX: 0,
            mouseY: 0,
            mouseMovementX: 0,
            mouseMovementY: 0,
            touches: {},
            lastTouches: {},
            calculateMouseEvent: function (event) {
                if (Browser.pointerLock) {
                    if (event.type != "mousemove" && "mozMovementX" in event) {
                        Browser.mouseMovementX = Browser.mouseMovementY = 0;
                    } else {
                        Browser.mouseMovementX = Browser.getMovementX(event);
                        Browser.mouseMovementY = Browser.getMovementY(event);
                    }
                    if (typeof SDL != "undefined") {
                        Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
                        Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
                    } else {
                        Browser.mouseX += Browser.mouseMovementX;
                        Browser.mouseY += Browser.mouseMovementY;
                    }
                } else {
                    var rect = Module["canvas"].getBoundingClientRect();
                    var cw = Module["canvas"].width;
                    var ch = Module["canvas"].height;
                    var scrollX =
                        typeof window.scrollX != "undefined"
                            ? window.scrollX
                            : window.pageXOffset;
                    var scrollY =
                        typeof window.scrollY != "undefined"
                            ? window.scrollY
                            : window.pageYOffset;
                    assert(
                        typeof scrollX != "undefined" &&
                            typeof scrollY != "undefined",
                        "Unable to retrieve scroll position, mouse positions likely broken.",
                    );
                    if (
                        event.type === "touchstart" ||
                        event.type === "touchend" ||
                        event.type === "touchmove"
                    ) {
                        var touch = event.touch;
                        if (touch === undefined) {
                            return;
                        }
                        var adjustedX = touch.pageX - (scrollX + rect.left);
                        var adjustedY = touch.pageY - (scrollY + rect.top);
                        adjustedX = adjustedX * (cw / rect.width);
                        adjustedY = adjustedY * (ch / rect.height);
                        var coords = { x: adjustedX, y: adjustedY };
                        if (event.type === "touchstart") {
                            Browser.lastTouches[touch.identifier] = coords;
                            Browser.touches[touch.identifier] = coords;
                        } else if (
                            event.type === "touchend" ||
                            event.type === "touchmove"
                        ) {
                            var last = Browser.touches[touch.identifier];
                            if (!last) last = coords;
                            Browser.lastTouches[touch.identifier] = last;
                            Browser.touches[touch.identifier] = coords;
                        }
                        return;
                    }
                    var x = event.pageX - (scrollX + rect.left);
                    var y = event.pageY - (scrollY + rect.top);
                    x = x * (cw / rect.width);
                    y = y * (ch / rect.height);
                    Browser.mouseMovementX = x - Browser.mouseX;
                    Browser.mouseMovementY = y - Browser.mouseY;
                    Browser.mouseX = x;
                    Browser.mouseY = y;
                }
            },
            resizeListeners: [],
            updateResizeListeners: function () {
                var canvas = Module["canvas"];
                Browser.resizeListeners.forEach(function (listener) {
                    listener(canvas.width, canvas.height);
                });
            },
            setCanvasSize: function (width, height, noUpdates) {
                var canvas = Module["canvas"];
                Browser.updateCanvasDimensions(canvas, width, height);
                if (!noUpdates) Browser.updateResizeListeners();
            },
            windowedWidth: 0,
            windowedHeight: 0,
            setFullscreenCanvasSize: function () {
                if (typeof SDL != "undefined") {
                    var flags = GROWABLE_HEAP_U32()[SDL.screen >> 2];
                    flags = flags | 8388608;
                    GROWABLE_HEAP_I32()[SDL.screen >> 2] = flags;
                }
                Browser.updateCanvasDimensions(Module["canvas"]);
                Browser.updateResizeListeners();
            },
            setWindowedCanvasSize: function () {
                if (typeof SDL != "undefined") {
                    var flags = GROWABLE_HEAP_U32()[SDL.screen >> 2];
                    flags = flags & ~8388608;
                    GROWABLE_HEAP_I32()[SDL.screen >> 2] = flags;
                }
                Browser.updateCanvasDimensions(Module["canvas"]);
                Browser.updateResizeListeners();
            },
            updateCanvasDimensions: function (canvas, wNative, hNative) {
                if (wNative && hNative) {
                    canvas.widthNative = wNative;
                    canvas.heightNative = hNative;
                } else {
                    wNative = canvas.widthNative;
                    hNative = canvas.heightNative;
                }
                var w = wNative;
                var h = hNative;
                if (
                    Module["forcedAspectRatio"] &&
                    Module["forcedAspectRatio"] > 0
                ) {
                    if (w / h < Module["forcedAspectRatio"]) {
                        w = Math.round(h * Module["forcedAspectRatio"]);
                    } else {
                        h = Math.round(w / Module["forcedAspectRatio"]);
                    }
                }
                if (
                    (document["fullscreenElement"] ||
                        document["mozFullScreenElement"] ||
                        document["msFullscreenElement"] ||
                        document["webkitFullscreenElement"] ||
                        document["webkitCurrentFullScreenElement"]) ===
                        canvas.parentNode &&
                    typeof screen != "undefined"
                ) {
                    var factor = Math.min(screen.width / w, screen.height / h);
                    w = Math.round(w * factor);
                    h = Math.round(h * factor);
                }
                if (Browser.resizeCanvas) {
                    if (canvas.width != w) canvas.width = w;
                    if (canvas.height != h) canvas.height = h;
                    if (typeof canvas.style != "undefined") {
                        canvas.style.removeProperty("width");
                        canvas.style.removeProperty("height");
                    }
                } else {
                    if (canvas.width != wNative) canvas.width = wNative;
                    if (canvas.height != hNative) canvas.height = hNative;
                    if (typeof canvas.style != "undefined") {
                        if (w != wNative || h != hNative) {
                            canvas.style.setProperty(
                                "width",
                                w + "px",
                                "important",
                            );
                            canvas.style.setProperty(
                                "height",
                                h + "px",
                                "important",
                            );
                        } else {
                            canvas.style.removeProperty("width");
                            canvas.style.removeProperty("height");
                        }
                    }
                }
            },
        };
        function _emscripten_cancel_main_loop() {
            Browser.mainLoop.pause();
            Browser.mainLoop.func = null;
        }
        function _emscripten_check_blocking_allowed() {
            if (ENVIRONMENT_IS_WORKER) return;
            warnOnce(
                "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread",
            );
        }
        function _emscripten_get_heap_max() {
            return 2147483648;
        }
        function _emscripten_memcpy_big(dest, src, num) {
            GROWABLE_HEAP_U8().copyWithin(dest, src, src + num);
        }
        function _emscripten_num_logical_cores() {
            return navigator["hardwareConcurrency"];
        }
        function _emscripten_proxy_to_main_thread_js(index, sync) {
            var numCallArgs = arguments.length - 2;
            var outerArgs = arguments;
            if (numCallArgs > 20 - 1)
                throw (
                    "emscripten_proxy_to_main_thread_js: Too many arguments " +
                    numCallArgs +
                    " to proxied function idx=" +
                    index +
                    ", maximum supported is " +
                    (20 - 1) +
                    "!"
                );
            return withStackSave(function () {
                var serializedNumCallArgs = numCallArgs;
                var args = stackAlloc(serializedNumCallArgs * 8);
                var b = args >> 3;
                for (var i = 0; i < numCallArgs; i++) {
                    var arg = outerArgs[2 + i];
                    GROWABLE_HEAP_F64()[b + i] = arg;
                }
                return _emscripten_run_in_main_runtime_thread_js(
                    index,
                    serializedNumCallArgs,
                    args,
                    sync,
                );
            });
        }
        var _emscripten_receive_on_main_thread_js_callArgs = [];
        function _emscripten_receive_on_main_thread_js(
            index,
            numCallArgs,
            args,
        ) {
            _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs;
            var b = args >> 3;
            for (var i = 0; i < numCallArgs; i++) {
                _emscripten_receive_on_main_thread_js_callArgs[i] =
                    GROWABLE_HEAP_F64()[b + i];
            }
            var isEmAsmConst = index < 0;
            var func = !isEmAsmConst
                ? proxiedFunctionTable[index]
                : ASM_CONSTS[-index - 1];
            assert(
                func.length == numCallArgs,
                "Call args mismatch in emscripten_receive_on_main_thread_js",
            );
            return func.apply(
                null,
                _emscripten_receive_on_main_thread_js_callArgs,
            );
        }
        function emscripten_realloc_buffer(size) {
            try {
                wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16);
                updateGlobalBufferAndViews(wasmMemory.buffer);
                return 1;
            } catch (e) {
                err(
                    "emscripten_realloc_buffer: Attempted to grow heap from " +
                        buffer.byteLength +
                        " bytes to " +
                        size +
                        " bytes, but got error: " +
                        e,
                );
            }
        }
        function _emscripten_resize_heap(requestedSize) {
            var oldSize = GROWABLE_HEAP_U8().length;
            requestedSize = requestedSize >>> 0;
            if (requestedSize <= oldSize) {
                return false;
            }
            var maxHeapSize = _emscripten_get_heap_max();
            if (requestedSize > maxHeapSize) {
                err(
                    "Cannot enlarge memory, asked to go up to " +
                        requestedSize +
                        " bytes, but the limit is " +
                        maxHeapSize +
                        " bytes!",
                );
                return false;
            }
            let alignUp = (x, multiple) =>
                x + ((multiple - (x % multiple)) % multiple);
            for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
                var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
                overGrownHeapSize = Math.min(
                    overGrownHeapSize,
                    requestedSize + 100663296,
                );
                var newSize = Math.min(
                    maxHeapSize,
                    alignUp(Math.max(requestedSize, overGrownHeapSize), 65536),
                );
                var replacement = emscripten_realloc_buffer(newSize);
                if (replacement) {
                    return true;
                }
            }
            err(
                "Failed to grow the heap from " +
                    oldSize +
                    " bytes to " +
                    newSize +
                    " bytes, not enough memory!",
            );
            return false;
        }
        function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
            var browserIterationFunc = getWasmTableEntry(func);
            setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop);
        }
        var Fetch = {
            xhrs: [],
            setu64: function (addr, val) {
                GROWABLE_HEAP_U32()[addr >> 2] = val;
                GROWABLE_HEAP_U32()[(addr + 4) >> 2] = (val / 4294967296) | 0;
            },
            openDatabase: function (dbname, dbversion, onsuccess, onerror) {
                try {
                    var openRequest = indexedDB.open(dbname, dbversion);
                } catch (e) {
                    return onerror(e);
                }
                openRequest.onupgradeneeded = (event) => {
                    var db = event.target.result;
                    if (db.objectStoreNames.contains("FILES")) {
                        db.deleteObjectStore("FILES");
                    }
                    db.createObjectStore("FILES");
                };
                openRequest.onsuccess = (event) =>
                    onsuccess(event.target.result);
                openRequest.onerror = (error) => onerror(error);
            },
            staticInit: function () {
                var isMainThread = true;
                var onsuccess = (db) => {
                    Fetch.dbInstance = db;
                    if (isMainThread) {
                        removeRunDependency("library_fetch_init");
                    }
                };
                var onerror = () => {
                    Fetch.dbInstance = false;
                    if (isMainThread) {
                        removeRunDependency("library_fetch_init");
                    }
                };
                Fetch.openDatabase(
                    "emscripten_filesystem",
                    1,
                    onsuccess,
                    onerror,
                );
                if (
                    typeof ENVIRONMENT_IS_FETCH_WORKER == "undefined" ||
                    !ENVIRONMENT_IS_FETCH_WORKER
                )
                    addRunDependency("library_fetch_init");
            },
        };
        function fetchXHR(
            fetch,
            onsuccess,
            onerror,
            onprogress,
            onreadystatechange,
        ) {
            var url = GROWABLE_HEAP_U32()[(fetch + 8) >> 2];
            if (!url) {
                onerror(fetch, 0, "no url specified!");
                return;
            }
            var url_ = UTF8ToString(url);
            var fetch_attr = fetch + 112;
            var requestMethod = UTF8ToString(fetch_attr);
            if (!requestMethod) requestMethod = "GET";
            var userData = GROWABLE_HEAP_U32()[(fetch + 4) >> 2];
            var fetchAttributes = GROWABLE_HEAP_U32()[(fetch_attr + 52) >> 2];
            var timeoutMsecs = GROWABLE_HEAP_U32()[(fetch_attr + 56) >> 2];
            var withCredentials = !!GROWABLE_HEAP_U32()[(fetch_attr + 60) >> 2];
            var destinationPath = GROWABLE_HEAP_U32()[(fetch_attr + 64) >> 2];
            var userName = GROWABLE_HEAP_U32()[(fetch_attr + 68) >> 2];
            var password = GROWABLE_HEAP_U32()[(fetch_attr + 72) >> 2];
            var requestHeaders = GROWABLE_HEAP_U32()[(fetch_attr + 76) >> 2];
            var overriddenMimeType =
                GROWABLE_HEAP_U32()[(fetch_attr + 80) >> 2];
            var dataPtr = GROWABLE_HEAP_U32()[(fetch_attr + 84) >> 2];
            var dataLength = GROWABLE_HEAP_U32()[(fetch_attr + 88) >> 2];
            var fetchAttrLoadToMemory = !!(fetchAttributes & 1);
            var fetchAttrStreamData = !!(fetchAttributes & 2);
            var fetchAttrSynchronous = !!(fetchAttributes & 64);
            var userNameStr = userName ? UTF8ToString(userName) : undefined;
            var passwordStr = password ? UTF8ToString(password) : undefined;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = withCredentials;
            xhr.open(
                requestMethod,
                url_,
                !fetchAttrSynchronous,
                userNameStr,
                passwordStr,
            );
            if (!fetchAttrSynchronous) xhr.timeout = timeoutMsecs;
            xhr.url_ = url_;
            assert(
                !fetchAttrStreamData,
                "streaming uses moz-chunked-arraybuffer which is no longer supported; TODO: rewrite using fetch()",
            );
            xhr.responseType = "arraybuffer";
            if (overriddenMimeType) {
                var overriddenMimeTypeStr = UTF8ToString(overriddenMimeType);
                xhr.overrideMimeType(overriddenMimeTypeStr);
            }
            if (requestHeaders) {
                for (;;) {
                    var key = GROWABLE_HEAP_U32()[requestHeaders >> 2];
                    if (!key) break;
                    var value = GROWABLE_HEAP_U32()[(requestHeaders + 4) >> 2];
                    if (!value) break;
                    requestHeaders += 8;
                    var keyStr = UTF8ToString(key);
                    var valueStr = UTF8ToString(value);
                    xhr.setRequestHeader(keyStr, valueStr);
                }
            }
            Fetch.xhrs.push(xhr);
            var id = Fetch.xhrs.length;
            GROWABLE_HEAP_U32()[(fetch + 0) >> 2] = id;
            var data =
                dataPtr && dataLength
                    ? GROWABLE_HEAP_U8().slice(dataPtr, dataPtr + dataLength)
                    : null;
            function saveResponse(condition) {
                var ptr = 0;
                var ptrLen = 0;
                if (condition) {
                    ptrLen = xhr.response ? xhr.response.byteLength : 0;
                    ptr = _malloc(ptrLen);
                    GROWABLE_HEAP_U8().set(new Uint8Array(xhr.response), ptr);
                }
                GROWABLE_HEAP_U32()[(fetch + 12) >> 2] = ptr;
                Fetch.setu64(fetch + 16, ptrLen);
            }
            xhr.onload = (e) => {
                saveResponse(fetchAttrLoadToMemory && !fetchAttrStreamData);
                var len = xhr.response ? xhr.response.byteLength : 0;
                Fetch.setu64(fetch + 24, 0);
                if (len) {
                    Fetch.setu64(fetch + 32, len);
                }
                GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = xhr.readyState;
                GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = xhr.status;
                if (xhr.statusText)
                    stringToUTF8(xhr.statusText, fetch + 44, 64);
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (onsuccess) onsuccess(fetch, xhr, e);
                } else {
                    if (onerror) onerror(fetch, xhr, e);
                }
            };
            xhr.onerror = (e) => {
                saveResponse(fetchAttrLoadToMemory);
                var status = xhr.status;
                Fetch.setu64(fetch + 24, 0);
                Fetch.setu64(
                    fetch + 32,
                    xhr.response ? xhr.response.byteLength : 0,
                );
                GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = xhr.readyState;
                GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = status;
                if (onerror) onerror(fetch, xhr, e);
            };
            xhr.ontimeout = (e) => {
                if (onerror) onerror(fetch, xhr, e);
            };
            xhr.onprogress = (e) => {
                var ptrLen =
                    fetchAttrLoadToMemory && fetchAttrStreamData && xhr.response
                        ? xhr.response.byteLength
                        : 0;
                var ptr = 0;
                if (fetchAttrLoadToMemory && fetchAttrStreamData) {
                    assert(
                        onprogress,
                        "When doing a streaming fetch, you should have an onprogress handler registered to receive the chunks!",
                    );
                    ptr = _malloc(ptrLen);
                    GROWABLE_HEAP_U8().set(new Uint8Array(xhr.response), ptr);
                }
                GROWABLE_HEAP_U32()[(fetch + 12) >> 2] = ptr;
                Fetch.setu64(fetch + 16, ptrLen);
                Fetch.setu64(fetch + 24, e.loaded - ptrLen);
                Fetch.setu64(fetch + 32, e.total);
                GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = xhr.readyState;
                if (xhr.readyState >= 3 && xhr.status === 0 && e.loaded > 0)
                    xhr.status = 200;
                GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = xhr.status;
                if (xhr.statusText)
                    stringToUTF8(xhr.statusText, fetch + 44, 64);
                if (onprogress) onprogress(fetch, xhr, e);
                if (ptr) {
                    _free(ptr);
                }
            };
            xhr.onreadystatechange = (e) => {
                GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = xhr.readyState;
                if (xhr.readyState >= 2) {
                    GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = xhr.status;
                }
                if (onreadystatechange) onreadystatechange(fetch, xhr, e);
            };
            try {
                xhr.send(data);
            } catch (e) {
                if (onerror) onerror(fetch, xhr, e);
            }
        }
        function fetchCacheData(db, fetch, data, onsuccess, onerror) {
            if (!db) {
                onerror(fetch, 0, "IndexedDB not available!");
                return;
            }
            var fetch_attr = fetch + 112;
            var destinationPath = GROWABLE_HEAP_U32()[(fetch_attr + 64) >> 2];
            if (!destinationPath)
                destinationPath = GROWABLE_HEAP_U32()[(fetch + 8) >> 2];
            var destinationPathStr = UTF8ToString(destinationPath);
            try {
                var transaction = db.transaction(["FILES"], "readwrite");
                var packages = transaction.objectStore("FILES");
                var putRequest = packages.put(data, destinationPathStr);
                putRequest.onsuccess = (event) => {
                    GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                    GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 200;
                    stringToUTF8("OK", fetch + 44, 64);
                    onsuccess(fetch, 0, destinationPathStr);
                };
                putRequest.onerror = (error) => {
                    GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                    GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 413;
                    stringToUTF8("Payload Too Large", fetch + 44, 64);
                    onerror(fetch, 0, error);
                };
            } catch (e) {
                onerror(fetch, 0, e);
            }
        }
        function fetchLoadCachedData(db, fetch, onsuccess, onerror) {
            if (!db) {
                onerror(fetch, 0, "IndexedDB not available!");
                return;
            }
            var fetch_attr = fetch + 112;
            var path = GROWABLE_HEAP_U32()[(fetch_attr + 64) >> 2];
            if (!path) path = GROWABLE_HEAP_U32()[(fetch + 8) >> 2];
            var pathStr = UTF8ToString(path);
            try {
                var transaction = db.transaction(["FILES"], "readonly");
                var packages = transaction.objectStore("FILES");
                var getRequest = packages.get(pathStr);
                getRequest.onsuccess = (event) => {
                    if (event.target.result) {
                        var value = event.target.result;
                        var len = value.byteLength || value.length;
                        var ptr = _malloc(len);
                        GROWABLE_HEAP_U8().set(new Uint8Array(value), ptr);
                        GROWABLE_HEAP_U32()[(fetch + 12) >> 2] = ptr;
                        Fetch.setu64(fetch + 16, len);
                        Fetch.setu64(fetch + 24, 0);
                        Fetch.setu64(fetch + 32, len);
                        GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                        GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 200;
                        stringToUTF8("OK", fetch + 44, 64);
                        onsuccess(fetch, 0, value);
                    } else {
                        GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                        GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 404;
                        stringToUTF8("Not Found", fetch + 44, 64);
                        onerror(fetch, 0, "no data");
                    }
                };
                getRequest.onerror = (error) => {
                    GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                    GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 404;
                    stringToUTF8("Not Found", fetch + 44, 64);
                    onerror(fetch, 0, error);
                };
            } catch (e) {
                onerror(fetch, 0, e);
            }
        }
        function fetchDeleteCachedData(db, fetch, onsuccess, onerror) {
            if (!db) {
                onerror(fetch, 0, "IndexedDB not available!");
                return;
            }
            var fetch_attr = fetch + 112;
            var path = GROWABLE_HEAP_U32()[(fetch_attr + 64) >> 2];
            if (!path) path = GROWABLE_HEAP_U32()[(fetch + 8) >> 2];
            var pathStr = UTF8ToString(path);
            try {
                var transaction = db.transaction(["FILES"], "readwrite");
                var packages = transaction.objectStore("FILES");
                var request = packages.delete(pathStr);
                request.onsuccess = (event) => {
                    var value = event.target.result;
                    GROWABLE_HEAP_U32()[(fetch + 12) >> 2] = 0;
                    Fetch.setu64(fetch + 16, 0);
                    Fetch.setu64(fetch + 24, 0);
                    Fetch.setu64(fetch + 32, 0);
                    GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                    GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 200;
                    stringToUTF8("OK", fetch + 44, 64);
                    onsuccess(fetch, 0, value);
                };
                request.onerror = (error) => {
                    GROWABLE_HEAP_U16()[(fetch + 40) >> 1] = 4;
                    GROWABLE_HEAP_U16()[(fetch + 42) >> 1] = 404;
                    stringToUTF8("Not Found", fetch + 44, 64);
                    onerror(fetch, 0, error);
                };
            } catch (e) {
                onerror(fetch, 0, e);
            }
        }
        function _emscripten_start_fetch(
            fetch,
            successcb,
            errorcb,
            progresscb,
            readystatechangecb,
        ) {
            runtimeKeepalivePush();
            var fetch_attr = fetch + 112;
            var requestMethod = UTF8ToString(fetch_attr);
            var onsuccess = GROWABLE_HEAP_U32()[(fetch_attr + 36) >> 2];
            var onerror = GROWABLE_HEAP_U32()[(fetch_attr + 40) >> 2];
            var onprogress = GROWABLE_HEAP_U32()[(fetch_attr + 44) >> 2];
            var onreadystatechange =
                GROWABLE_HEAP_U32()[(fetch_attr + 48) >> 2];
            var fetchAttributes = GROWABLE_HEAP_U32()[(fetch_attr + 52) >> 2];
            var fetchAttrPersistFile = !!(fetchAttributes & 4);
            var fetchAttrNoDownload = !!(fetchAttributes & 32);
            var fetchAttrReplace = !!(fetchAttributes & 16);
            var fetchAttrSynchronous = !!(fetchAttributes & 64);
            var reportSuccess = (fetch, xhr, e) => {
                runtimeKeepalivePop();
                callUserCallback(() => {
                    if (onsuccess) getWasmTableEntry(onsuccess)(fetch);
                    else if (successcb) successcb(fetch);
                }, fetchAttrSynchronous);
            };
            var reportProgress = (fetch, xhr, e) => {
                callUserCallback(() => {
                    if (onprogress) getWasmTableEntry(onprogress)(fetch);
                    else if (progresscb) progresscb(fetch);
                }, fetchAttrSynchronous);
            };
            var reportError = (fetch, xhr, e) => {
                runtimeKeepalivePop();
                callUserCallback(() => {
                    if (onerror) getWasmTableEntry(onerror)(fetch);
                    else if (errorcb) errorcb(fetch);
                }, fetchAttrSynchronous);
            };
            var reportReadyStateChange = (fetch, xhr, e) => {
                callUserCallback(() => {
                    if (onreadystatechange)
                        getWasmTableEntry(onreadystatechange)(fetch);
                    else if (readystatechangecb) readystatechangecb(fetch);
                }, fetchAttrSynchronous);
            };
            var performUncachedXhr = (fetch, xhr, e) => {
                fetchXHR(
                    fetch,
                    reportSuccess,
                    reportError,
                    reportProgress,
                    reportReadyStateChange,
                );
            };
            var cacheResultAndReportSuccess = (fetch, xhr, e) => {
                var storeSuccess = (fetch, xhr, e) => {
                    runtimeKeepalivePop();
                    callUserCallback(() => {
                        if (onsuccess) getWasmTableEntry(onsuccess)(fetch);
                        else if (successcb) successcb(fetch);
                    }, fetchAttrSynchronous);
                };
                var storeError = (fetch, xhr, e) => {
                    runtimeKeepalivePop();
                    callUserCallback(() => {
                        if (onsuccess) getWasmTableEntry(onsuccess)(fetch);
                        else if (successcb) successcb(fetch);
                    }, fetchAttrSynchronous);
                };
                fetchCacheData(
                    Fetch.dbInstance,
                    fetch,
                    xhr.response,
                    storeSuccess,
                    storeError,
                );
            };
            var performCachedXhr = (fetch, xhr, e) => {
                fetchXHR(
                    fetch,
                    cacheResultAndReportSuccess,
                    reportError,
                    reportProgress,
                    reportReadyStateChange,
                );
            };
            if (requestMethod === "EM_IDB_STORE") {
                var ptr = GROWABLE_HEAP_U32()[(fetch_attr + 84) >> 2];
                fetchCacheData(
                    Fetch.dbInstance,
                    fetch,
                    GROWABLE_HEAP_U8().slice(
                        ptr,
                        ptr + GROWABLE_HEAP_U32()[(fetch_attr + 88) >> 2],
                    ),
                    reportSuccess,
                    reportError,
                );
            } else if (requestMethod === "EM_IDB_DELETE") {
                fetchDeleteCachedData(
                    Fetch.dbInstance,
                    fetch,
                    reportSuccess,
                    reportError,
                );
            } else if (!fetchAttrReplace) {
                fetchLoadCachedData(
                    Fetch.dbInstance,
                    fetch,
                    reportSuccess,
                    fetchAttrNoDownload
                        ? reportError
                        : fetchAttrPersistFile
                          ? performCachedXhr
                          : performUncachedXhr,
                );
            } else if (!fetchAttrNoDownload) {
                fetchXHR(
                    fetch,
                    fetchAttrPersistFile
                        ? cacheResultAndReportSuccess
                        : reportSuccess,
                    reportError,
                    reportProgress,
                    reportReadyStateChange,
                );
            } else {
                return 0;
            }
            return fetch;
        }
        function _emscripten_unwind_to_js_event_loop() {
            throw "unwind";
        }
        var WS = { sockets: [null], socketEvent: null };
        function _emscripten_websocket_close(socketId, code, reason) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    6,
                    1,
                    socketId,
                    code,
                    reason,
                );
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            var reasonStr = reason ? UTF8ToString(reason) : undefined;
            if (reason) socket.close(code || undefined, UTF8ToString(reason));
            else if (code) socket.close(code);
            else socket.close();
            return 0;
        }
        function _emscripten_websocket_delete(socketId) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(7, 1, socketId);
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            socket.onopen =
                socket.onerror =
                socket.onclose =
                socket.onmessage =
                    null;
            delete WS.sockets[socketId];
            return 0;
        }
        function _emscripten_websocket_is_supported() {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(8, 1);
            return typeof WebSocket != "undefined";
        }
        function _emscripten_websocket_new(createAttributes) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    9,
                    1,
                    createAttributes,
                );
            if (typeof WebSocket == "undefined") {
                return -1;
            }
            if (!createAttributes) {
                return -5;
            }
            var createAttrs = createAttributes >> 2;
            var url = UTF8ToString(GROWABLE_HEAP_I32()[createAttrs]);
            var protocols = GROWABLE_HEAP_I32()[createAttrs + 1];
            var socket = protocols
                ? new WebSocket(url, UTF8ToString(protocols).split(","))
                : new WebSocket(url);
            socket.binaryType = "arraybuffer";
            var socketId = WS.sockets.length;
            WS.sockets[socketId] = socket;
            return socketId;
        }
        function _emscripten_websocket_send_utf8_text(socketId, textData) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    10,
                    1,
                    socketId,
                    textData,
                );
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            var str = UTF8ToString(textData);
            socket.send(str);
            return 0;
        }
        function _emscripten_websocket_set_onclose_callback_on_thread(
            socketId,
            userData,
            callbackFunc,
            thread,
        ) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    11,
                    1,
                    socketId,
                    userData,
                    callbackFunc,
                    thread,
                );
            if (!WS.socketEvent) WS.socketEvent = _malloc(1024);
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            socket.onclose = function (e) {
                GROWABLE_HEAP_U32()[WS.socketEvent >> 2] = socketId;
                GROWABLE_HEAP_U32()[(WS.socketEvent + 4) >> 2] = e.wasClean;
                GROWABLE_HEAP_U32()[(WS.socketEvent + 8) >> 2] = e.code;
                stringToUTF8(e.reason, WS.socketEvent + 10, 512);
                getWasmTableEntry(callbackFunc)(0, WS.socketEvent, userData);
            };
            return 0;
        }
        function _emscripten_websocket_set_onerror_callback_on_thread(
            socketId,
            userData,
            callbackFunc,
            thread,
        ) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    12,
                    1,
                    socketId,
                    userData,
                    callbackFunc,
                    thread,
                );
            if (!WS.socketEvent) WS.socketEvent = _malloc(1024);
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            socket.onerror = function (e) {
                GROWABLE_HEAP_U32()[WS.socketEvent >> 2] = socketId;
                getWasmTableEntry(callbackFunc)(0, WS.socketEvent, userData);
            };
            return 0;
        }
        function _emscripten_websocket_set_onmessage_callback_on_thread(
            socketId,
            userData,
            callbackFunc,
            thread,
        ) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    13,
                    1,
                    socketId,
                    userData,
                    callbackFunc,
                    thread,
                );
            if (!WS.socketEvent) WS.socketEvent = _malloc(1024);
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            socket.onmessage = function (e) {
                GROWABLE_HEAP_U32()[WS.socketEvent >> 2] = socketId;
                if (typeof e.data == "string") {
                    var len = lengthBytesUTF8(e.data) + 1;
                    var buf = _malloc(len);
                    stringToUTF8(e.data, buf, len);
                    GROWABLE_HEAP_U32()[(WS.socketEvent + 12) >> 2] = 1;
                } else {
                    var len = e.data.byteLength;
                    var buf = _malloc(len);
                    GROWABLE_HEAP_I8().set(new Uint8Array(e.data), buf);
                    GROWABLE_HEAP_U32()[(WS.socketEvent + 12) >> 2] = 0;
                }
                GROWABLE_HEAP_U32()[(WS.socketEvent + 4) >> 2] = buf;
                GROWABLE_HEAP_U32()[(WS.socketEvent + 8) >> 2] = len;
                getWasmTableEntry(callbackFunc)(0, WS.socketEvent, userData);
                _free(buf);
            };
            return 0;
        }
        function _emscripten_websocket_set_onopen_callback_on_thread(
            socketId,
            userData,
            callbackFunc,
            thread,
        ) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    14,
                    1,
                    socketId,
                    userData,
                    callbackFunc,
                    thread,
                );
            if (!WS.socketEvent) WS.socketEvent = _malloc(1024);
            var socket = WS.sockets[socketId];
            if (!socket) {
                return -3;
            }
            socket.onopen = function (e) {
                GROWABLE_HEAP_U32()[WS.socketEvent >> 2] = socketId;
                getWasmTableEntry(callbackFunc)(0, WS.socketEvent, userData);
            };
            return 0;
        }
        var ENV = {};
        function getExecutableName() {
            return thisProgram || "./this.program";
        }
        function getEnvStrings() {
            if (!getEnvStrings.strings) {
                var lang =
                    (
                        (typeof navigator == "object" &&
                            navigator.languages &&
                            navigator.languages[0]) ||
                        "C"
                    ).replace("-", "_") + ".UTF-8";
                var env = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: lang,
                    _: getExecutableName(),
                };
                for (var x in ENV) {
                    if (ENV[x] === undefined) delete env[x];
                    else env[x] = ENV[x];
                }
                var strings = [];
                for (var x in env) {
                    strings.push(x + "=" + env[x]);
                }
                getEnvStrings.strings = strings;
            }
            return getEnvStrings.strings;
        }
        function _environ_get(__environ, environ_buf) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    15,
                    1,
                    __environ,
                    environ_buf,
                );
            var bufSize = 0;
            getEnvStrings().forEach(function (string, i) {
                var ptr = environ_buf + bufSize;
                GROWABLE_HEAP_I32()[(__environ + i * 4) >> 2] = ptr;
                writeAsciiToMemory(string, ptr);
                bufSize += string.length + 1;
            });
            return 0;
        }
        function _environ_sizes_get(penviron_count, penviron_buf_size) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    16,
                    1,
                    penviron_count,
                    penviron_buf_size,
                );
            var strings = getEnvStrings();
            GROWABLE_HEAP_I32()[penviron_count >> 2] = strings.length;
            var bufSize = 0;
            strings.forEach(function (string) {
                bufSize += string.length + 1;
            });
            GROWABLE_HEAP_I32()[penviron_buf_size >> 2] = bufSize;
            return 0;
        }
        function _fd_close(fd) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(17, 1, fd);
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                FS.close(stream);
                return 0;
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        function _fd_fdstat_get(fd, pbuf) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(18, 1, fd, pbuf);
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var type = stream.tty
                    ? 2
                    : FS.isDir(stream.mode)
                      ? 3
                      : FS.isLink(stream.mode)
                        ? 7
                        : 4;
                GROWABLE_HEAP_I8()[pbuf >> 0] = type;
                return 0;
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        function _fd_read(fd, iov, iovcnt, pnum) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    19,
                    1,
                    fd,
                    iov,
                    iovcnt,
                    pnum,
                );
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = SYSCALLS.doReadv(stream, iov, iovcnt);
                GROWABLE_HEAP_I32()[pnum >> 2] = num;
                return 0;
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    20,
                    1,
                    fd,
                    offset_low,
                    offset_high,
                    whence,
                    newOffset,
                );
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var HIGH_OFFSET = 4294967296;
                var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
                var DOUBLE_LIMIT = 9007199254740992;
                if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
                    return -61;
                }
                FS.llseek(stream, offset, whence);
                (tempI64 = [
                    stream.position >>> 0,
                    ((tempDouble = stream.position),
                    +Math.abs(tempDouble) >= 1
                        ? tempDouble > 0
                            ? (Math.min(
                                  +Math.floor(tempDouble / 4294967296),
                                  4294967295,
                              ) |
                                  0) >>>
                              0
                            : ~~+Math.ceil(
                                  (tempDouble - +(~~tempDouble >>> 0)) /
                                      4294967296,
                              ) >>> 0
                        : 0),
                ]),
                    (GROWABLE_HEAP_I32()[newOffset >> 2] = tempI64[0]),
                    (GROWABLE_HEAP_I32()[(newOffset + 4) >> 2] = tempI64[1]);
                if (stream.getdents && offset === 0 && whence === 0)
                    stream.getdents = null;
                return 0;
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        function _fd_write(fd, iov, iovcnt, pnum) {
            if (ENVIRONMENT_IS_PTHREAD)
                return _emscripten_proxy_to_main_thread_js(
                    21,
                    1,
                    fd,
                    iov,
                    iovcnt,
                    pnum,
                );
            try {
                var stream = SYSCALLS.getStreamFromFD(fd);
                var num = SYSCALLS.doWritev(stream, iov, iovcnt);
                GROWABLE_HEAP_I32()[pnum >> 2] = num;
                return 0;
            } catch (e) {
                if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
                    throw e;
                return e.errno;
            }
        }
        function _setTempRet0(val) {
            setTempRet0(val);
        }
        function __isLeapYear(year) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        }
        function __arraySum(array, index) {
            var sum = 0;
            for (var i = 0; i <= index; sum += array[i++]) {}
            return sum;
        }
        var __MONTH_DAYS_LEAP = [
            31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        var __MONTH_DAYS_REGULAR = [
            31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
        ];
        function __addDays(date, days) {
            var newDate = new Date(date.getTime());
            while (days > 0) {
                var leap = __isLeapYear(newDate.getFullYear());
                var currentMonth = newDate.getMonth();
                var daysInCurrentMonth = (
                    leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR
                )[currentMonth];
                if (days > daysInCurrentMonth - newDate.getDate()) {
                    days -= daysInCurrentMonth - newDate.getDate() + 1;
                    newDate.setDate(1);
                    if (currentMonth < 11) {
                        newDate.setMonth(currentMonth + 1);
                    } else {
                        newDate.setMonth(0);
                        newDate.setFullYear(newDate.getFullYear() + 1);
                    }
                } else {
                    newDate.setDate(newDate.getDate() + days);
                    return newDate;
                }
            }
            return newDate;
        }
        function _strftime(s, maxsize, format, tm) {
            var tm_zone = GROWABLE_HEAP_I32()[(tm + 40) >> 2];
            var date = {
                tm_sec: GROWABLE_HEAP_I32()[tm >> 2],
                tm_min: GROWABLE_HEAP_I32()[(tm + 4) >> 2],
                tm_hour: GROWABLE_HEAP_I32()[(tm + 8) >> 2],
                tm_mday: GROWABLE_HEAP_I32()[(tm + 12) >> 2],
                tm_mon: GROWABLE_HEAP_I32()[(tm + 16) >> 2],
                tm_year: GROWABLE_HEAP_I32()[(tm + 20) >> 2],
                tm_wday: GROWABLE_HEAP_I32()[(tm + 24) >> 2],
                tm_yday: GROWABLE_HEAP_I32()[(tm + 28) >> 2],
                tm_isdst: GROWABLE_HEAP_I32()[(tm + 32) >> 2],
                tm_gmtoff: GROWABLE_HEAP_I32()[(tm + 36) >> 2],
                tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
            };
            var pattern = UTF8ToString(format);
            var EXPANSION_RULES_1 = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y",
            };
            for (var rule in EXPANSION_RULES_1) {
                pattern = pattern.replace(
                    new RegExp(rule, "g"),
                    EXPANSION_RULES_1[rule],
                );
            }
            var WEEKDAYS = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            var MONTHS = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            function leadingSomething(value, digits, character) {
                var str =
                    typeof value == "number" ? value.toString() : value || "";
                while (str.length < digits) {
                    str = character[0] + str;
                }
                return str;
            }
            function leadingNulls(value, digits) {
                return leadingSomething(value, digits, "0");
            }
            function compareByDay(date1, date2) {
                function sgn(value) {
                    return value < 0 ? -1 : value > 0 ? 1 : 0;
                }
                var compare;
                if (
                    (compare = sgn(
                        date1.getFullYear() - date2.getFullYear(),
                    )) === 0
                ) {
                    if (
                        (compare = sgn(date1.getMonth() - date2.getMonth())) ===
                        0
                    ) {
                        compare = sgn(date1.getDate() - date2.getDate());
                    }
                }
                return compare;
            }
            function getFirstWeekStartDate(janFourth) {
                switch (janFourth.getDay()) {
                    case 0:
                        return new Date(janFourth.getFullYear() - 1, 11, 29);
                    case 1:
                        return janFourth;
                    case 2:
                        return new Date(janFourth.getFullYear(), 0, 3);
                    case 3:
                        return new Date(janFourth.getFullYear(), 0, 2);
                    case 4:
                        return new Date(janFourth.getFullYear(), 0, 1);
                    case 5:
                        return new Date(janFourth.getFullYear() - 1, 11, 31);
                    case 6:
                        return new Date(janFourth.getFullYear() - 1, 11, 30);
                }
            }
            function getWeekBasedYear(date) {
                var thisDate = __addDays(
                    new Date(date.tm_year + 1900, 0, 1),
                    date.tm_yday,
                );
                var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
                var janFourthNextYear = new Date(
                    thisDate.getFullYear() + 1,
                    0,
                    4,
                );
                var firstWeekStartThisYear =
                    getFirstWeekStartDate(janFourthThisYear);
                var firstWeekStartNextYear =
                    getFirstWeekStartDate(janFourthNextYear);
                if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
                    if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                        return thisDate.getFullYear() + 1;
                    } else {
                        return thisDate.getFullYear();
                    }
                } else {
                    return thisDate.getFullYear() - 1;
                }
            }
            var EXPANSION_RULES_2 = {
                "%a": function (date) {
                    return WEEKDAYS[date.tm_wday].substring(0, 3);
                },
                "%A": function (date) {
                    return WEEKDAYS[date.tm_wday];
                },
                "%b": function (date) {
                    return MONTHS[date.tm_mon].substring(0, 3);
                },
                "%B": function (date) {
                    return MONTHS[date.tm_mon];
                },
                "%C": function (date) {
                    var year = date.tm_year + 1900;
                    return leadingNulls((year / 100) | 0, 2);
                },
                "%d": function (date) {
                    return leadingNulls(date.tm_mday, 2);
                },
                "%e": function (date) {
                    return leadingSomething(date.tm_mday, 2, " ");
                },
                "%g": function (date) {
                    return getWeekBasedYear(date).toString().substring(2);
                },
                "%G": function (date) {
                    return getWeekBasedYear(date);
                },
                "%H": function (date) {
                    return leadingNulls(date.tm_hour, 2);
                },
                "%I": function (date) {
                    var twelveHour = date.tm_hour;
                    if (twelveHour == 0) twelveHour = 12;
                    else if (twelveHour > 12) twelveHour -= 12;
                    return leadingNulls(twelveHour, 2);
                },
                "%j": function (date) {
                    return leadingNulls(
                        date.tm_mday +
                            __arraySum(
                                __isLeapYear(date.tm_year + 1900)
                                    ? __MONTH_DAYS_LEAP
                                    : __MONTH_DAYS_REGULAR,
                                date.tm_mon - 1,
                            ),
                        3,
                    );
                },
                "%m": function (date) {
                    return leadingNulls(date.tm_mon + 1, 2);
                },
                "%M": function (date) {
                    return leadingNulls(date.tm_min, 2);
                },
                "%n": function () {
                    return "\n";
                },
                "%p": function (date) {
                    if (date.tm_hour >= 0 && date.tm_hour < 12) {
                        return "AM";
                    } else {
                        return "PM";
                    }
                },
                "%S": function (date) {
                    return leadingNulls(date.tm_sec, 2);
                },
                "%t": function () {
                    return "\t";
                },
                "%u": function (date) {
                    return date.tm_wday || 7;
                },
                "%U": function (date) {
                    var days = date.tm_yday + 7 - date.tm_wday;
                    return leadingNulls(Math.floor(days / 7), 2);
                },
                "%V": function (date) {
                    var val = Math.floor(
                        (date.tm_yday + 7 - ((date.tm_wday + 6) % 7)) / 7,
                    );
                    if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
                        val++;
                    }
                    if (!val) {
                        val = 52;
                        var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
                        if (
                            dec31 == 4 ||
                            (dec31 == 5 &&
                                __isLeapYear((date.tm_year % 400) - 1))
                        ) {
                            val++;
                        }
                    } else if (val == 53) {
                        var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
                        if (
                            jan1 != 4 &&
                            (jan1 != 3 || !__isLeapYear(date.tm_year))
                        )
                            val = 1;
                    }
                    return leadingNulls(val, 2);
                },
                "%w": function (date) {
                    return date.tm_wday;
                },
                "%W": function (date) {
                    var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
                    return leadingNulls(Math.floor(days / 7), 2);
                },
                "%y": function (date) {
                    return (date.tm_year + 1900).toString().substring(2);
                },
                "%Y": function (date) {
                    return date.tm_year + 1900;
                },
                "%z": function (date) {
                    var off = date.tm_gmtoff;
                    var ahead = off >= 0;
                    off = Math.abs(off) / 60;
                    off = (off / 60) * 100 + (off % 60);
                    return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
                },
                "%Z": function (date) {
                    return date.tm_zone;
                },
                "%%": function () {
                    return "%";
                },
            };
            pattern = pattern.replace(/%%/g, "\0\0");
            for (var rule in EXPANSION_RULES_2) {
                if (pattern.includes(rule)) {
                    pattern = pattern.replace(
                        new RegExp(rule, "g"),
                        EXPANSION_RULES_2[rule](date),
                    );
                }
            }
            pattern = pattern.replace(/\0\0/g, "%");
            var bytes = intArrayFromString(pattern, false);
            if (bytes.length > maxsize) {
                return 0;
            }
            writeArrayToMemory(bytes, s);
            return bytes.length - 1;
        }
        PThread.init();
        var FSNode = function (parent, name, mode, rdev) {
            if (!parent) {
                parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
        };
        var readMode = 292 | 73;
        var writeMode = 146;
        Object.defineProperties(FSNode.prototype, {
            read: {
                get: function () {
                    return (this.mode & readMode) === readMode;
                },
                set: function (val) {
                    val ? (this.mode |= readMode) : (this.mode &= ~readMode);
                },
            },
            write: {
                get: function () {
                    return (this.mode & writeMode) === writeMode;
                },
                set: function (val) {
                    val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
                },
            },
            isFolder: {
                get: function () {
                    return FS.isDir(this.mode);
                },
            },
            isDevice: {
                get: function () {
                    return FS.isChrdev(this.mode);
                },
            },
        });
        FS.FSNode = FSNode;
        FS.staticInit();
        ERRNO_CODES = {
            EPERM: 63,
            ENOENT: 44,
            ESRCH: 71,
            EINTR: 27,
            EIO: 29,
            ENXIO: 60,
            E2BIG: 1,
            ENOEXEC: 45,
            EBADF: 8,
            ECHILD: 12,
            EAGAIN: 6,
            EWOULDBLOCK: 6,
            ENOMEM: 48,
            EACCES: 2,
            EFAULT: 21,
            ENOTBLK: 105,
            EBUSY: 10,
            EEXIST: 20,
            EXDEV: 75,
            ENODEV: 43,
            ENOTDIR: 54,
            EISDIR: 31,
            EINVAL: 28,
            ENFILE: 41,
            EMFILE: 33,
            ENOTTY: 59,
            ETXTBSY: 74,
            EFBIG: 22,
            ENOSPC: 51,
            ESPIPE: 70,
            EROFS: 69,
            EMLINK: 34,
            EPIPE: 64,
            EDOM: 18,
            ERANGE: 68,
            ENOMSG: 49,
            EIDRM: 24,
            ECHRNG: 106,
            EL2NSYNC: 156,
            EL3HLT: 107,
            EL3RST: 108,
            ELNRNG: 109,
            EUNATCH: 110,
            ENOCSI: 111,
            EL2HLT: 112,
            EDEADLK: 16,
            ENOLCK: 46,
            EBADE: 113,
            EBADR: 114,
            EXFULL: 115,
            ENOANO: 104,
            EBADRQC: 103,
            EBADSLT: 102,
            EDEADLOCK: 16,
            EBFONT: 101,
            ENOSTR: 100,
            ENODATA: 116,
            ETIME: 117,
            ENOSR: 118,
            ENONET: 119,
            ENOPKG: 120,
            EREMOTE: 121,
            ENOLINK: 47,
            EADV: 122,
            ESRMNT: 123,
            ECOMM: 124,
            EPROTO: 65,
            EMULTIHOP: 36,
            EDOTDOT: 125,
            EBADMSG: 9,
            ENOTUNIQ: 126,
            EBADFD: 127,
            EREMCHG: 128,
            ELIBACC: 129,
            ELIBBAD: 130,
            ELIBSCN: 131,
            ELIBMAX: 132,
            ELIBEXEC: 133,
            ENOSYS: 52,
            ENOTEMPTY: 55,
            ENAMETOOLONG: 37,
            ELOOP: 32,
            EOPNOTSUPP: 138,
            EPFNOSUPPORT: 139,
            ECONNRESET: 15,
            ENOBUFS: 42,
            EAFNOSUPPORT: 5,
            EPROTOTYPE: 67,
            ENOTSOCK: 57,
            ENOPROTOOPT: 50,
            ESHUTDOWN: 140,
            ECONNREFUSED: 14,
            EADDRINUSE: 3,
            ECONNABORTED: 13,
            ENETUNREACH: 40,
            ENETDOWN: 38,
            ETIMEDOUT: 73,
            EHOSTDOWN: 142,
            EHOSTUNREACH: 23,
            EINPROGRESS: 26,
            EALREADY: 7,
            EDESTADDRREQ: 17,
            EMSGSIZE: 35,
            EPROTONOSUPPORT: 66,
            ESOCKTNOSUPPORT: 137,
            EADDRNOTAVAIL: 4,
            ENETRESET: 39,
            EISCONN: 30,
            ENOTCONN: 53,
            ETOOMANYREFS: 141,
            EUSERS: 136,
            EDQUOT: 19,
            ESTALE: 72,
            ENOTSUP: 138,
            ENOMEDIUM: 148,
            EILSEQ: 25,
            EOVERFLOW: 61,
            ECANCELED: 11,
            ENOTRECOVERABLE: 56,
            EOWNERDEAD: 62,
            ESTRPIPE: 135,
        };
        Module["requestFullscreen"] = function Module_requestFullscreen(
            lockPointer,
            resizeCanvas,
        ) {
            Browser.requestFullscreen(lockPointer, resizeCanvas);
        };
        Module["requestFullScreen"] = function Module_requestFullScreen() {
            Browser.requestFullScreen();
        };
        Module["requestAnimationFrame"] = function Module_requestAnimationFrame(
            func,
        ) {
            Browser.requestAnimationFrame(func);
        };
        Module["setCanvasSize"] = function Module_setCanvasSize(
            width,
            height,
            noUpdates,
        ) {
            Browser.setCanvasSize(width, height, noUpdates);
        };
        Module["pauseMainLoop"] = function Module_pauseMainLoop() {
            Browser.mainLoop.pause();
        };
        Module["resumeMainLoop"] = function Module_resumeMainLoop() {
            Browser.mainLoop.resume();
        };
        Module["getUserMedia"] = function Module_getUserMedia() {
            Browser.getUserMedia();
        };
        Module["createContext"] = function Module_createContext(
            canvas,
            useWebGL,
            setInModule,
            webGLContextAttributes,
        ) {
            return Browser.createContext(
                canvas,
                useWebGL,
                setInModule,
                webGLContextAttributes,
            );
        };
        if (!ENVIRONMENT_IS_PTHREAD) Fetch.staticInit();
        var proxiedFunctionTable = [
            null,
            exitOnMainThread,
            pthreadCreateProxied,
            ___syscall_fcntl64,
            ___syscall_openat,
            _tzset_impl,
            _emscripten_websocket_close,
            _emscripten_websocket_delete,
            _emscripten_websocket_is_supported,
            _emscripten_websocket_new,
            _emscripten_websocket_send_utf8_text,
            _emscripten_websocket_set_onclose_callback_on_thread,
            _emscripten_websocket_set_onerror_callback_on_thread,
            _emscripten_websocket_set_onmessage_callback_on_thread,
            _emscripten_websocket_set_onopen_callback_on_thread,
            _environ_get,
            _environ_sizes_get,
            _fd_close,
            _fd_fdstat_get,
            _fd_read,
            _fd_seek,
            _fd_write,
        ];
        var ASSERTIONS = true;
        function intArrayFromString(stringy, dontAddNull, length) {
            var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
            var u8array = new Array(len);
            var numBytesWritten = stringToUTF8Array(
                stringy,
                u8array,
                0,
                u8array.length,
            );
            if (dontAddNull) u8array.length = numBytesWritten;
            return u8array;
        }
        function checkIncomingModuleAPI() {
            ignoredModuleProp("fetchSettings");
        }
        var asmLibraryArg = {
            __assert_fail: ___assert_fail,
            __emscripten_init_main_thread_js: ___emscripten_init_main_thread_js,
            __emscripten_thread_cleanup: ___emscripten_thread_cleanup,
            __pthread_create_js: ___pthread_create_js,
            __syscall_fcntl64: ___syscall_fcntl64,
            __syscall_openat: ___syscall_openat,
            _emscripten_date_now: __emscripten_date_now,
            _emscripten_default_pthread_stack_size:
                __emscripten_default_pthread_stack_size,
            _emscripten_fetch_free: __emscripten_fetch_free,
            _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
            _emscripten_notify_proxying_queue:
                __emscripten_notify_proxying_queue,
            _emscripten_set_offscreencanvas_size:
                __emscripten_set_offscreencanvas_size,
            _gmtime_js: __gmtime_js,
            _localtime_js: __localtime_js,
            _mktime_js: __mktime_js,
            _tzset_js: __tzset_js,
            abort: _abort,
            emscripten_asm_const_int: _emscripten_asm_const_int,
            emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
            emscripten_check_blocking_allowed:
                _emscripten_check_blocking_allowed,
            emscripten_get_heap_max: _emscripten_get_heap_max,
            emscripten_get_now: _emscripten_get_now,
            emscripten_memcpy_big: _emscripten_memcpy_big,
            emscripten_num_logical_cores: _emscripten_num_logical_cores,
            emscripten_receive_on_main_thread_js:
                _emscripten_receive_on_main_thread_js,
            emscripten_resize_heap: _emscripten_resize_heap,
            emscripten_set_main_loop: _emscripten_set_main_loop,
            emscripten_start_fetch: _emscripten_start_fetch,
            emscripten_unwind_to_js_event_loop:
                _emscripten_unwind_to_js_event_loop,
            emscripten_websocket_close: _emscripten_websocket_close,
            emscripten_websocket_delete: _emscripten_websocket_delete,
            emscripten_websocket_is_supported:
                _emscripten_websocket_is_supported,
            emscripten_websocket_new: _emscripten_websocket_new,
            emscripten_websocket_send_utf8_text:
                _emscripten_websocket_send_utf8_text,
            emscripten_websocket_set_onclose_callback_on_thread:
                _emscripten_websocket_set_onclose_callback_on_thread,
            emscripten_websocket_set_onerror_callback_on_thread:
                _emscripten_websocket_set_onerror_callback_on_thread,
            emscripten_websocket_set_onmessage_callback_on_thread:
                _emscripten_websocket_set_onmessage_callback_on_thread,
            emscripten_websocket_set_onopen_callback_on_thread:
                _emscripten_websocket_set_onopen_callback_on_thread,
            environ_get: _environ_get,
            environ_sizes_get: _environ_sizes_get,
            exit: _exit,
            fd_close: _fd_close,
            fd_fdstat_get: _fd_fdstat_get,
            fd_read: _fd_read,
            fd_seek: _fd_seek,
            fd_write: _fd_write,
            memory: wasmMemory || Module["wasmMemory"],
            setTempRet0: _setTempRet0,
            strftime: _strftime,
        };
        var asm = createWasm();
        var ___wasm_call_ctors = (Module["___wasm_call_ctors"] =
            createExportWrapper("__wasm_call_ctors"));
        var _main = (Module["_main"] = createExportWrapper("main"));
        var _start = (Module["_start"] = createExportWrapper("start"));
        var _stop = (Module["_stop"] = createExportWrapper("stop"));
        var _pause = (Module["_pause"] = createExportWrapper("pause"));
        var _resume = (Module["_resume"] = createExportWrapper("resume"));
        var _seek = (Module["_seek"] = createExportWrapper("seek"));
        var _speed = (Module["_speed"] = createExportWrapper("speed"));
        var ___errno_location = (Module["___errno_location"] =
            createExportWrapper("__errno_location"));
        var _free = (Module["_free"] = createExportWrapper("free"));
        var _malloc = (Module["_malloc"] = createExportWrapper("malloc"));
        var _emscripten_tls_init = (Module["_emscripten_tls_init"] =
            createExportWrapper("emscripten_tls_init"));
        var _emscripten_builtin_memalign = (Module[
            "_emscripten_builtin_memalign"
        ] = createExportWrapper("emscripten_builtin_memalign"));
        var ___stdio_exit = (Module["___stdio_exit"] =
            createExportWrapper("__stdio_exit"));
        var __emscripten_thread_init = (Module["__emscripten_thread_init"] =
            createExportWrapper("_emscripten_thread_init"));
        var __emscripten_thread_crashed = (Module[
            "__emscripten_thread_crashed"
        ] = createExportWrapper("_emscripten_thread_crashed"));
        var _emscripten_main_thread_process_queued_calls = (Module[
            "_emscripten_main_thread_process_queued_calls"
        ] = createExportWrapper("emscripten_main_thread_process_queued_calls"));
        var _pthread_self = (Module["_pthread_self"] =
            createExportWrapper("pthread_self"));
        var _emscripten_main_browser_thread_id = (Module[
            "_emscripten_main_browser_thread_id"
        ] = createExportWrapper("emscripten_main_browser_thread_id"));
        var _emscripten_proxy_execute_queue = (Module[
            "_emscripten_proxy_execute_queue"
        ] = createExportWrapper("emscripten_proxy_execute_queue"));
        var _emscripten_run_in_main_runtime_thread_js = (Module[
            "_emscripten_run_in_main_runtime_thread_js"
        ] = createExportWrapper("emscripten_run_in_main_runtime_thread_js"));
        var _emscripten_dispatch_to_thread_ = (Module[
            "_emscripten_dispatch_to_thread_"
        ] = createExportWrapper("emscripten_dispatch_to_thread_"));
        var _emscripten_stack_get_base = (Module["_emscripten_stack_get_base"] =
            function () {
                return (_emscripten_stack_get_base = Module[
                    "_emscripten_stack_get_base"
                ] =
                    Module["asm"]["emscripten_stack_get_base"]).apply(
                    null,
                    arguments,
                );
            });
        var _emscripten_stack_get_end = (Module["_emscripten_stack_get_end"] =
            function () {
                return (_emscripten_stack_get_end = Module[
                    "_emscripten_stack_get_end"
                ] =
                    Module["asm"]["emscripten_stack_get_end"]).apply(
                    null,
                    arguments,
                );
            });
        var __emscripten_thread_free_data = (Module[
            "__emscripten_thread_free_data"
        ] = createExportWrapper("_emscripten_thread_free_data"));
        var __emscripten_thread_exit = (Module["__emscripten_thread_exit"] =
            createExportWrapper("_emscripten_thread_exit"));
        var _emscripten_stack_init = (Module["_emscripten_stack_init"] =
            function () {
                return (_emscripten_stack_init = Module[
                    "_emscripten_stack_init"
                ] =
                    Module["asm"]["emscripten_stack_init"]).apply(
                    null,
                    arguments,
                );
            });
        var _emscripten_stack_set_limits = (Module[
            "_emscripten_stack_set_limits"
        ] = function () {
            return (_emscripten_stack_set_limits = Module[
                "_emscripten_stack_set_limits"
            ] =
                Module["asm"]["emscripten_stack_set_limits"]).apply(
                null,
                arguments,
            );
        });
        var _emscripten_stack_get_free = (Module["_emscripten_stack_get_free"] =
            function () {
                return (_emscripten_stack_get_free = Module[
                    "_emscripten_stack_get_free"
                ] =
                    Module["asm"]["emscripten_stack_get_free"]).apply(
                    null,
                    arguments,
                );
            });
        var stackSave = (Module["stackSave"] =
            createExportWrapper("stackSave"));
        var stackRestore = (Module["stackRestore"] =
            createExportWrapper("stackRestore"));
        var stackAlloc = (Module["stackAlloc"] =
            createExportWrapper("stackAlloc"));
        var dynCall_jiji = (Module["dynCall_jiji"] =
            createExportWrapper("dynCall_jiji"));
        var dynCall_iiiji = (Module["dynCall_iiiji"] =
            createExportWrapper("dynCall_iiiji"));
        var dynCall_iiiiij = (Module["dynCall_iiiiij"] =
            createExportWrapper("dynCall_iiiiij"));
        var dynCall_jiiij = (Module["dynCall_jiiij"] =
            createExportWrapper("dynCall_jiiij"));
        var _ff_h264_cabac_tables = (Module["_ff_h264_cabac_tables"] = 129852);
        var __emscripten_allow_main_runtime_queued_calls = (Module[
            "__emscripten_allow_main_runtime_queued_calls"
        ] = 226528);
        unexportedRuntimeFunction("intArrayFromString", false);
        unexportedRuntimeFunction("intArrayToString", false);
        unexportedRuntimeFunction("ccall", false);
        Module["cwrap"] = cwrap;
        unexportedRuntimeFunction("setValue", false);
        unexportedRuntimeFunction("getValue", false);
        unexportedRuntimeFunction("allocate", false);
        unexportedRuntimeFunction("UTF8ArrayToString", false);
        unexportedRuntimeFunction("UTF8ToString", false);
        unexportedRuntimeFunction("stringToUTF8Array", false);
        unexportedRuntimeFunction("stringToUTF8", false);
        unexportedRuntimeFunction("lengthBytesUTF8", false);
        unexportedRuntimeFunction("stackTrace", false);
        unexportedRuntimeFunction("addOnPreRun", false);
        unexportedRuntimeFunction("addOnInit", false);
        unexportedRuntimeFunction("addOnPreMain", false);
        unexportedRuntimeFunction("addOnExit", false);
        unexportedRuntimeFunction("addOnPostRun", false);
        unexportedRuntimeFunction("writeStringToMemory", false);
        unexportedRuntimeFunction("writeArrayToMemory", false);
        unexportedRuntimeFunction("writeAsciiToMemory", false);
        unexportedRuntimeFunction("addRunDependency", true);
        unexportedRuntimeFunction("removeRunDependency", true);
        unexportedRuntimeFunction("FS_createFolder", false);
        unexportedRuntimeFunction("FS_createPath", true);
        unexportedRuntimeFunction("FS_createDataFile", true);
        unexportedRuntimeFunction("FS_createPreloadedFile", true);
        unexportedRuntimeFunction("FS_createLazyFile", true);
        unexportedRuntimeFunction("FS_createLink", false);
        unexportedRuntimeFunction("FS_createDevice", true);
        unexportedRuntimeFunction("FS_unlink", true);
        unexportedRuntimeFunction("getLEB", false);
        unexportedRuntimeFunction("getFunctionTables", false);
        unexportedRuntimeFunction("alignFunctionTables", false);
        unexportedRuntimeFunction("registerFunctions", false);
        unexportedRuntimeFunction("addFunction", false);
        unexportedRuntimeFunction("removeFunction", false);
        unexportedRuntimeFunction("getFuncWrapper", false);
        unexportedRuntimeFunction("prettyPrint", false);
        unexportedRuntimeFunction("dynCall", false);
        unexportedRuntimeFunction("getCompilerSetting", false);
        unexportedRuntimeFunction("print", false);
        unexportedRuntimeFunction("printErr", false);
        unexportedRuntimeFunction("getTempRet0", false);
        unexportedRuntimeFunction("setTempRet0", false);
        unexportedRuntimeFunction("callMain", false);
        unexportedRuntimeFunction("abort", false);
        Module["keepRuntimeAlive"] = keepRuntimeAlive;
        unexportedRuntimeFunction("zeroMemory", false);
        unexportedRuntimeFunction("stringToNewUTF8", false);
        unexportedRuntimeFunction("emscripten_realloc_buffer", false);
        unexportedRuntimeFunction("ENV", false);
        unexportedRuntimeFunction("ERRNO_CODES", false);
        unexportedRuntimeFunction("ERRNO_MESSAGES", false);
        unexportedRuntimeFunction("setErrNo", false);
        unexportedRuntimeFunction("inetPton4", false);
        unexportedRuntimeFunction("inetNtop4", false);
        unexportedRuntimeFunction("inetPton6", false);
        unexportedRuntimeFunction("inetNtop6", false);
        unexportedRuntimeFunction("readSockaddr", false);
        unexportedRuntimeFunction("writeSockaddr", false);
        unexportedRuntimeFunction("DNS", false);
        unexportedRuntimeFunction("getHostByName", false);
        unexportedRuntimeFunction("Protocols", false);
        unexportedRuntimeFunction("Sockets", false);
        unexportedRuntimeFunction("getRandomDevice", false);
        unexportedRuntimeFunction("traverseStack", false);
        unexportedRuntimeFunction("UNWIND_CACHE", false);
        unexportedRuntimeFunction("convertPCtoSourceLocation", false);
        unexportedRuntimeFunction("readAsmConstArgsArray", false);
        unexportedRuntimeFunction("readAsmConstArgs", false);
        unexportedRuntimeFunction("mainThreadEM_ASM", false);
        unexportedRuntimeFunction("jstoi_q", false);
        unexportedRuntimeFunction("jstoi_s", false);
        unexportedRuntimeFunction("getExecutableName", false);
        unexportedRuntimeFunction("listenOnce", false);
        unexportedRuntimeFunction("autoResumeAudioContext", false);
        unexportedRuntimeFunction("dynCallLegacy", false);
        unexportedRuntimeFunction("getDynCaller", false);
        unexportedRuntimeFunction("dynCall", false);
        unexportedRuntimeFunction("handleException", false);
        unexportedRuntimeFunction("runtimeKeepalivePush", false);
        unexportedRuntimeFunction("runtimeKeepalivePop", false);
        unexportedRuntimeFunction("callUserCallback", false);
        unexportedRuntimeFunction("maybeExit", false);
        unexportedRuntimeFunction("safeSetTimeout", false);
        unexportedRuntimeFunction("asmjsMangle", false);
        unexportedRuntimeFunction("asyncLoad", false);
        unexportedRuntimeFunction("alignMemory", false);
        unexportedRuntimeFunction("mmapAlloc", false);
        unexportedRuntimeFunction("reallyNegative", false);
        unexportedRuntimeFunction("unSign", false);
        unexportedRuntimeFunction("reSign", false);
        unexportedRuntimeFunction("formatString", false);
        unexportedRuntimeFunction("PATH", false);
        unexportedRuntimeFunction("PATH_FS", false);
        unexportedRuntimeFunction("SYSCALLS", false);
        unexportedRuntimeFunction("getSocketFromFD", false);
        unexportedRuntimeFunction("getSocketAddress", false);
        unexportedRuntimeFunction("JSEvents", false);
        unexportedRuntimeFunction("registerKeyEventCallback", false);
        unexportedRuntimeFunction("specialHTMLTargets", false);
        unexportedRuntimeFunction("maybeCStringToJsString", false);
        unexportedRuntimeFunction("findEventTarget", false);
        unexportedRuntimeFunction("findCanvasEventTarget", false);
        unexportedRuntimeFunction("getBoundingClientRect", false);
        unexportedRuntimeFunction("fillMouseEventData", false);
        unexportedRuntimeFunction("registerMouseEventCallback", false);
        unexportedRuntimeFunction("registerWheelEventCallback", false);
        unexportedRuntimeFunction("registerUiEventCallback", false);
        unexportedRuntimeFunction("registerFocusEventCallback", false);
        unexportedRuntimeFunction("fillDeviceOrientationEventData", false);
        unexportedRuntimeFunction(
            "registerDeviceOrientationEventCallback",
            false,
        );
        unexportedRuntimeFunction("fillDeviceMotionEventData", false);
        unexportedRuntimeFunction("registerDeviceMotionEventCallback", false);
        unexportedRuntimeFunction("screenOrientation", false);
        unexportedRuntimeFunction("fillOrientationChangeEventData", false);
        unexportedRuntimeFunction(
            "registerOrientationChangeEventCallback",
            false,
        );
        unexportedRuntimeFunction("fillFullscreenChangeEventData", false);
        unexportedRuntimeFunction(
            "registerFullscreenChangeEventCallback",
            false,
        );
        unexportedRuntimeFunction("registerRestoreOldStyle", false);
        unexportedRuntimeFunction("hideEverythingExceptGivenElement", false);
        unexportedRuntimeFunction("restoreHiddenElements", false);
        unexportedRuntimeFunction("setLetterbox", false);
        unexportedRuntimeFunction("currentFullscreenStrategy", false);
        unexportedRuntimeFunction("restoreOldWindowedStyle", false);
        unexportedRuntimeFunction(
            "softFullscreenResizeWebGLRenderTarget",
            false,
        );
        unexportedRuntimeFunction("doRequestFullscreen", false);
        unexportedRuntimeFunction("fillPointerlockChangeEventData", false);
        unexportedRuntimeFunction(
            "registerPointerlockChangeEventCallback",
            false,
        );
        unexportedRuntimeFunction(
            "registerPointerlockErrorEventCallback",
            false,
        );
        unexportedRuntimeFunction("requestPointerLock", false);
        unexportedRuntimeFunction("fillVisibilityChangeEventData", false);
        unexportedRuntimeFunction(
            "registerVisibilityChangeEventCallback",
            false,
        );
        unexportedRuntimeFunction("registerTouchEventCallback", false);
        unexportedRuntimeFunction("fillGamepadEventData", false);
        unexportedRuntimeFunction("registerGamepadEventCallback", false);
        unexportedRuntimeFunction("registerBeforeUnloadEventCallback", false);
        unexportedRuntimeFunction("fillBatteryEventData", false);
        unexportedRuntimeFunction("battery", false);
        unexportedRuntimeFunction("registerBatteryEventCallback", false);
        unexportedRuntimeFunction("setCanvasElementSize", false);
        unexportedRuntimeFunction("getCanvasElementSize", false);
        unexportedRuntimeFunction("demangle", false);
        unexportedRuntimeFunction("demangleAll", false);
        unexportedRuntimeFunction("jsStackTrace", false);
        unexportedRuntimeFunction("stackTrace", false);
        unexportedRuntimeFunction("getEnvStrings", false);
        unexportedRuntimeFunction("checkWasiClock", false);
        unexportedRuntimeFunction("writeI53ToI64", false);
        unexportedRuntimeFunction("writeI53ToI64Clamped", false);
        unexportedRuntimeFunction("writeI53ToI64Signaling", false);
        unexportedRuntimeFunction("writeI53ToU64Clamped", false);
        unexportedRuntimeFunction("writeI53ToU64Signaling", false);
        unexportedRuntimeFunction("readI53FromI64", false);
        unexportedRuntimeFunction("readI53FromU64", false);
        unexportedRuntimeFunction("convertI32PairToI53", false);
        unexportedRuntimeFunction("convertU32PairToI53", false);
        unexportedRuntimeFunction("setImmediateWrapped", false);
        unexportedRuntimeFunction("clearImmediateWrapped", false);
        unexportedRuntimeFunction("polyfillSetImmediate", false);
        unexportedRuntimeFunction("uncaughtExceptionCount", false);
        unexportedRuntimeFunction("exceptionLast", false);
        unexportedRuntimeFunction("exceptionCaught", false);
        unexportedRuntimeFunction("ExceptionInfo", false);
        unexportedRuntimeFunction("CatchInfo", false);
        unexportedRuntimeFunction("exception_addRef", false);
        unexportedRuntimeFunction("exception_decRef", false);
        unexportedRuntimeFunction("Browser", false);
        unexportedRuntimeFunction("funcWrappers", false);
        unexportedRuntimeFunction("getFuncWrapper", false);
        unexportedRuntimeFunction("setMainLoop", false);
        unexportedRuntimeFunction("wget", false);
        unexportedRuntimeFunction("FS", false);
        unexportedRuntimeFunction("MEMFS", false);
        unexportedRuntimeFunction("TTY", false);
        unexportedRuntimeFunction("PIPEFS", false);
        unexportedRuntimeFunction("SOCKFS", false);
        unexportedRuntimeFunction("_setNetworkCallback", false);
        unexportedRuntimeFunction("tempFixedLengthArray", false);
        unexportedRuntimeFunction("miniTempWebGLFloatBuffers", false);
        unexportedRuntimeFunction("heapObjectForWebGLType", false);
        unexportedRuntimeFunction("heapAccessShiftForWebGLHeap", false);
        unexportedRuntimeFunction("GL", false);
        unexportedRuntimeFunction("emscriptenWebGLGet", false);
        unexportedRuntimeFunction("computeUnpackAlignedImageSize", false);
        unexportedRuntimeFunction("emscriptenWebGLGetTexPixelData", false);
        unexportedRuntimeFunction("emscriptenWebGLGetUniform", false);
        unexportedRuntimeFunction("webglGetUniformLocation", false);
        unexportedRuntimeFunction(
            "webglPrepareUniformLocationsBeforeFirstUse",
            false,
        );
        unexportedRuntimeFunction("webglGetLeftBracePos", false);
        unexportedRuntimeFunction("emscriptenWebGLGetVertexAttrib", false);
        unexportedRuntimeFunction("writeGLArray", false);
        unexportedRuntimeFunction("AL", false);
        unexportedRuntimeFunction("SDL_unicode", false);
        unexportedRuntimeFunction("SDL_ttfContext", false);
        unexportedRuntimeFunction("SDL_audio", false);
        unexportedRuntimeFunction("SDL", false);
        unexportedRuntimeFunction("SDL_gfx", false);
        unexportedRuntimeFunction("GLUT", false);
        unexportedRuntimeFunction("EGL", false);
        unexportedRuntimeFunction("GLFW_Window", false);
        unexportedRuntimeFunction("GLFW", false);
        unexportedRuntimeFunction("GLEW", false);
        unexportedRuntimeFunction("IDBStore", false);
        unexportedRuntimeFunction("runAndAbortIfError", false);
        unexportedRuntimeFunction("Fetch", false);
        unexportedRuntimeFunction("fetchDeleteCachedData", false);
        unexportedRuntimeFunction("fetchLoadCachedData", false);
        unexportedRuntimeFunction("fetchCacheData", false);
        unexportedRuntimeFunction("fetchXHR", false);
        Module["PThread"] = PThread;
        unexportedRuntimeFunction("ptrToString", false);
        unexportedRuntimeFunction("killThread", false);
        unexportedRuntimeFunction("cleanupThread", false);
        unexportedRuntimeFunction("registerTlsInit", false);
        unexportedRuntimeFunction("cancelThread", false);
        unexportedRuntimeFunction("spawnThread", false);
        unexportedRuntimeFunction("exitOnMainThread", false);
        unexportedRuntimeFunction("invokeEntryPoint", false);
        unexportedRuntimeFunction("WS", false);
        unexportedRuntimeFunction("warnOnce", false);
        unexportedRuntimeFunction("stackSave", false);
        unexportedRuntimeFunction("stackRestore", false);
        unexportedRuntimeFunction("stackAlloc", false);
        unexportedRuntimeFunction("AsciiToString", false);
        unexportedRuntimeFunction("stringToAscii", false);
        unexportedRuntimeFunction("UTF16ToString", false);
        unexportedRuntimeFunction("stringToUTF16", false);
        unexportedRuntimeFunction("lengthBytesUTF16", false);
        unexportedRuntimeFunction("UTF32ToString", false);
        unexportedRuntimeFunction("stringToUTF32", false);
        unexportedRuntimeFunction("lengthBytesUTF32", false);
        unexportedRuntimeFunction("allocateUTF8", false);
        unexportedRuntimeFunction("allocateUTF8OnStack", false);
        Module["writeStackCookie"] = writeStackCookie;
        Module["checkStackCookie"] = checkStackCookie;
        Module["PThread"] = PThread;
        Module["wasmMemory"] = wasmMemory;
        Module["ExitStatus"] = ExitStatus;
        unexportedRuntimeSymbol("ALLOC_NORMAL", false);
        unexportedRuntimeSymbol("ALLOC_STACK", false);
        var calledRun;
        function ExitStatus(status) {
            this.name = "ExitStatus";
            this.message = "Program terminated with exit(" + status + ")";
            this.status = status;
        }
        var calledMain = false;
        dependenciesFulfilled = function runCaller() {
            if (!calledRun) run();
            if (!calledRun) dependenciesFulfilled = runCaller;
        };
        function callMain(args) {
            assert(
                runDependencies == 0,
                'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])',
            );
            assert(
                __ATPRERUN__.length == 0,
                "cannot call main when preRun functions remain to be called",
            );
            var entryFunction = Module["_main"];
            args = args || [];
            var argc = args.length + 1;
            var argv = stackAlloc((argc + 1) * 4);
            GROWABLE_HEAP_I32()[argv >> 2] = allocateUTF8OnStack(thisProgram);
            for (var i = 1; i < argc; i++) {
                GROWABLE_HEAP_I32()[(argv >> 2) + i] = allocateUTF8OnStack(
                    args[i - 1],
                );
            }
            GROWABLE_HEAP_I32()[(argv >> 2) + argc] = 0;
            try {
                var ret = entryFunction(argc, argv);
                exit(ret, true);
                return ret;
            } catch (e) {
                return handleException(e);
            } finally {
                calledMain = true;
            }
        }
        function stackCheckInit() {
            _emscripten_stack_init();
            writeStackCookie();
        }
        function run(args) {
            args = args || arguments_;
            if (runDependencies > 0) {
                return;
            }
            stackCheckInit();
            if (ENVIRONMENT_IS_PTHREAD) {
                readyPromiseResolve(Module);
                initRuntime();
                postMessage({ cmd: "loaded" });
                return;
            }
            preRun();
            if (runDependencies > 0) {
                return;
            }
            function doRun() {
                if (calledRun) return;
                calledRun = true;
                Module["calledRun"] = true;
                if (ABORT) return;
                initRuntime();
                preMain();
                readyPromiseResolve(Module);
                if (Module["onRuntimeInitialized"])
                    Module["onRuntimeInitialized"]();
                if (shouldRunNow) callMain(args);
                postRun();
            }
            if (Module["setStatus"]) {
                Module["setStatus"]("Running...");
                setTimeout(function () {
                    setTimeout(function () {
                        Module["setStatus"]("");
                    }, 1);
                    doRun();
                }, 1);
            } else {
                doRun();
            }
            checkStackCookie();
        }
        Module["run"] = run;
        function checkUnflushedContent() {
            var oldOut = out;
            var oldErr = err;
            var has = false;
            out = err = (x) => {
                has = true;
            };
            try {
                ___stdio_exit();
                ["stdout", "stderr"].forEach(function (name) {
                    var info = FS.analyzePath("/dev/" + name);
                    if (!info) return;
                    var stream = info.object;
                    var rdev = stream.rdev;
                    var tty = TTY.ttys[rdev];
                    if (tty && tty.output && tty.output.length) {
                        has = true;
                    }
                });
            } catch (e) {}
            out = oldOut;
            err = oldErr;
            if (has) {
                warnOnce(
                    "stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.",
                );
            }
        }
        function exit(status, implicit) {
            EXITSTATUS = status;
            checkUnflushedContent();
            if (!implicit) {
                if (ENVIRONMENT_IS_PTHREAD) {
                    exitOnMainThread(status);
                    throw "unwind";
                } else {
                }
            }
            if (keepRuntimeAlive() && !implicit) {
                var msg =
                    "program exited (with status: " +
                    status +
                    "), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)";
                readyPromiseReject(msg);
                err(msg);
            }
            procExit(status);
        }
        function procExit(code) {
            EXITSTATUS = code;
            if (!keepRuntimeAlive()) {
                PThread.terminateAllThreads();
                if (Module["onExit"]) Module["onExit"](code);
                ABORT = true;
            }
            quit_(code, new ExitStatus(code));
        }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function")
                Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
                Module["preInit"].pop()();
            }
        }
        var shouldRunNow = true;
        if (Module["noInitialRun"]) shouldRunNow = false;
        run();

        return VmsDecoder.ready;
    };
})();
if (typeof exports === "object" && typeof module === "object")
    module.exports = VmsDecoder;
else if (typeof define === "function" && define["amd"])
    define([], function () {
        return VmsDecoder;
    });
else if (typeof exports === "object") exports["VmsDecoder"] = VmsDecoder;
