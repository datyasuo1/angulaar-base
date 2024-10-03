import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAgencyGroup } from 'src/app/interface/category/agency.interface';
import { BaseApiResponse } from 'src/app/interface/common.interface';
import { IUser } from 'src/app/interface/userGroup/userGroup.interface';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
import { SortObject } from 'src/app/interface';
import { addSortToParams } from 'src/app/utils/sort';
export interface UserGroup {
    id: number;
    name: string;
    description: string;
    isDefault: null;
    status: string;
    dataDomainId: null;
    parentId: number;
    parentName: string;
    agencyId: number;
    agencyName: string;
    roleId: number;
    roleName: string;
    memberCount: number;
    createdAt: string;
}

export interface UserGroupsResponse {
    code: number;
    message: string;
    data: UserGroup[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}
@Injectable({
    providedIn: 'root',
})
export class UserGroupService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    getUserGroups(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        sortObject: SortObject = null,
        agencyId: string = '',
        roleId: string = '',
        parentId: string = '',
    ): Observable<UserGroupsResponse> {
        const httpOptions = {
            params: addSortToParams(
                new HttpParams()
                    .set('page', page)
                    .set('size', perPage)
                    .set('name', searchText)
                    .set('agencyId', agencyId)
                    .set('roleId', roleId)
                    .set('parentId', parentId),
                sortObject,
            ),
        };

        return this.http.get<UserGroupsResponse>(
            `${this.baseURL}/usr/groups`,
            httpOptions,
        );
    }

    getComboBoxGroupUsers(
        groupId: number,
    ): Observable<BaseApiResponse<IUser[]>> {
        return this.http.get<BaseApiResponse<IUser[]>>(
            `${this.baseURL}/usr/combo-box/${groupId}/users`,
        );
    }

    getParentGroups(
        agencyId: number,
    ): Observable<BaseApiResponse<IAgencyGroup[]>> {
        return this.http.get<BaseApiResponse<IAgencyGroup[]>>(
            `${this.baseURL}/usr/groups/agencies/${agencyId}`,
        );
    }
    getComboBoxUserGroups(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        orderBy: string = '',
        agencyId: string = '',
        roleId: string = '',
        parentId: string = '',
    ): Observable<UserGroupsResponse> {
        const httpOptions = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('name', searchText)
                .set('orderBy', orderBy)
                .set('agencyId', agencyId)
                .set('roleId', roleId)
                .set('parentId', parentId),
        };

        return this.http.get<UserGroupsResponse>(
            `${this.baseURL}/usr/combo-box/groups`,
            httpOptions,
        );
    }

    getComboBoxParentGroups(agencyId: number, userGroupId: string = '') {
        const httpOptions = {
            params: new HttpParams().set('excludeId', userGroupId),
        };
        return this.http.get(
            `${this.baseURL}/usr/combo-box/groups/agencies/${agencyId}`,
            httpOptions,
        );
    }

    createUserGroup(data: any): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseURL}/usr/groups`,
            data,
        );
    }

    getUsersOfGroup(
        userGroupId: string,
        page: number = -1,
        perPage: number = 1,
        username: string = '',
    ): Observable<any> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('username', username),
        };
        return this.http.get<any>(
            `${this.baseURL}/usr/groups/${userGroupId}/users`,
            options,
        );
    }

    getUserGroupById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseURL}/usr/groups/${id}`);
    }

    updateUserGroup(data: any, id: number): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseURL}/usr/groups/${id}`,
            data,
        );
    }

    deleteUserGroup(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseURL}/usr/groups/${id}`,
        );
    }

    uploadUserGroups(file: File): Observable<CommonResponse> {
        const formData = new FormData();

        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseURL}/usr/groups/import`,
            formData,
        );
    }

    downloadTemplate() {
        const options = {
            responseType: 'blob' as 'json',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get<any>(
            `${this.baseURL}/usr/groups/template`,
            options,
        );
    }
}
