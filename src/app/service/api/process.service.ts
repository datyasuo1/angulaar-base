import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Process {
    id: number;
    uuid: string;
    name: string;
    xml: string;
    description: string;
    processCategoryId: number;
    processCategoryName: string | null;
    created_by: string;
    createdById: string;
    updated_at: string;
    created_at: string;
    time: number;
}

export interface ProcessesResponse {
    code: number;
    message: string;
    data: Process[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class ProcessService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL + '/configuration';

    getProcesses(
        processCategoryId: number = -1,
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
    ): Observable<ProcessesResponse> {
        const options = {
            params: new HttpParams()
                .set('processCategoryId', processCategoryId)
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<ProcessesResponse>(
            `${this.baseUrl}/processes`,
            options,
        );
    }

    getComboBoxProcesses(
        processCategoryId: number = -1,
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
    ): Observable<ProcessesResponse> {
        const options = {
            params: new HttpParams()
                .set('processCategoryId', processCategoryId)
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<ProcessesResponse>(
            `${this.baseUrl}/combo-box/processes`,
            options,
        );
    }

    createProcess(
        name: string,
        description: string,
        processCategoryId: number,
        file: File,
    ): Observable<CommonResponse> {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('process_category_id', processCategoryId.toString());
        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseUrl}/processes`,
            formData,
        );
    }

    importFile(file: File, queue: number): Observable<CommonResponse> {
        const formData = new FormData();
        if (file) formData.append('file', file);
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/processes/import?queue=${queue}`,
            formData,
        );
    }

    deleteProcess(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/processes/${id}`,
        );
    }

    exportProcess(id: number) {
        return this.http.get(`${this.baseUrl}/processes/export/${id}`);
    }
}
