export interface IAppVersion {
    id: number;
    version: string;
    description: string;
    isCurrent: number;
    createdAt: string;
    createdBy: number;
    createdByName: string;
}

export interface ICreateAppVersionPayload {
    version: string;
    description: string;
    isCurrent: boolean;
}
