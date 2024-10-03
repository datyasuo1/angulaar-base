import { IUploadFileResponse } from '../common.interface';

export interface IDocument {
    id: number;
    path: IUploadFileResponse;
    folderId?: number;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
    isFavorite: boolean;
    shareToUser?: IShareToUser[];
    imageHost: string;
}

export interface IShareToUser {
    time: string;
    userId: number;
}

export interface IGetListDocumentPayload {
    name: string;
    folderId: string;
    mode: number;
    page: number;
    size: number;
}

export interface ISignature {
    id: number;
    name: string;
    path: IUploadFileResponse;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
    imageHost: string;
    isDefault: boolean;
}

export interface ISignDocumentPayload {
    documentId: number;
    options: ISignDocumentOption;
}

export interface ISignDocumentResult {
    status: number;
    tranId: string;
    userId: string;
    createTime: string;
    updateTime: string;
    certId: string;
    authMode: number;
    data: IDocumentResult[];
}

export interface IDocumentResult {
    signedData: any;
    fileName: string;
    data: any;
    docId: string;
    type: string;
    status: number;
    options: any;
}

export interface ISignConfirmPayload {
    tranId: string;
    password: string;
    authMode: 0;
    otp: number;
}

export interface ISignDocumentOption {
    signPage: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ISignatureProperties {
    dx: number;
    dy: number;
    height: number;
    isSigned: false;
    page: number;
    positionX: number;
    positionY: number;
    signatureType: number;
    width: number;
}
export interface IAddDocumentPayload {
    path: string;
}

export interface IPdfProperties {
    fileBase64: string;
    height: number;
    page: number;
    width: number;
    signatureSettings: ISignatureProperties[];
}

export interface IDocumentDetail {
    data: string;
    fileName: string;
}
