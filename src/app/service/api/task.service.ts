import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkflowStatus } from 'src/app/interface/category/workflow-status.interface';
import { IWorkFlowType } from 'src/app/interface/category/workflow-type.interface';
import {
    BaseApiResponse,
    BasePagingApiResponse,
} from 'src/app/interface/common.interface';
import { ITaskDetail } from 'src/app/interface/task/task-detail.interface';
import {
    ICreateTaskPayload,
    IGetTaskPayload,
    ITask,
} from 'src/app/interface/task/task.interface';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.baseURL;

    getListTasks(
        payload: IGetTaskPayload,
    ): Observable<BasePagingApiResponse<ITask>> {
        let params = new HttpParams();

        Object.entries(payload).forEach(([key, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                (typeof value !== 'number' || !isNaN(value))
            ) {
                params = params.set(key, value);
            }
        });

        const url = `${this.baseUrl}/hpe/task-process`;
        const options = { params };

        return this.http.get<BasePagingApiResponse<ITask>>(url, options);
    }

    getTaskDetail(
        id: string,
        isGroup: number,
    ): Observable<BaseApiResponse<ITaskDetail>> {
        return this.http.get<BaseApiResponse<ITaskDetail>>(
            `${this.baseUrl}/hpe/task-process/${id}?isGroup=${isGroup}`,
        );
    }

    getComboBoxWorkflowTypes(): Observable<BaseApiResponse<IWorkFlowType[]>> {
        return this.http.get<BaseApiResponse<IWorkFlowType[]>>(
            `${this.baseUrl}/hpe/combo-box/task-types`,
        );
    }

    getComboBoxWorkflowStatus(
        isGroup: number = 0,
    ): Observable<BaseApiResponse<IWorkflowStatus[]>> {
        let params = new HttpParams();
        params = params.set('isGroup', isGroup);

        const options = {
            params: params,
        };
        return this.http.get<BaseApiResponse<IWorkflowStatus[]>>(
            `${this.baseUrl}/hpe/combo-box/task-process/workflow-status`,
            options,
        );
    }

    createNewTask(payload: ICreateTaskPayload): Observable<any> {
        return this.http.post(`${this.baseUrl}/hpe/task-process`, payload);
    }

    assignTask(taskId: string): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/task-process/assign/${taskId}`,
            {},
        );
    }
}
