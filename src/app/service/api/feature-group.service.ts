import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface FeatureGroup {
    id: number;
    code: string;
    name: string;
    description: string | null;
    type: string;
    label: string;
    platform: string;
    image: object;
    index: number;
    routerLink: string;
    icon: string | null;
    parentId: number | null;
    parentName: string | null;
    children?: FeatureGroup[];
    draggable?: boolean;
    droppable?: boolean;
}

export interface FeatureGroupsResponse {
    code: number;
    message: string;
    data: FeatureGroup[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface AddFeatureGroupRequestBody {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    platform?: string;
    menuLabel?: string;
    menuRouterLink?: string;
    menuIcon?: string;
    parentId?: number;
    index?: number;
}

export interface UpdateFeatureGroupRequestBody {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    platform?: string;
    menuLabel?: string;
    menuRouterLink?: string;
    menuIcon?: string;
    parentId?: number;
    index?: number;
}
@Injectable({
    providedIn: 'root',
})
export class FeatureGroupService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL + '/usr';

    getFeatureGroups(
        getTree: boolean = false,
        getUserTree: boolean = false,
        userTreeId: string = '',
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchTextFeatureCode: string = '',
        parentId: string = '',
    ): Observable<FeatureGroupsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('code', searchTextFeatureCode)
                .set('parentId', parentId)
                .set('getTree', getTree)
                .set('getUserTree', getUserTree)
                .set('userTreeId', userTreeId),
        };

        return this.http.get<FeatureGroupsResponse>(
            `${this.baseUrl}/permission-categories`,
            options,
        );
    }

    deleteFeatureGroup(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/permission-categories/${id}`,
        );
    }

    addFeatureGroup(
        data: AddFeatureGroupRequestBody,
    ): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/permission-categories`,
            data,
        );
    }

    updateFeatureGroup(
        data: UpdateFeatureGroupRequestBody,
        id: number | null,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/permission-categories/${id}`,
            data,
        );
    }

    uploadFeatureGroup(file: File): Observable<CommonResponse> {
        const formData = new FormData();

        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseUrl}/permission-categories/upload-excel`,
            formData,
        );
    }
}
