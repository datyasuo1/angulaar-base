export interface IAppAccessHistory {
    id: number;
    userId: string;
    appName: string;
    appId: number;
    systemCode: string;
    groupAppName: string;
    accessDate: string;
}

export interface IGetAppAccessHistoryPayload {
    page: number;
    size: number;
    startTime: string;
    endTime: string;
    systemCode: string;
}

export interface ICreateAppAccessLogPayload {
    appId: number;
    systemCode: string;
}
