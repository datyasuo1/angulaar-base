import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface ValueType {
    code: string;
    value: string;
}
export interface CommonPropertyResourceType {
    name?: string;
    type?: string;
    required?: boolean;
    valueType?: ValueType | string;
    errorValueType?: string;
    errorPropertiesName?: string;
}

export interface ResourceType {
    id: number;
    name: string;
    activeImage: string;
    passiveImage: string | null;
    type: string;
    isDefaultOnMap: number;
    commonProperties: CommonPropertyResourceType[];
    vmsId: number;
    isPublic: number;
    wardCode: string;
    wardName: string;
    districtCode: string;
    districtName: string;
    provinceCode: string;
    provinceName: string;
    imageHost: string;
}

export interface ResourceTypesResponse {
    code: number;
    message: string;
    data: ResourceType[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface ResourceTypeResponse {
    code: number;
    message: string;
    data: ResourceType;
}

export interface AddResourceTypeBody {
    id: number;
    name: string;
    activeImage: string;
    passiveImage: string;
    type: string;
    isDefaultOnMap: boolean;
    vmsId: number;
    isPublic: boolean;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    isActiveImageDelete: boolean;
    isPassiveImageDelete: boolean;
    commonProperties: CommonPropertyResourceType[];
}

export interface UpdateResourceTypeBody {
    id: number;
    name: string;
    activeImage: string;
    passiveImage: string;
    type: string;
    isDefaultOnMap: boolean;
    vmsId: number;
    isPublic: boolean;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    isActiveImageDelete: boolean;
    isPassiveImageDelete: boolean;
    commonProperties: CommonPropertyResourceType[];
}

@Injectable({
    providedIn: 'root',
})
export class ResourcesTypeService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL;

    getResourceTypes(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchPlace: string = ',,',
        type: string = '',
    ): Observable<ResourceTypesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', searchPlace)
                .set('type', type),
        };
        return this.http.get<ResourceTypesResponse>(
            `${this.baseUrl}/rs/resource-types`,
            options,
        );
    }

    getComboBoxResourceTypes(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchPlace: string = ',,',
        type: string = '',
    ): Observable<ResourceTypesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', searchPlace)
                .set('type', type),
        };
        return this.http.get<ResourceTypesResponse>(
            `${this.baseUrl}/rs/combo-box/resource-types`,
            options,
        );
    }

    getResourceTypeById(id: number): Observable<ResourceTypeResponse> {
        return this.http.get<ResourceTypeResponse>(
            `${this.baseUrl}/rs/resource-types/${id}`,
        );
    }

    createResourceTypes(data: AddResourceTypeBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/rs/resource-types`,
            data,
        );
    }

    updateResourceTypes(
        data: UpdateResourceTypeBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/rs/resource-types/${id}`,
            data,
        );
    }

    deleteResourceTypes(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/rs/resource-types/${id}`,
        );
    }
}
