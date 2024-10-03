import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface LoginEvent {
    id: number;
    eventType: string;
    ssoId: string;
    client: string;
    agent: string;
    os: string;
    browser: string;
    deviceType: string;
    ip: string;
    location: string;
    loginTime: string;
    logoutTime: string | null;
    lastAccess: string;
}

export interface LoginHistoryResponse {
    code: number;
    message: string;
    data: LoginEvent[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface DeviceActivity {
    expires: string;
    os: string;
    ipAddress: string;
    mobile: boolean;
    started: string;
    lastAccess: string;
    sessionId: string;
    current: boolean;
    osVersion: string;
    browser: string;
    sortOrder: number;
    device: string;
    representative: string;
}

export interface DeviceActivityResponse {
    code: number;
    message: string;
    data: DeviceActivity[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class LoginHistoryService {
    private cityOSURL = environment.cityOSURL;
    constructor(private http: HttpClient) {}

    getDeviceActivity(
        page: number = -1,
        size: number = 1,
    ): Observable<DeviceActivityResponse> {
        const options = {
            params: new HttpParams().set('page', page).set('size', size),
        };
        return this.http.get<DeviceActivityResponse>(
            `${this.cityOSURL}/usr/auth/device-activity`,
            options,
        );
    }

    getLogRequests(
        page: number = -1,
        size: number = 1,
    ): Observable<LoginHistoryResponse> {
        const options = {
            params: new HttpParams().set('page', page).set('size', size),
        };
        return this.http.get<LoginHistoryResponse>(
            `${this.cityOSURL}/usr/log-requests`,
            options,
        );
    }

    signOutAll(): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.cityOSURL}/usr/auth/logout-all-device`,
            {},
        );
    }

    signOut(id: string): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.cityOSURL}/usr/auth/logout-session/${id}`,
            {},
        );
    }
}
