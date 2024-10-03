import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface DepartmentField {
    id: number;
    name: string;
}

export interface DepartmentTree {
    id?: number;
    name?: string;
    description?: string;
    parentId?: number;
    parentName?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    wardCode?: string | null;
    wardName?: string | null;
    districtCode?: string;
    districtName?: string;
    provinceCode?: string;
    provinceName?: string;
    agencyFields?: DepartmentField[];
    children?: DepartmentTree[];
}

export interface DepartmentResponse {
    code: number;
    data: DepartmentTree;
    message: string;
}
export interface DepartmentsResponse {
    code: number;
    data: DepartmentTree[];
    message: string;
    page: number;
    pageSize: number;
    totalElement: number;
    totalPage: number;
}
export interface AddDepartmentRequestBody {
    id?: number;
    name: string;
    description?: string;
    parentId?: number;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
}

export interface UpdateDepartmentRequestBody {
    id?: number;
    name: string;
    description?: string;
    parentId?: number;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
}

export interface AddFieldsToDepartmentRequestBody {
    id?: number;
    agencyId?: number;
    fieldIds?: number[];
}
@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getAgencies(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        place: string = ',,',
        tree: boolean = false,
    ): Observable<DepartmentsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place)
                .set('getTree', tree),
        };
        return this.http.get<DepartmentsResponse>(
            `${this.baseUrl}/rs/agencies`,
            options,
        );
    }

    getComboBoxAgencies(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        place: string = ',,',
        tree: boolean = false,
    ): Observable<DepartmentsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', place)
                .set('getTree', tree),
        };
        return this.http.get<DepartmentsResponse>(
            `${this.baseUrl}/rs/combo-box/agencies`,
            options,
        );
    }

    getDepartmentById(id: number): Observable<DepartmentResponse> {
        return this.http.get<DepartmentResponse>(
            `${this.baseUrl}/rs/agencies/${id}`,
        );
    }

    createDepartment(
        data: AddDepartmentRequestBody,
    ): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/rs/agencies`,
            data,
        );
    }

    updateDepartment(
        data: UpdateDepartmentRequestBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/rs/agencies/${id}`,
            data,
        );
    }

    deleteDepartment(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/rs/agencies/${id}`,
        );
    }

    addFieldsToDepartment(
        data: AddFieldsToDepartmentRequestBody,
        id: string,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/alm/agency-fields/${id}`,
            data,
        );
    }
}
