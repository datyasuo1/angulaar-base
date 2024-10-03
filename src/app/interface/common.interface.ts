export interface BasePagingApiResponse<T> {
    code: number;
    message: string;
    data: T[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface BaseApiResponse<T> {
    code: number;
    message: string;
    data: T;
    totalElement?: number;
}

export interface IUploadFileResponse {
    fileName: string;
    path: string;
    etag: string;
    versionId: string;
}

export interface IScreenBuilderInput {
    id: string;
    accessToken: string;
    isGroup: number;
    userId: string;
}
export interface IFileUpload {
    etag: string;
    fileName: string;
    path: string;
    versionId: string;
}
