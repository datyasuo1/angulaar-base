import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse } from 'src/app/interface/common.interface';
import {
    IAppVersion,
    ICreateAppVersionPayload,
} from 'src/app/interface/system-management/home-config';
import { environment } from 'src/environments/environment';
import { CommonResponse, Image } from '../common';

export interface HomeDashboard {
    id: number;
    appName: string;
    systemName: string | null;
    title: string;
    description: string;
    image: Image[];
    isShowDescription: boolean;
    wardCode: string | null;
    wardName: string | null;
    districtCode: string | null;
    districtName: string | null;
    provinceCode: string;
    provinceName: string;
    imageHost: string;
}

export interface HomeDashboardResponse {
    code: number;
    message: string;
    data: HomeDashboard;
}

export interface UpdateHomeDashboardRequestBody {
    appName?: string;
    systemName?: string;
    title?: string;
    description?: string;
    image?: string;
    isShowDescription?: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class HomeConfigService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL;

    getHomeDashboard(): Observable<HomeDashboardResponse> {
        return this.http.get<HomeDashboardResponse>(
            `${this.baseUrl}/configuration/home-dashboards`,
        );
    }

    getComboBoxHomeDashboard(): Observable<HomeDashboardResponse> {
        return this.http.get<HomeDashboardResponse>(
            `${this.baseUrl}/configuration/combo-box/home-dashboards`,
        );
    }

    updateHomeDashboard(
        data: UpdateHomeDashboardRequestBody,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/configuration/home-dashboards`,
            data,
        );
    }

    getAppVersions(): Observable<BaseApiResponse<IAppVersion[]>> {
        return this.http.get<BaseApiResponse<IAppVersion[]>>(
            `${this.baseUrl}/configuration/app-versions?page=-1&size=1`,
        );
    }

    addAppVersions(
        payload: ICreateAppVersionPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/configuration/app-versions`,
            payload,
        );
    }

    setCurrentAppVersions(
        id: number,
        payload: ICreateAppVersionPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.put<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/configuration/app-versions/${id}`,
            payload,
        );
    }

    removeAppVersions(id: number): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/configuration/app-versions/${id}`,
        );
    }
}
