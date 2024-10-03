import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    baseUrl = environment.baseURL;
    constructor(private http: HttpClient) {}

    uploadImage(formData: FormData): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/media/images/upload`,
            formData,
        );
    }

    uploadMultipleFiles(formData: FormData): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/media/multi-files/upload`,
            formData,
        );
    }
}
