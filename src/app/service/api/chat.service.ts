import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface loginChatBody {
    serviceName: string;
    accessToken: string;
    expiresIn: number;
}
export interface createChatRoomBody {
    alarmId: string;
    discussionName: string;
    parentRoomId: string;
    memberEmails: string[];
}
@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private http: HttpClient) {}

    chatUrl = environment.appChatURL;

    baseUrl = environment.baseURL;

    loginChat(body: loginChatBody): Observable<any> {
        return this.http.post<any>(`${this.chatUrl}/api/v1/login`, body);
    }

    createChatRoom(body: createChatRoomBody): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}/alm/alarms/alarm-discussions`,
            body,
        );
    }
}
