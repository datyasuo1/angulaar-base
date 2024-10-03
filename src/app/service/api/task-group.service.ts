import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    BaseApiResponse,
    BasePagingApiResponse,
} from 'src/app/interface/common.interface';
import {
    ICreateEditTaskGroupPayload,
    IGetTaskGroupPayload,
    ITaskGroup,
} from 'src/app/interface/system-management/task-group';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaskGroupService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getTaskGroupList(
        payload: IGetTaskGroupPayload,
    ): Observable<BasePagingApiResponse<ITaskGroup>> {
        const url = `${this.baseUrl}/hpe/combo-box/task-groups`;
        const options = this.mapApiParams(payload);

        return this.http.get<BasePagingApiResponse<ITaskGroup>>(url, options);
    }

    createTaskGroup(
        payload: ICreateEditTaskGroupPayload,
    ): Observable<BaseApiResponse<any>> {
        return this.http.post<BaseApiResponse<any>>(
            `${this.baseUrl}/hpe/task-groups`,
            payload,
        );
    }

    editTaskGroup(
        id: number,
        payload: ICreateEditTaskGroupPayload,
    ): Observable<BaseApiResponse<any>> {
        return this.http.put<BaseApiResponse<any>>(
            `${this.baseUrl}/hpe/task-groups/${id}`,
            payload,
        );
    }

    deleteTaskGroup(id: number): Observable<BaseApiResponse<any>> {
        return this.http.delete<BaseApiResponse<any>>(
            `${this.baseUrl}/hpe/task-groups/${id}`,
        );
    }

    mapApiParams(payload) {
        let params = new HttpParams();

        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, value as string);
            }
        });

        return { params };
    }
}
