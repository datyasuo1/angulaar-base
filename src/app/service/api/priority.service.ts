import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse, Image } from '../common';
import { BaseApiResponse } from 'src/app/interface/common.interface';
import { IAlarmPriority } from 'src/app/interface/category/alarm-priority.interface';

export interface Priority {
    id?: number;
    name?: string;
    icon?: Image;
    value?: number;
    colorCode?: string;
    createdAt?: string;
    createdBy?: string;
    createdByName?: string;
    imageHost?: string;
}

export interface PrioritiesResponse {
    code: number;
    message: string;
    data: Priority[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface CreatePriorityBody {
    name: string;
    value: string;
    colorCode: string;
    icon: string;
}

export interface UpdatePriorityBody {
    name: string;
    value: string;
    colorCode: string;
    icon: string;
}
@Injectable({
    providedIn: 'root',
})
export class PriorityService {
    constructor(private http: HttpClient) {}

    private baseURL = environment.baseURL;

    getPriorities(
        name: string = '',
        page: number = -1,
        size: number = 1,
    ): Observable<BaseApiResponse<IAlarmPriority[]>> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', size)
                .set('name', name),
        };
        return this.http.get<BaseApiResponse<IAlarmPriority[]>>(
            `${this.baseURL}/configuration/alarm-priorities`,
            options,
        );
    }

    getComboBoxPriorities(
        name: string = '',
        page: number = -1,
        size: number = 1,
    ): Observable<PrioritiesResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', size)
                .set('name', name),
        };
        return this.http.get<PrioritiesResponse>(
            `${this.baseURL}/configuration/combo-box/alarm-priorities`,
            options,
        );
    }

    addPriority(data: CreatePriorityBody): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseURL}/configuration/alarm-priorities`,
            data,
        );
    }

    updatePriority(
        id: number,
        data: UpdatePriorityBody,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseURL}/configuration/alarm-priorities/${id}`,
            data,
        );
    }

    deletePriority(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseURL}/configuration/alarm-priorities/${id}`,
        );
    }
}
