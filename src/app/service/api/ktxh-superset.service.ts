import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class KtxhSupersetService {
    private baseURLv4 = environment.supersetURL + '/api/v1/security';

    constructor(private http: HttpClient) {}

    createSecurityLogin(
        username: string,
        password: string,
        provider: string,
        refresh: boolean,
    ) {
        const body = {
            username,
            password,
            provider,
            refresh,
        };
        return this.http.post(`${this.baseURLv4}/login`, body);
    }

    getSecurityCSRF(token: string) {
        // const reqHeader = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     Authorization: 'Bearer ' + token,
        // });
        // return this.http.get(`${this.baseURLv4}/csrf_token/`, { headers: reqHeader });
        return of(null);
    }

    createGuestToken(token: string, csrf_token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            'X-CSRF-TOKEN': csrf_token,
        });
        const body = {
            resources: [
                {
                    id: '954d6e0e-6262-439b-9f59-9066310c5b6f',
                    type: 'dashboard',
                },
            ],
            rls: [],
            user: {
                first_name: 'string',
                last_name: 'string',
                username: 'admin',
            },
        };
        // return this.http.post(`${this.baseURLv4}/guest_token/`, body, {
        //     headers: headers,
        // });
        return of(null);
    }
}
