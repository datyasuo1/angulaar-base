import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortObject } from 'src/app/interface';
import { addSortToParams } from 'src/app/utils/sort';
import { environment } from 'src/environments/environment';
import { CommonResponse, Image } from '../common';
import { BaseApiResponse } from 'src/app/interface/common.interface';
import { IUserGroup } from 'src/app/interface/userGroup/userGroup.interface';
export interface IOCRole {
    roleId: number;
    name: string;
    code: string;
    type: string;
}

export interface User {
    id: number;
    ssoId: string;
    username: string;
    firstName: string;
    lastName: string;
    fullName: string;
    sex: number;
    email: string;
    citizenId: string;
    agencyId: number;
    agencyName: string;
    address: string;
    mainPhone: string;
    subPhone: string | null;
    fax: string | null;
    birthday: string;
    createdAt: string;
    isActive: boolean;
    isDeleted: boolean;
    iocRoles: IOCRole[];
    wardCode?: string;
    districtCode?: string;
    provinceCode?: string;
    config?: any[];
    userPermissionConfig?: any[];
}

export interface UsersResponse {
    code: number;
    message: string;
    data: User[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface UserResponse {
    code: number;
    message: string;
    data: User;
}

export interface UserInfo {
    id: number;
    ssoId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    sex: number;
    citizenId: string;
    agencyId: number;
    agencyName: string;
    wardCode: string | null;
    districtCode: string;
    provinceCode: string;
    address: string;
    mainPhone: string;
    subPhone: string;
    fax: string;
    birthday: string;
    config: any[];
    userPermissionConfig: any[];
    isActive: boolean;
    isDeleted: boolean;
    iocRoles: IOCRole[];
}

export interface UserInfoResponse {
    code: number;
    message: string;
    data: UserInfo;
}

export interface UserPermission {
    isActive: boolean;
    permissionCode: string;
    permissionUIPath: string;
}

export interface UserPermissionsResponse {
    code: number;
    message: string;
    data: UserPermission[];
}

export interface UserMenu {
    icon: string;
    image: Image;
    imageHost: string;
    index: number;
    items: UserMenu[];
    label: string;
    routerLink: string;
}
export interface UserMenusResponse {
    code: number;
    message: string;
    data: UserMenu[];
}
export interface UserLog {
    id: number;
    ssoId: string;
    username: string;
    firstName: string;
    lastName: string;
    fullName: string;
    sex: number;
    email: string;
    citizenId: string;
    agencyId: number;
    agencyName: string;
    address: string;
    mainPhone: string;
    subPhone: string | null;
    fax: string | null;
    birthday: string;
    createdAt: string;
    isActive: boolean;
    isDeleted: boolean;
    iocRoles: IOCRole[];
}

export interface UserLogsResponse {
    code: number;
    message: string;
    data: UserLog[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface GroupOfUsersResponse {
    code: number;
    message: string;
    data: GroupOfUser[];
    page: number;
    pageSize: number;
    totalPage: number;
    totalElement: number;
}

export interface GroupOfUser {
    groupId: number;
    name: string;
    description: string;
    isDefault: null;
    status: string;
    dataDomainId: null;
    parentId: number;
    agencyId: number;
    roleId: number;
}
@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    private baseURL: string = environment.baseURL;

    private cityOSURL: string = environment.cityOSURL;

    getUsers(
        page: number,
        perPage: number,
        searchText: string,
        sortObject: SortObject,
        status: string = '',
        agencyId: string = '',
        roleIds: string = '',
    ): Observable<UsersResponse> {
        const options = {
            params: addSortToParams(
                new HttpParams()
                    .set('page', page)
                    .set('size', perPage)
                    .set('username', searchText)
                    .set('status', status)
                    .set('agencyId', agencyId)
                    .set('roleIds', roleIds),
                sortObject,
            ),
        };

        return this.http.get<UsersResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts`,
            options,
        );
    }

    getComboBoxUsers(
        page: number = -1,
        perPage: number = 1,
        searchText: string = '',
        orderBy: string = '',
        agencyId: string = '',
    ): Observable<UsersResponse> {
        const options = {
            params: new HttpParams()
                .set('page', page)
                .set('size', perPage)
                .set('username', searchText)
                .set('status', '')
                .set('agencyId', agencyId)
                .set('orderBy', orderBy),
        };

        return this.http.get<UsersResponse>(
            `${this.baseURL}/usr/combo-box/ioc-accounts`,
            options,
        );
    }

    getComboBoxUserByAgency(agencyId: number): Observable<UsersResponse> {
        const options = {
            params: new HttpParams()
                .set('page', -1)
                .set('size', 1)
                .set('agencyId', agencyId),
        };
        return this.http.get<UsersResponse>(
            `${this.baseURL}/usr/combo-box/ioc-accounts`,
            options,
        );
    }

    updatePassword(body: any): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/password-reset`,
            body,
        );
    }

    updateUser(body: any, id: string): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/${id}`,
            body,
        );
    }

    deleteUser(id: number): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/${id}`,
        );
    }

    getUserInfo(): Observable<UserInfoResponse> {
        return this.http.get<UserInfoResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/self`,
        );
    }

    getSSOUserInfo() {
        return this.http.get(`${this.cityOSURL}/usr/auth/account`);
    }

    getUserMenus(): Observable<UserMenusResponse> {
        return this.http.get<UserMenusResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/self/menus`,
        );
    }

    createIOCUser(data: any): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/self`,
            data,
        );
    }

    createSSOUser(data: any): Observable<CommonResponse> {
        return this.http.post<CommonResponse>(
            `${this.cityOSURL}/usr/auth/account`,
            data,
        );
    }

    createFeedback(data: any) {
        return this.http.post(`${this.baseURL}/hpe/review-app`, data);
    }

    getUserPermissions(): Observable<UserPermissionsResponse> {
        return this.http.get<UserPermissionsResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/self/permissions`,
        );
    }

    getUserLog(
        id: string,
        page: number = -1,
        perPage: number = 1,
    ): Observable<UserLogsResponse> {
        const options = {
            params: new HttpParams().set('page', page).set('size', perPage),
        };

        return this.http.get<UserLogsResponse>(
            `${this.cityOSURL}/usr/auth/account/${id}/log-requests`,
            options,
        );
    }

    getUserById(id: string): Observable<UserResponse> {
        return this.http.get<UserResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/${id}`,
        );
    }

    getGroupsOfUser(
        userId: string,
        page: number = -1,
        perPage: number = 1,
    ): Observable<BaseApiResponse<IUserGroup[]>> {
        const options = {
            params: new HttpParams().set('page', page).set('size', perPage),
        };
        return this.http.get<BaseApiResponse<IUserGroup[]>>(
            `${this.baseURL}/usr/auth/ioc-accounts/${userId}/groups`,
            options,
        );
    }

    getComboBoxGroupsOfUser(
        userId: string,
        page: number = -1,
        perPage: number = 1,
    ): Observable<BaseApiResponse<IUserGroup[]>> {
        const options = {
            params: new HttpParams().set('page', page).set('size', perPage),
        };
        return this.http.get<BaseApiResponse<IUserGroup[]>>(
            `${this.baseURL}/usr/combo-box/ioc-accounts/${userId}/groups`,
            options,
        );
    }

    deleteGroupOfUser(
        userId: string,
        groupId: string,
    ): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/${userId}/groups/${groupId}`,
        );
    }

    deleteUserOfGroup(
        userId: string,
        groupId: string,
    ): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseURL}/usr/groups/${groupId}/users/${userId}`,
        );
    }

    uploadUsers(file: File): Observable<CommonResponse> {
        const formData = new FormData();

        if (file) formData.append('file', file);

        return this.http.post<CommonResponse>(
            `${this.baseURL}/usr/auth/ioc-accounts/import`,
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
            `${this.baseURL}/usr/auth/ioc-accounts/template`,
            options,
        );
    }
}
