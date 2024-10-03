import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    BaseApiResponse,
    BasePagingApiResponse,
} from 'src/app/interface/common.interface';
import {
    IAddUpdateDeployedSystemPayload,
    IDeployedSystem,
    IGetDeployedSystemPayload,
} from 'src/app/interface/system-management/deployed-system-management.interface';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class DeployedSystemService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getListSystem(
        payload: IGetDeployedSystemPayload,
    ): Observable<BasePagingApiResponse<IDeployedSystem>> {
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

        const url = `${this.baseUrl}/hpe/software-server`;
        const options = { params };

        return this.http.get<BasePagingApiResponse<IDeployedSystem>>(
            url,
            options,
        );
    }

    getSystem(id: number): Observable<BaseApiResponse<IDeployedSystem>> {
        return this.http.get<BaseApiResponse<IDeployedSystem>>(
            `${this.baseUrl}/hpe/software-server/${id}`,
        );
    }

    addSystem(
        payload: IAddUpdateDeployedSystemPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/software-server`,
            payload,
        );
    }

    updateSystem(
        id: number,
        payload: IAddUpdateDeployedSystemPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.put<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/software-server/${id}`,
            payload,
        );
    }

    removeSystem(id: number): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/software-server/${id}`,
        );
    }
}
