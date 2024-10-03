import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface AffiliatedService {
    id: number;
    name: string;
    link: string;
    username: string | null;
    password: string | null;
    refreshTime: string | number | null;
    key: string | null;
    type: number | null;
    clientId: string | null;
    clientSecret: string | null;
    statusConnect: string;
    statusId: string;
    createdAt: string;
    createdName: string | null;
    updatedAt: string;
    updatedName: string | null;
    wardCode: string | null;
    wardName: string | null;
    districtCode: string | null;
    districtName: string | null;
    provinceCode: string;
    provinceName: string;
    systemTypeName: string | null;
}

export interface AffiliatedServicesResponse {
    code: number;
    message: string;
    data: AffiliatedService[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface AddAffiliatedServiceRequestBody {
    id?: number;
    name?: string;
    link?: string;
    statusConnect?: string;
    statusId?: string;
    username?: string;
    password?: string;
    refreshTime?: string;
    clientId?: string;
    clientSecret?: string;
    key?: string;
    type?: number;
    wardCode?: string;
    districtCode?: string;
    provinceCode?: string;
}

export interface UpdateAffiliatedServiceRequestBody {
    id?: number;
    name?: string;
    link?: string;
    statusConnect?: string;
    statusId?: string;
    username?: string;
    password?: string;
    refreshTime?: string;
    clientId?: string;
    clientSecret?: string;
    key?: string;
    type?: number;
    wardCode?: string;
    districtCode?: string;
    provinceCode?: string;
}

export interface Value {
    key: string;
    type: string;
    value: string;
}

export interface SystemType {
    id: number;
    type: string;
    label: string;
    value: Value[];
}

export interface SystemTypesResponse {
    code: number;
    message: string;
    data: SystemType[];
    totalElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class AffiliatedServiceListService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    getAffiliatedServiceList(
        page: number,
        perPage: number,
        searchText: string,
        place: string,
    ): Observable<AffiliatedServicesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place),
        };

        return this.http.get<AffiliatedServicesResponse>(
            `${this.baseURL}/configuration/link-service`,
            options,
        );
    }

    deleteAffiliatedService(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseURL}/configuration/link-service/${id}`,
        );
    }

    addAffiliatedService(
        data: AddAffiliatedServiceRequestBody,
    ): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseURL}/configuration/link-service`,
            data,
        );
    }

    updateAffiliatedService(
        id: number,
        data: UpdateAffiliatedServiceRequestBody,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseURL}/configuration/link-service/${id}`,
            data,
        );
    }

    getSystemType(): Observable<SystemTypesResponse> {
        const options = {
            params: new HttpParams().set('page', -1).set('size', 1),
        };

        return this.http.get<SystemTypesResponse>(
            `${this.baseURL}/configuration/system-type`,
            options,
        );
    }
}
