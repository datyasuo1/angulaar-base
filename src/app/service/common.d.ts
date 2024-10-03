export interface CommonResponse {
    code: number;
    message: string;
}

export interface CommonResponseData<T> extends CommonResponse {
    data?: T;
}

export interface Image {
    etag: string;
    name: string;
    path: string;
    fileName: string;
    versionId: string;
}
