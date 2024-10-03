export const environment = {
    production: true,
    mapAccessToken:
        (window as any)['env' as any]['mapAccessToken' as any] || '',
    tenant: (window as any)['env' as any]['tenant' as any] || '',
    modelerURL: (window as any)['env' as any]['modelerURL' as any] || '',
    appChatURL: (window as any)['env' as any]['appChatURL' as any] || '',
    screenBuilderURL:
        (window as any)['env' as any]['screenBuilderURL' as any] || '',
    screenBuilderAuthId:
        (window as any)['env' as any]['screenBuilderAuthId' as any] || '',
    screenBuilderRedirectURL:
        (window as any)['env' as any]['screenBuilderRedirectURL' as any] || '',
    screenBuilderOrgId:
        (window as any)['env' as any]['screenBuilderOrgId' as any] || '',
    baseURL: (window as any)['env' as any]['baseURL' as any] || '',
    cityOSURL: (window as any)['env' as any]['cityOSURL' as any] || '',
    kpiURL: (window as any)['env' as any]['kpiURL' as any] || '',
    ssoURL: (window as any)['env' as any]['ssoURL' as any] || '',
    ssoRealm: (window as any)['env' as any]['ssoRealm' as any] || '',
    ssoClientId: (window as any)['env' as any]['ssoClientId' as any] || '',
    firebase: {
        apiKey: 'AIzaSyDa3LkC9KpKWLIRsED_Eqt0tBW8ZFlsOmE',
        authDomain: 'ioc-notification.firebaseapp.com',
        projectId: 'ioc-notification',
        storageBucket: 'ioc-notification.appspot.com',
        messagingSenderId: '45183912364',
        appId: '1:45183912364:web:b49a36e7f8f830e2a0d209',
        measurementId: 'G-GWXPDMKGE1',
        vapidKey:
            'BB2DLT4MKKDo2CGCf8PUUI_9Cdzxhn6LLYLXJV1gD8Gqm7XhSKUd9DOF0qzAIm_jal-63FumsJLFwbTCwfDKqUI',
    },
    supersetURL: (window as any)['env' as any]['supersetURL' as any] || '',
    tableauURL: (window as any)['env' as any]['tableauURL' as any] || '',
};
