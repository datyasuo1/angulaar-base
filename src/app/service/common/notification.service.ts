import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Notification {
    id: number;
    subject: string;
    content: string;
    image: string;
    soundNotification: string;
    data: Record<string, unknown>;
    isRead: boolean;
    createdAt: string;
}

export interface NotificationsResponse {
    code: number;
    message: string;
    data: Notification[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
    totalUnreadElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.baseURL;

    getNotifications(
        page: number,
        perPage: number = 10,
    ): Observable<NotificationsResponse> {
        const options = {
            params: new HttpParams().set('page', page).set('size', perPage),
        };

        return this.http.get<NotificationsResponse>(
            `${this.baseUrl}/ntf/notification`,
            options,
        );
    }

    updateNotification(id: string): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/ntf/notification/${id}`,
            {},
        );
    }

    saveRegistrationTokens(token: string): Observable<CommonResponse> {
        const tokens = [];
        tokens.push(token);
        const body = { firebaseRegistrations: tokens };
        return this.http.post<CommonResponse>(
            `${this.baseUrl}/ntf/notification/registration-tokens`,
            body,
        );
    }

    readAll(): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/ntf/notification`,
            {},
        );
    }
}
