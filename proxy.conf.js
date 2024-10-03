const PROXY_CONFIGS = {
    "/api-ioc": {
        target: "http://192.168.88.66:8556",
        secure: false,
        pathRewrite: {
            "^/api-ioc": "",
        },
        changeOrigin: true,
    },
    "/api-cityos": {
        target: "http://192.168.88.66:7556",
        secure: false,
        pathRewrite: {
            "^/api-cityos": "",
        },
    },
    "/api-kpi-config": {
        target: "http://192.168.88.142:9018",
        secure: false,
        pathRewrite: {
            "^/api-kpi-config": "",
        },
    },
    "/api-chat": {
        target: "http://192.168.88.66:8321",
        secure: false,
        pathRewrite: {
            "^/api-chat": "",
        },
    },
};

module.exports = PROXY_CONFIGS;
