import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class VisitStatisticsService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    getVisitStatistics(
        startTime: string,
        endTime: string,
        page: number,
        perPage: number,
    ) {
        const options = {
            params: new HttpParams()
                .set('startTime', startTime)
                .set('endTime', endTime)
                .set('page', page)
                .set('size', perPage),
        };

        return this.http.get(`${this.baseURL}/rs/visits-statistics`, options);
    }
}
