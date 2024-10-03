import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface AutoConfiguration {
    id: number;
    masterProcessId: number;
    masterProcessName: string;
    fieldId: number;
    fieldName: string;
    priorityId: number;
    priorityName: string;
    durationTime: null | number;
    status: boolean;
    time: number;
}

export interface AutoConfigurationsResponse {
    code: number;
    message: string;
    data: AutoConfiguration[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface CreateConfigurationRequestBody {
    processId: number;
    fieldId: number;
    priorityId: number;
}

export interface UpdateConfigurationRequestBody {
    processId: number;
    fieldId: number;
    priorityId: number;
}

@Injectable({
    providedIn: 'root',
})
export class AutoConfigurationService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getAutoConfigServiceList(
        page: number,
        perPage: number,
        searchText: string,
    ): Observable<AutoConfigurationsResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<AutoConfigurationsResponse>(
            `${this.baseUrl}/configuration/config-routing`,
            options,
        );
    }

    createConfiguration(
        data: CreateConfigurationRequestBody,
    ): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/configuration/config-routing`,
            data,
        );
    }

    updateConfiguration(
        data: UpdateConfigurationRequestBody,
        id: number,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/configuration/config-routing/${id}`,
            data,
        );
    }

    deleteConfiguration(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/configuration/config-routing/${id}`,
        );
    }
}
