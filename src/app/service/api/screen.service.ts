import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
export interface Screen {
    id: number;
    uuid: string;
    title: string;
    description: string;
    appId: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string | null;
    deletedBy: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface ScreensResponse {
    code: number;
    message: string;
    data: Screen[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class ScreenService {
    constructor(
        private http: HttpClient,
        private keycloakService: KeycloakService,
    ) {}

    private baseUrl = environment.baseURL + '/configuration';

    private screenBuilderUrl = environment.screenBuilderURL;

    getScreens(
        page: number,
        perPage: number,
        searchText: string,
    ): Observable<ScreensResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<ScreensResponse>(
            `${this.baseUrl}/screens`,
            options,
        );
    }

    getComboBoxScreens(
        page: number,
        perPage: number,
        searchText: string,
    ): Observable<ScreensResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText),
        };

        return this.http.get<ScreensResponse>(
            `${this.baseUrl}/combo-box/screens`,
            options,
        );
    }

    deleteScreen(id: string): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/screens/${id}`,
        );
    }

    addScreen(description: string, title: string): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(`${this.baseUrl}/screens`, {
            description,
            title,
        });
    }

    copyScreen(
        appId: string,
        description: string,
        title: string,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/screens/${appId}/duplicate`,
            {
                description,
                title,
            },
        );
    }
    exportScreen(appId: string) {
        return this.http.get(`${this.baseUrl}/screens/export/${appId}`);
    }

    uploadScreen(file: File): Observable<CommonResponse> {
        const formData = new FormData();

        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseUrl}/screens/import`,
            formData,
        );
    }

    // loginScreenBuilder():Observable<CommonResponse> {
    //     return this.http.post<CommonResponse>(
    //         `${this.screenBuilderUrl}/api/auth/form/login`,
    //         {
    //             loginId: 'ioc_admin@gmail.com',
    //             password: 'Demo@123',
    //             register: 'false',
    //             source: 'EMAIL',
    //             authId: 'EMAIL',
    //         },
    //         { withCredentials: true },
    //     );
    // }

    async loginScreenBuilder() {
        const token = await this.keycloakService.getToken();

        const options = {
            withCredentials: true,
            params: new HttpParams()
                .set('authId', environment.screenBuilderAuthId)
                .set('redirectUrl', environment.screenBuilderRedirectURL)
                .set('orgId', environment.screenBuilderOrgId)
                .set('isAccessToken', true)
                .set('code', token),
        };

        return lastValueFrom(
            this.http.post(
                `${this.screenBuilderUrl}/api/auth/tp/login`,
                {},
                options,
            ),
        );
    }
}
