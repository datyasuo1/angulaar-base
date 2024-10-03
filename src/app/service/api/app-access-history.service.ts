import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    IAppAccessHistory,
    ICreateAppAccessLogPayload,
    IGetAppAccessHistoryPayload,
} from 'src/app/interface/account/app-access-history';
import {
    BaseApiResponse,
    BasePagingApiResponse,
} from 'src/app/interface/common.interface';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class AppAccessHistoryService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getListAppAccessLogWeb(
        payload: IGetAppAccessHistoryPayload,
    ): Observable<BasePagingApiResponse<IAppAccessHistory>> {
        const url = `${this.baseUrl}/hpe/application-access-log`;
        const options = this.mapApiParams(payload);

        return this.http.get<BasePagingApiResponse<IAppAccessHistory>>(
            url,
            options,
        );
    }

    getListAppAccessLogMobile(
        payload: IGetAppAccessHistoryPayload,
    ): Observable<BasePagingApiResponse<IAppAccessHistory>> {
        const url = `${this.baseUrl}/hpe/application-access-log`;
        const options = this.mapApiParams(payload);

        return this.http.get<BasePagingApiResponse<IAppAccessHistory>>(
            url,
            options,
        );
    }

    createAppAccessLog(
        payload: ICreateAppAccessLogPayload,
    ): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/hpe/combo-box/application-access-log`,
            payload,
        );
    }

    mapApiParams(payload) {
        let params = new HttpParams();

        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, value as string);
            }
        });

        return { params };
    }
}
