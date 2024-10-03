import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface SpecialityProperty {
    name: string;
    type: string;
    value: string;
}

export interface Resource {
    id: number;
    name: string;
    resourceTypeId: number;
    resourceTypeName: string;
    phone: string;
    lat: number;
    lng: number;
    address: string;
    commonProperties: any[];
    specialityProperties: SpecialityProperty[];
    wardCode: string | null;
    wardName: string | null;
    districtCode: string;
    districtName: string;
    provinceCode: string;
    provinceName: string;
}

export interface ResourcesResponse {
    code: number;
    message: string;
    data: Resource[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}
export interface ResourceResponse {
    code: number;
    message: string;
    data: Resource;
}

@Injectable({
    providedIn: 'root',
})
export class ResourcesService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getResources(
        page: number,
        perPage: number,
        searchText: string,
        searchType: string,
        searchPlace: string = ',,',
    ): Observable<ResourcesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('type', searchType)
                .set('place', searchPlace),
        };
        return this.http.get<ResourcesResponse>(
            `${this.baseUrl}/rs/resources`,
            options,
        );
    }

    getResourceById(id: number): Observable<ResourceResponse> {
        return this.http.get<ResourceResponse>(
            `${this.baseUrl}/rs/resources/${id}`,
        );
    }

    createResources(data: any): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/rs/resources`,
            data,
        );
    }

    updateResources(data: any, id: number): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/rs/resources/${id}`,
            data,
        );
    }

    deleteResources(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/rs/resources/${id}`,
        );
    }

    uploadResources(file: File): Observable<CommonResponse> {
        const formData = new FormData();

        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseUrl}/rs/resources/import`,
            formData,
        );
    }

    downloadTemplate() {
        const options = {
            responseType: 'blob' as 'json',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get<any>(
            `${this.baseUrl}/rs/resources/template`,
            options,
        );
    }
}
