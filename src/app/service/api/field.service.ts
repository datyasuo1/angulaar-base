import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Field {
    id: number;
    code: string;
    name: string;
    icon: string | null;
    range: string | null;
    resourceTypeIds: number[];
    wardCode: string | null;
    wardName: string | null;
    districtCode: string | null;
    districtName: string | null;
    provinceCode: string;
    provinceName: string;
    isPublic: boolean;
    imageHost: string;
    dashboardScreenId: string;
    hasAlert: number;
}

export interface FieldsResponse {
    code: number;
    message: string;
    data: Field[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface FieldResponse {
    code: number;
    data: Field;
    message: string;
}

export interface AddFieldRequestBody {
    id?: number;
    code?: string;
    name?: string;
    icon?: string;
    range?: number;
    wardCode?: string;
    districtCode?: string;
    provinceCode?: string;
    isPublic?: boolean;
    isIconDelete?: boolean;
    imageFile?: string;
    resourceTypeIds?: unknown[];
}

export interface UpdateFieldRequestBody {
    id?: number;
    code?: string;
    name?: string;
    icon?: string;
    range?: number;
    wardCode?: string;
    districtCode?: string;
    provinceCode?: string;
    isPublic?: boolean;
    isIconDelete?: boolean;
    imageFile?: string;
    resourceTypeIds?: unknown[];
}
@Injectable({
    providedIn: 'root',
})
export class FieldService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL;

    getFields(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchPlaces: string = ',,',
    ): Observable<FieldsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', searchPlaces),
        };
        return this.http.get<FieldsResponse>(
            `${this.baseUrl}/alm/fields`,
            options,
        );
    }

    getComboBoxFields(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchPlaces: string = ',,',
    ): Observable<FieldsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', searchPlaces),
        };
        return this.http.get<FieldsResponse>(
            `${this.baseUrl}/alm/combo-box/fields`,
            options,
        );
    }

    getFieldById(id: number): Observable<FieldResponse> {
        return this.http.get<FieldResponse>(`${this.baseUrl}/alm/fields/${id}`);
    }

    createField(data: AddFieldRequestBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/alm/fields`,
            data,
        );
    }

    updateField(
        data: UpdateFieldRequestBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/alm/fields/${id}`,
            data,
        );
    }

    deleteField(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/alm/fields/${id}`,
        );
    }
}
