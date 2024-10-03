import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse } from 'src/app/interface/common.interface';
import {
    IAppResouceDetail,
    IAppResourceCategory,
    IAppResourceGroup,
    IAppResourceManagement,
    IAppResourceStatus,
    ICreateAppResourcePayload,
    ICreateUpdateResouceVersion,
    ICreateResouceVersionPayload,
    IResourceGroupUser,
    IResourcesVersion,
    IUpdateAppResourcePayload,
    IAddResouceGroupPayload,
} from 'src/app/interface/system-management/resource-management.interface';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';

@Injectable({
    providedIn: 'root',
})
export class ResourceManagementService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

    getApplicationResource(): Observable<
        BaseApiResponse<IAppResourceManagement[]>
    > {
        return this.http.get<BaseApiResponse<IAppResourceManagement[]>>(
            `${this.baseUrl}/hpe/application-resource`,
        );
    }

    deleteApplicationResource(id: string): Observable<CommonResponse> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource/${id}`,
        );
    }

    updateApplicationResource(
        id: number,
        payload: IUpdateAppResourcePayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.put<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource/${id}`,
            payload,
        );
    }
    createApplicationResource(
        payload: ICreateAppResourcePayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource`,
            payload,
        );
    }

    getResourceGroup(): Observable<BaseApiResponse<IAppResourceGroup[]>> {
        return this.http.get<BaseApiResponse<IAppResourceGroup[]>>(
            `${this.baseUrl}/hpe/group-application`,
        );
    }

    getAppResourceCategory(): Observable<
        BaseApiResponse<IAppResourceCategory[]>
    > {
        return this.http.get<BaseApiResponse<IAppResourceCategory[]>>(
            `${this.baseUrl}/hpe/application-version-category`,
        );
    }

    getAppResourceStatus(): Observable<BaseApiResponse<IAppResourceStatus[]>> {
        return this.http.get<BaseApiResponse<IAppResourceStatus[]>>(
            `${this.baseUrl}/hpe/application-version-status`,
        );
    }

    createResouceVersion(
        payload: ICreateResouceVersionPayload,
    ): Observable<CommonResponse> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resouce-version`,
            payload,
        );
    }

    getAppResourceGroup(
        id: number,
    ): Observable<BaseApiResponse<IResourceGroupUser[]>> {
        return this.http.get<BaseApiResponse<IResourceGroupUser[]>>(
            `${this.baseUrl}/hpe/application-resource_group_user?appResourceId=${id}`,
        );
    }
    AddResourceGroup(
        payload: IAddResouceGroupPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.post<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource_group_user`,
            payload,
        );
    }

    updateResourceGroup(
        id: number,
        payload: IAddResouceGroupPayload,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.put<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource_group_user/${id}`,
            payload,
        );
    }

    deleteResourceGroup(
        id: number,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource_group_user/${id}`,
        );
    }

    getAppResourceVersion(
        id: number,
    ): Observable<BaseApiResponse<IResourcesVersion[]>> {
        return this.http.get<BaseApiResponse<IResourcesVersion[]>>(
            `${this.baseUrl}/hpe/application-resource-version?appResourceId=${id}`,
        );
    }

    createAppResourceVersion(
        oldVersion: number,
        payload: ICreateUpdateResouceVersion,
    ): Observable<BaseApiResponse<CommonResponse>> {
        let url = `${this.baseUrl}/hpe/application-resource-version`;
        if (oldVersion) {
            url += `?oldVersionId=${oldVersion}`;
        }
        return this.http.post<BaseApiResponse<CommonResponse>>(url, payload);
    }

    updateAppResourceVersion(
        versionId: number,
        oldVersion: number,
        payload: ICreateUpdateResouceVersion,
    ): Observable<BaseApiResponse<CommonResponse>> {
        let url = `${this.baseUrl}/hpe/application-resource-version/${versionId}`;
        if (oldVersion) {
            url += `?oldVersionId=${oldVersion}`;
        }
        return this.http.put<BaseApiResponse<CommonResponse>>(url, payload);
    }

    deleteAppResourceVersion(
        id: number,
    ): Observable<BaseApiResponse<CommonResponse>> {
        return this.http.delete<BaseApiResponse<CommonResponse>>(
            `${this.baseUrl}/hpe/application-resource-version/${id}`,
        );
    }

    getAppResourceDetail(
        id: number,
    ): Observable<BaseApiResponse<IAppResouceDetail>> {
        return this.http.get<BaseApiResponse<IAppResouceDetail>>(
            `${this.baseUrl}/hpe/application-resource/${id}`,
        );
    }
}
