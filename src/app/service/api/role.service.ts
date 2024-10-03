import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Role {
    id: number;
    code: string;
    name: string;
    description: string | null;
    type: string;
}

export interface RolesResponse {
    code: number;
    message: string;
    data: Role[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL + '/usr';

    getRoles(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        type: string = '',
    ): Observable<RolesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('type', type),
        };

        return this.http.get<RolesResponse>(`${this.baseUrl}/roles`, options);
    }

    createRole(data: any): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(`${this.baseUrl}/roles`, data);
    }

    updateRole(data: any, id: number): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/roles/${id}`,
            data,
        );
    }

    getComboBoxRoles(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        type: string = '',
    ): Observable<RolesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('type', type),
        };

        return this.http.get<RolesResponse>(
            `${this.baseUrl}/combo-box/roles`,
            options,
        );
    }

    getRoleById(id: number) {
        return this.http.get(`${this.baseUrl}/roles/${id}`);
    }

    deleteRole(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(`${this.baseUrl}/roles/${id}`);
    }
}
