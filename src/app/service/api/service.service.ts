import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class ServiceService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL;

    exportReport(filterStr: string) {
        const options = {
            responseType: 'blob' as 'json',
            headers: new HttpHeaders({
                'Content-Type':
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            }),
        };

        return this.http.get(
            `${this.baseUrl}/alm/alarms/export?filter=${filterStr}`,
            options,
        );
    }

    getWarningList(page: number, size: number, filterStr: string) {
        return this.http.get(
            `${this.baseUrl}/alm/alarms?filter=${filterStr}&size=${size}&page=${page}`,
        );
    }

    getAlarmDetail(id: string) {
        return this.http.get(`${this.baseUrl}/alm/alarms/${id}`);
    }

    getStatusList() {
        return this.http.get(`${this.baseUrl}/rs/public-services/count-status`);
    }

    getStatusProcess(filterStr: string) {
        return this.http.get(
            `${this.baseUrl}/alm/alarms/count-status?filter=${filterStr}`,
        );
    }

    createAlert(data: any): Observable<CommonResponse> {
        const body = { ...data };
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/alm/alarms`,
            body,
        );
    }

    getProcessByPriorityIdAndFieldId(fieldId: number, priorityId: string) {
        const options = {
            params: new HttpParams()
                .set('page', -1)
                .set('size', 1)
                .set('fieldId', fieldId)
                .set('priorityId', priorityId),
        };
        return this.http.get(
            `${this.baseUrl}/configuration/config-routing`,
            options,
        );
    }
}
