import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { DepartmentTree } from 'src/app/service/api/department.service';
import { Role } from 'src/app/service/api/role.service';
import {
    UserGroup,
    UserGroupService,
} from 'src/app/service/api/user-group.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-add-user-group',
    templateUrl: './add-user-group.component.html',
    styleUrls: ['./add-user-group.component.scss'],
})
export class AddUserGroupComponent
    extends FormBaseComponent
    implements OnChanges
{
    constructor(
        private userGroupService: UserGroupService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    @Input() show: boolean = false;

    @Output() onDone = new EventEmitter<boolean>();

    @Input() dialogData: UserGroup;

    @Input() roles: Role[] = [];

    dialogLoading = false;

    groupName: string = '';

    errorGroupName: string = '';

    department: DepartmentTree;

    errorDepartment: string = '';

    role: Role;

    errorRole = '';

    parentGroup: any = undefined;

    parentGroups: any[] = [];

    description: string = '';

    data: any = undefined;

    departmentId: number;

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['dialogData'] &&
            !changes['dialogData']?.firstChange &&
            this.dialogData
        ) {
            this.data = changes['dialogData'].currentValue;
            this.getUpdateData();
        }
    }

    getUpdateData() {
        this.groupName = this.data.name;
        this.description = this.data.description;
        this.role = this.getRoleById(this.data.roleId);
        this.departmentId = this.data.agencyId;
    }

    getParents() {
        this.userGroupService
            .getComboBoxParentGroups(this.department.id)
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

    getRoleById(id: number) {
        return this.roles.filter((role) => role.id === id)[0];
    }

    resetDialog() {
        this.groupName = '';
        this.parentGroup = undefined;
        this.department = undefined;
        this.departmentId = undefined;
        this.role = undefined;
        this.description = '';
        this.errorDepartment = '';
        this.errorGroupName = '';
        this.errorRole = '';
        this.onDone.emit(false);
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
            this.dialogLoading = true;
            const data = {
                agencyId: this.department.id,
                description: this.description,
                name: this.groupName,
                parentId: this.parentGroup?.id,
                roleId: this.role.id,
            };

            this.userGroupService
                .createUserGroup(data)
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.onDone.emit(true);
                            },
                            201,
                        );
                    },
                });
        }
    }
}
