export interface IAlarmPriority {
    id: number;
    name: string;
    icon?: Icon;
    value?: number;
    colorCode?: string;
    createdAt?: string;
    createdBy?: string;
    createdByName?: string;
    imageHost?: string;
}

export interface Icon {
    fileName: string;
    path: string;
    etag: string;
    versionId: string;
}
