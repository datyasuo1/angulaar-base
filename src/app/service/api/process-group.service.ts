import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface ProcessGroup {
    id: number;
    uuid: string;
    name: string;
    status: string;
    isSystem: boolean;
    processCount: number;
    created_at: string;
    updated_at: string;
}

export interface ProcessGroupsResponse {
    code: number;
    message: string;
    data: ProcessGroup[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class ProcessGroupService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL + '/configuration';

    getProcessGroups(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
    ): Observable<ProcessGroupsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<ProcessGroupsResponse>(
            `${this.baseUrl}/process-categories`,
            options,
        );
    }

    getComboBoxProcessGroups(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
    ): Observable<ProcessGroupsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<ProcessGroupsResponse>(
            `${this.baseUrl}/combo-box/process-categories`,
            options,
        );
    }

    deleteProcessGroup(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/process-categories/${id}`,
        );
    }

    addProcessGroup(name: string, status: string): Observable<CommonResponse> {
        const body = {
            name,
            status,
        };

        return this.http.post<CommonResponse>(
            `${this.baseUrl}/process-categories`,
            body,
        );
    }

    updateProcessGroup(
        id: number,
        name: string,
        status: string,
    ): Observable<CommonResponse> {
        const body = {
            name,
            status,
        };

        return this.http.put<CommonResponse>(
            `${this.baseUrl}/process-categories/${id}`,
            body,
        );
    }
}
