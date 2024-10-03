import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class VideoWallService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    listCameraLiveCms(
        page: number = -1,
        perPage: number = 1,
        address: string = '',
        name: string = '',
    ) {
        const options = {
            params: new HttpParams()
                .set('per_page', perPage)
                .set('page', page)
                .set('name', name)
                .set('address', address)
                .set('place_id', 507),
        };
        return this.http.get(`${this.baseURL}/tbl/camera-stream`, options);
    }
}
