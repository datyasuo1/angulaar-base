import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { encryptRSA } from 'src/app/utils/encrypt';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private baseURL = environment.baseURL + '/usr/auth';
    private appChatURL = environment.appChatURL + '/api/v1';

    login(
        username: string,
        password: string,
        domain: string,
    ): Observable<CommonResponse> {
        const encryptedPassword = encryptRSA(password);

        const body = {
            username,
            password: encryptedPassword,
            domain,
        };

        return this.http.post<CommonResponse>(`${this.baseURL}/login`, body);
    }

    loginAppChat(token: string): Observable<any> {
        const body = {
            serviceName: 'keycloakhaiphong',
            accessToken: token || localStorage.getItem('accessToken'),
            expiresIn: 5000,
        };

        return this.http.post<any>(`${this.appChatURL}/login`, body);
    }
}
