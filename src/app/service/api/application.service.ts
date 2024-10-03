import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL;

    getSpecificGroupApplications(
        page: number = -1,
        size: number = 1,
        isWebVersion: boolean = true,
        groupId: string = '',
    ): Observable<any> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', size)
                .set('isWebVersion', isWebVersion)
                .set('groupId', groupId),
        };
        return this.http.get(
            `${this.baseUrl}/hpe/combo-box/application-resource/get-by-group`,
            options,
        );
    }

    getListApplications(
        name: string = '',
        page: number = -1,
        size: number = 1,
    ): Observable<any> {
        const options = {
            params: new HttpParams()
                .set('name', name)
                .set('page', page)
                .set('size', size)
                .set('isWebVersion', true),
        };
        return this.http.get(
            `${this.baseUrl}/hpe/combo-box/application-resource`,
            options,
        );
    }

    getListApplicationsByName(
        name: string = '',
        page: number = -1,
        size: number = 1,
    ): Observable<any> {
        const options = {
            params: new HttpParams()
                .set('name', name)
                .set('page', page)
                .set('size', size)
                .set('isWebVersion', true),
        };
        return this.http.get(
            `${this.baseUrl}/hpe/combo-box/application-resource/get-by-name`,
            options,
        );
    }

    getGroupApplication() {
        return this.http.get(`${this.baseUrl}/hpe/combo-box/group-application`);
    }
}
