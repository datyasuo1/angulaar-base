import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import {
    BaseApiResponse,
    BasePagingApiResponse,
} from 'src/app/interface/common.interface';
import {
    IAddDocumentPayload,
    IDocument,
    IDocumentDetail,
    IGetListDocumentPayload,
    ISignConfirmPayload,
    ISignDocumentPayload,
    ISignDocumentResult,
    ISignature,
} from 'src/app/interface/utility/document';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getListDocument(
        payload: IGetListDocumentPayload,
    ): Observable<BasePagingApiResponse<IDocument>> {
        let params = new HttpParams();

        Object.entries(payload).forEach(([key, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                (typeof value !== 'number' || !isNaN(value))
            ) {
                params = params.set(key, value);
            }
        });

        const url = `${this.baseUrl}/hpe/documents`;
        const options = { params };

        return this.http.get<BasePagingApiResponse<IDocument>>(url, options);
    }

    getDocumentById(id: number): Observable<BaseApiResponse<IDocumentDetail>> {
        return this.http.get<BaseApiResponse<IDocumentDetail>>(
            `${this.baseUrl}/hpe/documents/web/${id}`,
        );
    }

    getAllSignature(): Observable<BaseApiResponse<ISignature[]>> {
        return this.http.get<BaseApiResponse<ISignature[]>>(
            `${this.baseUrl}/hpe/digitalSignatures/?page=-1&size=1`,
        );
    }

    addDocument(
        payload: IAddDocumentPayload,
    ): Observable<BaseApiResponse<ISignature[]>> {
        return this.http.post<BaseApiResponse<ISignature[]>>(
            `${this.baseUrl}/hpe/documents`,
            payload,
        );
    }

    deleteDocument(id: number): Observable<BaseApiResponse<ISignature[]>> {
        return this.http.delete<BaseApiResponse<ISignature[]>>(
            `${this.baseUrl}/hpe/documents?documentId=${id}`,
        );
    }

    signDocument(
        payload: ISignDocumentPayload,
    ): Observable<BaseApiResponse<ISignDocumentResult>> {
        //hardcode userID để lấy OTP cho chức năng ký số, remove sau khi BE update
        const headers = new HttpHeaders({
            userID: '090909000999',
        });

        return this.http.post<BaseApiResponse<ISignDocumentResult>>(
            `${this.baseUrl}/hpe/digitalSignatures/sign-document-hash`,
            payload,
            { headers: headers },
        );
    }

    confirmSignDocument(
        payload: ISignConfirmPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        const headers = new HttpHeaders({
            userID: '090909000999',
        });

        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/digitalSignatures/sign-confirm`,
            payload,
            { headers: headers },
        );
    }
}
