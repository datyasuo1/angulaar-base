import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WarningMapService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    listProcessRequest(
        page: number,
        perPage: number,
        searchText: string,
        statusFilter: string,
    ): Observable<any> {
        const params = new HttpParams()
            .set('page', page)
            .set('size', perPage)
            .set('title', searchText)
            .set('statusFilter', statusFilter);

        return this.http.get(`${this.baseUrl}/alm/alarms-on-map`, {
            params,
        });
    }

    listResource(page: number, perPage: number): Observable<any> {
        const optionsResource = {
            params: new HttpParams().set('page', page).set('size', perPage),
        };

        return this.http.get(
            `${this.baseUrl}/rs/resources-on-map`,
            optionsResource,
        );
    }

    listResourceByRange(
        page: number,
        perPage: number,
        issueId: number,
        rangeMeters: number,
    ): Observable<any> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('', issueId)
                .set('', rangeMeters),
        };

        return this.http.get(`${this.baseUrl}/rs/resources-on-map`, options);
    }

    listCountStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/alm/alarms/status`);
    }

    listFields(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        searchPlaces: string = ', ,',
    ): Observable<any> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('place', searchPlaces),
        };
        return this.http.get(`${this.baseUrl}/alm/fields`, options);
    }

    getCamreSourceCms(resourceId: string): Observable<any> {
        return this.http.get(
            `${this.baseUrl}/get-camera-resources-cms/streaming/${resourceId}`,
        );
    }

    getPrioritiest(): Observable<any> {
        return this.http.get(
            `${this.baseUrl}/configuration/alarm-priorities?name=%22%20%22&page=-1&size=99999999`,
        );
    }
}
