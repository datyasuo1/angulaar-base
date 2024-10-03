import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../common';
import { Observable } from 'rxjs';

export interface RolePermissionRequestBody {
    roleId: number;
    rolePermissionConfig: unknown[];
    rolePermissionConfigIndex: unknown[];
    permissionIds: number[];
}

export interface DeleteRolePermissionsFromUserRequestBody {
    userId: number;
    userPermissionConfig: unknown[];
    permissionIds: number[];
}

export interface AssignUserToGroupsRequestBody {
    userId: number;
    groupIds: number[];
}

export interface AssignGroupToUsersRequestBody {
    groupId: number;
    userIds: number[];
}

@Injectable({
    providedIn: 'root',
})
export class AssignableService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.baseURL + '/usr';

    updateRolePermissions(
        data: RolePermissionRequestBody,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/assignable/role-permissions`,
            data,
        );
    }

    deleteRolePermissionsFromUser(
        data: DeleteRolePermissionsFromUserRequestBody,
    ): Observable<CommonResponse> {
        return this.http.delete<CommonResponse>(
            `${this.baseUrl}/assignable/role-permissions`,
            {
                body: data,
            },
        );
    }

    assignUserToGroups(
        data: AssignUserToGroupsRequestBody,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/assignable/user-groups`,
            data,
        );
    }

    assignGroupToUsers(
        data: AssignGroupToUsersRequestBody,
    ): Observable<CommonResponse> {
        return this.http.put<CommonResponse>(
            `${this.baseUrl}/assignable/group-users`,
            data,
        );
    }
}
