import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Feature {
    id: number;
    code: string;
    name: string;
    label: string;
    description: string;
    method: string;
    platform: string;
    apiPath: string;
    uiPath: string;
    type: string;
    categoryId: number;
    categoryCode: string;
    categoryName: string;
}

export interface FeaturesResponse {
    code: number;
    message: string;
    data: Feature[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface AddFeatureRequestBody {
    id?: number;
    code?: string;
    name?: string;
    method?: string;
    platform?: string;
    apiPath?: string;
    uiPath?: string;
    description?: string;
    permissionCategoryId?: number;
}

export interface UpdateFeatureRequestBody {
    id?: number;
    code?: string;
    name?: string;
    method?: string;
    platform?: string;
    apiPath?: string;
    uiPath?: string;
    description?: string;
    permissionCategoryId?: number;
}
@Injectable({
    providedIn: 'root',
})
export class FeatureService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL + '/usr';

    getFeatures(
        page: number,
        perPage: number,
        searchText: string,
        searchTextFeatureCode: string = '',
        categoryId: string,
    ): Observable<FeaturesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('code', searchTextFeatureCode)
                .set('categoryId', categoryId),
        };

        return this.http.get<FeaturesResponse>(
            `${this.baseUrl}/permissions`,
            options,
        );
    }

    deleteFeature(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/permissions/${id}`,
        );
    }

    addFeature(data: AddFeatureRequestBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/permissions`,
            data,
        );
    }

    updateFeature(
        data: UpdateFeatureRequestBody,
        id: number | null,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/permissions/${id}`,
            data,
        );
    }

    uploadFeatures(file: File): Observable<CommonResponse> {
        const formData = new FormData();

        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseUrl}/permissions/upload-excel`,
            formData,
        );
    }
}
