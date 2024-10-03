import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    BaseApiResponse,
    BasePagingApiResponse,
} from 'src/app/interface/common.interface';
import {
    IAddUpdateServerPayload,
    IAddUpdateVirtualMachinePayload,
    IGetServerPayload,
    IGetVirtualMachinePayload,
    IServerManagement,
    IServerStatus,
    IVirtualMachine,
} from 'src/app/interface/system-management/server-management.interface';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class ServerManagementService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getServerList(
        payload: IGetServerPayload,
    ): Observable<BasePagingApiResponse<IServerManagement>> {
        const url = `${this.baseUrl}/hpe/server-setting`;
        const options = this.mapApiParams(payload);

        return this.http.get<BasePagingApiResponse<IServerManagement>>(
            url,
            options,
        );
    }

    getServer(id: number): Observable<BaseApiResponse<IServerManagement>> {
        return this.http.get<BaseApiResponse<IServerManagement>>(
            `${this.baseUrl}/hpe/server-setting/${id}`,
        );
    }

    addServer(
        payload: IAddUpdateServerPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/server-setting`,
            payload,
        );
    }

    updateServer(
        id: number,
        payload: IAddUpdateServerPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.put<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/server-setting/${id}`,
            payload,
        );
    }

    removeServer(id: number): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/server-setting/${id}`,
        );
    }

    getServerStatus(): Observable<BaseApiResponse<IServerStatus[]>> {
        return this.http.get<BaseApiResponse<IServerStatus[]>>(
            `${this.baseUrl}/hpe/server-status`,
        );
    }

    getListVirtualMachine(
        payload: IGetVirtualMachinePayload,
    ): Observable<BaseApiResponse<IVirtualMachine[]>> {
        const url = `${this.baseUrl}/hpe/virtual-machine`;
        const options = this.mapApiParams(payload);

        return this.http.get<BaseApiResponse<IVirtualMachine[]>>(url, options);
    }

    addVirtualMachine(
        payload: IAddUpdateVirtualMachinePayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/virtual-machine`,
            payload,
        );
    }

    updateVirtualMachine(
        id: number,
        payload: IAddUpdateVirtualMachinePayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.put<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/virtual-machine/${id}`,
            payload,
        );
    }

    removeVirtualMachine(
        id: number,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/virtual-machine/${id}`,
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
