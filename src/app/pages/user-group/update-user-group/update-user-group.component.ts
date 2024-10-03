import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { DepartmentTree } from 'src/app/service/api/department.service';
import {
    Role,
    RoleService,
    RolesResponse,
} from 'src/app/service/api/role.service';
import { UserGroupService } from 'src/app/service/api/user-group.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-update-user-group',
    templateUrl: './update-user-group.component.html',
    styleUrl: './update-user-group.component.scss',
})
export class UpdateUserGroupComponent extends FormBaseComponent {
    constructor(
        private userGroupService: UserGroupService,
        private apiHandlerService: ApiHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
    ) {
        super();
    }

    roles: Role[] = [];

    groupName: string = '';

    errorGroupName: string = '';

    _department: DepartmentTree;

    get department() {
        return this._department;
    }

    set department(value: DepartmentTree) {
        this._department = value;
    }

    errorDepartment: string = '';

    role: Role;

    errorRole = '';

    parentGroup: any = undefined;

    parentGroups: any[] = [];

    description: string = '';

    data: any = undefined;

    departmentId: number = null;

    userGroupId: string = '';

    ngOnInit() {
        this.userGroupId = decryptLong(this.route.snapshot.params?.['id']);

        this.userGroupService.getUserGroupById(this.userGroupId).subscribe({
            next: async (res: any) => {
                this.data = res.data;
                this.groupName = this.data.name;
                this.description = this.data.description;

                this.roleService
                    .getComboBoxRoles(-1, 1, '', 'GROUP')
                    .subscribe({
                        next: (res: RolesResponse) => {
                            this.roles = res.data;
                            this.role = this.roles.filter(
                                (role) => role.id === this.data.roleId,
                            )[0];
                        },
                    });

                this.departmentId = this.data.agencyId;
            },
        });
    }

    getParents() {
        this.userGroupService
            .getComboBoxParentGroups(this.department.id, this.userGroupId)
            .subscribe({
                next: (res: any) => {
                    this.parentGroups = res.data;
                    if (this.data?.parentId) {
                        this.getParentById(
                            this.data?.parentId,
                            this.parentGroups,
                        );
                    }
                },
            });
    }

    getParentById(id: string | number, list: any[]) {
        for (let i = 0; i < list.length; i++) {
            if (list[i]?.id === id) {
                this.parentGroup = list[i];
                return;
            }
            const childList: any[] = list[i].children;
            if (childList?.length > 0) {
                this.getParentById(id, childList);
            }
        }
    }

    handleDepartmentChange(data: DepartmentTree) {
        this.department = data;
        this.errorDepartment = '';
        this.parentGroup = undefined;
        if (this.department) {
            this.getParents();
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.groupName)) {
            res = false;
            this.errorGroupName = 'Vui lòng nhập tên nhóm người dùng!';
        }
        if (!validator.isObjectInputValid(this.department)) {
            res = false;
            this.errorDepartment = 'Vui lòng chọn phòng ban!';
        }
        if (!validator.isObjectInputValid(this.role)) {
            res = false;
            this.errorRole = 'Vui lòng chọn vai trò!';
        }

        return res;
    }

    handleUserGroupForm() {
        if (this.validateForm()) {
            this.loading = true;

            const data = {
                agencyId: this.department.id,
                description: this.description,
                name: this.groupName,
                parentId: this.parentGroup?.id ?? null,
                roleId: this.role.id,
            };

            this.userGroupService
                .updateUserGroup(data, this.data.id)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.router.navigate([
                                    'user-permission',
                                    'user-group',
                                ]);
                            },
                            200,
                        );
                    },
                });
        }
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user-group']);
    }
}
