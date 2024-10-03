import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Vms {
    id: number;
    name: string;
    url: string;
    username: string;
    password: string;
    vmsCategoryId: number;
    vmsCategoryName: string;
    status: string;
    wardCode: string;
    wardName: string;
    districtCode: string;
    districtName: string;
    provinceCode: string;
    provinceName: string;
    isPublic: boolean;
}

export interface VmsesResponse {
    code: number;
    message: string;
    data: Vms[];
    totalElement: number;
}

export interface VmsResponse {
    code: number;
    message: string;
    data: Vms;
}

export interface VmsType {
    id: number;
    name: string;
}

export interface VmsTypesResponse {
    code: number;
    message: string;
    data: VmsType[];
    totalElement: number;
}

export interface AddVmsBody {
    id?: number;
    name: string;
    url: string;
    vmsCategoryId: number;
    status: string;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    username: string;
    password: string;
    isPublic: boolean;
    isActive?: boolean;
}

export interface UpdateVmsBody {
    id?: number;
    name: string;
    url: string;
    vmsCategoryId: number;
    status: string;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    username: string;
    password: string;
    isPublic: boolean;
    isActive?: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class VmsManagementService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getVmsManagements(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchType: string = '',
        searchStatus: string = '',
        searchPlaces: string = ',,',
    ): Observable<VmsesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('type', searchType)
                .set('status', searchStatus)
                .set('place', searchPlaces),
        };
        return this.http.get<VmsesResponse>(
            `${this.baseUrl}/configuration/vms`,
            options,
        );
    }

    getComboBoxVmsManagements(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchType: string = '',
        searchStatus: string = '',
        searchPlaces: string = ',,',
    ): Observable<VmsesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('type', searchType)
                .set('status', searchStatus)
                .set('place', searchPlaces),
        };
        return this.http.get<VmsesResponse>(
            `${this.baseUrl}/configuration/combo-box/vms`,
            options,
        );
    }

    getVmsManagementById(id: number): Observable<VmsResponse> {
        return this.http.get<VmsResponse>(
            `${this.baseUrl}/configuration/vms/${id}`,
        );
    }

    createVmsManagement(data: AddVmsBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/configuration/vms`,
            data,
        );
    }

    updateVmsManagement(
        data: UpdateVmsBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/configuration/vms/${id}`,
            data,
        );
    }

    getVmsType(
        page: number,
        perPage: number,
        searchText: string,
    ): Observable<VmsTypesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };
        return this.http.get<VmsTypesResponse>(
            `${this.baseUrl}/configuration/vms-categories`,
            options,
        );
    }

    deleteVmsManagement(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/configuration/vms/${id}`,
        );
    }
}
