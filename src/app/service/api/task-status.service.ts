import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaskStatusService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    getTaskStatuss(
        page: number,
        perPage: number,
        searchText: string,
        orderBy: string,
    ) {
        const httpOptions = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('orderBy', orderBy),
        };

        return this.http.get(`${this.baseURL}/hpe/task-status`, httpOptions);
    }

    createTaskStatus(data: any) {
        return this.http.post(`${this.baseURL}/hpe/task-status`, data);
    }

    updateTaskStatus(data: any, id: number) {
        return this.http.put(`${this.baseURL}/hpe/task-status/${id}`, data);
    }

    deleteTaskStatus(id: number) {
        return this.http.delete(`${this.baseURL}/hpe/task-status/${id}`);
    }
}
