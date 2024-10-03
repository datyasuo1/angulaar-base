(function (window) {
    window["env"] = window["env"] || {};

    // Environment variables
    window["env"]["mapAccessToken"] = "${MAP_ACCESS_TOKEN}";
    window["env"]["baseURL"] = "${BASE_URL}";
    window["env"]["modelerURL"] = "${MODELER_URL}";
    window["env"]["appChatURL"] = "${APP_CHAT_URL}";
    window["env"]["screenBuilderURL"] = "${SCREEN_BUILDER_URL}";
    window["env"]["screenBuilderAuthId"] = "${SCREEN_BUILDER_AUTH_ID}";
    window["env"]["screenBuilderRedirectURL"] =
        "${SCREEN_BUILDER_REDIRECT_URL}";
    window["env"]["screenBuilderOrgId"] = "${SCREEN_BUILDER_ORG_ID}";
    window["env"]["tenant"] = "${TENANT}";
    window["env"]["cityOSURL"] = "${CITYOS_URL}";
    window["env"]["kpiURL"] = "${KPI_URL}";
    window["env"]["supersetURL"] = "${SUPERSET_URL}";
    window["env"]["tableauURL"] = "${TABLEAU_URL}";
    window["env"]["ssoURL"] = "${SSO_URL}";
    window["env"]["ssoRealm"] = "${SSO_REALM}";
    window["env"]["ssoClientId"] = "${SSO_CLIENT_ID}";
})(this);
