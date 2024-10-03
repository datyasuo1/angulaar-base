import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Dashboard {
    createdAt: string;
    createdBy: string | null;
    dashboardUrl: string;
    deviceType: number;
    displayMenuName: string;
    districtCode: string | null;
    districtName: string | null;
    fieldId: string | null;
    id: number;
    isActive: boolean;
    isDelete: boolean;
    name: string;
    provinceCode: string | null;
    provinceName: string | null;
    updatedAt: string;
    updatedBy: string | null;
    wardCode: string | null;
    wardName: string | null;
}

export interface Agency {
    id: number;
    name: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    parentId: null;
    description: string;
    wardCode: string | null;
    wardName: string | null;
    districtCode: string;
    districtName: string;
    provinceCode: string;
    provinceName: string;
    isActive: boolean;
    isDelete: boolean;
}

export interface DashboardConfig {
    id: number;
    configName: string;
    createdAt: string;
    createdName: string;
    updatedAt: string;
    updatedBy: string | null;
    isActive: boolean;
    isDelete: boolean;
    dashboards: Dashboard[];
    agencies: Agency[];
    imageHost: string;
}

export interface DashboardConfigsResponse {
    code: number;
    message: string;
    data: DashboardConfig[];
    totalElement: number;
    page: number;
    pageSize: number;
    totalPage: number;
}

export interface DashboardConfigResponse {
    code: number;
    message: string;
    data: DashboardConfig;
}

export interface DashboardService {
    id: number;
    dashboardUrl: string;
    name: string;
    displayMenuName: string;
    fieldId: string | null;
    wardCode: string | null;
    wardName: string | null;
    districtCode: string | null;
    districtName: string | null;
    provinceCode: string | null;
    provinceName: string | null;
    createdAt: string;
    createdName: string | null;
    updatedAt: string;
    updataedName: string | null;
    isActive: boolean;
    isDelete: boolean;
    deviceType: number;
}

export interface DashboardServicesResponse {
    code: number;
    message: string;
    totalElementCount: number;
    data: DashboardService[];
}

export interface AddDashboardConfigRequestBody {
    configName: string;
    dashboards: number[];
    agencies: number[];
}

export interface UpdateDashboardConfigRequestBody {
    configName: string;
    dashboards: number[];
    agencies: number[];
}
@Injectable({
    providedIn: 'root',
})
export class DashboardConfigService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getDashboardConfigServiceList(
        page: number,
        perPage: number,
        searchText: string,
        searchType: number,
    ): Observable<DashboardConfigsResponse> {
        let params = new HttpParams()
            .set('page', page)
            .set('size', perPage)
            .set('name', searchText);

        if (searchType !== undefined) {
            params = params.set('idDashboardConfig', searchType);
        }

        return this.http.get<DashboardConfigsResponse>(
            `${this.baseUrl}/configuration/dashboard-config`,
            {
                params,
            },
        );
    }

    getDashboardConfigById(id: number): Observable<DashboardConfigResponse> {
        return this.http.get<DashboardConfigResponse>(
            `${this.baseUrl}/configuration/dashboard-config/${id}`,
        );
    }

    getDashboardServices(
        page: number,
        perPage: number,
    ): Observable<DashboardServicesResponse> {
        const options = {
            params: new HttpParams().set('page', page).set('size', perPage),
        };
        return this.http.get<DashboardServicesResponse>(
            `${this.baseUrl}/configuration/dashboards`,
            options,
        );
    }

    createDashboardConfig(
        data: AddDashboardConfigRequestBody,
    ): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/configuration/dashboard-config`,
            { ...data },
        );
    }

    updateDashboardConfig(
        data: UpdateDashboardConfigRequestBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/configuration/dashboard-config/${id}`,
            data,
        );
    }

    deleteDashboardConfig(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/configuration/dashboard-config/${id}`,
        );
    }
}
