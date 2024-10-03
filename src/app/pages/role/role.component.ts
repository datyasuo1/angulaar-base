import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { RoleTypeComboBox } from 'src/app/interface';
import {
    Role,
    RoleService,
    RolesResponse,
} from 'src/app/service/api/role.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
})
export class RoleComponent extends TableBaseComponent {
    constructor(
        private roleService: RoleService,
        private verificationService: VerificationService,
        private router: Router,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit() {
        super.ngOnInit();
    }

    searchText: string = '';

    currentRole: string = '';

    show: boolean = false;

    dialogTitle: string = '';

    dialogLoading = false;

    code: string = '';

    errorCode: string = '';

    name: string = '';

    errorName: string = '';

    type: RoleTypeComboBox;

    types: RoleTypeComboBox[] = [
        {
            name: 'GROUP',
            code: 'GROUP',
        },
        {
            name: 'USER',
            code: 'USER',
        },
    ];

    errorType: string = '';

    resetDialog() {
        this.code = '';
        this.name = '';
        this.type = null;
    }

    protected handleDataChange(data: unknown, variable: string) {
        this[variable] = data;
        const x = variable.charAt(0).toUpperCase() + variable.slice(1);
        const type = typeof this['error' + x];
        if (type === 'string') this['error' + x] = '';
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        this.roleService
            .getRoles(this.currentPage, this.rows, this.searchText)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: RolesResponse) => {
                    this.data = res.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }
    selectedRoleId: number;

    handleUpdate(data: Role) {
        this.dialogTitle = 'Cập nhật vai trò';
        this.code = data.code;
        this.name = data.name;
        this.type = this.types.find(
            (item: RoleTypeComboBox) => item.code === data.type,
        );
        this.selectedRoleId = data.id;
        this.show = true;
    }

    handleAdd() {
        this.dialogTitle = 'Thêm mới vai trò';
        this.show = true;
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();

        if (!validator.isStringInputValid(this.code)) {
            this.errorCode = 'Mã không được để trống';
            res = false;
        }
        if (!validator.isStringInputValid(this.name)) {
            this.errorCode = 'Mã không được để trống';
            res = false;
        }
        if (!validator.isObjectInputValid(this.type)) {
            this.errorCode = 'Mã không được để trống';
            res = false;
        }
        return res;
    }

    handleForm() {
        if (this.validateForm()) {
            if (this.dialogTitle === 'Thêm mới vai trò') {
                this.roleService
                    .createRole({
                        code: this.code,
                        name: this.name,
                        roleType: this.type.code,
                    })
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.getTableData();
                                    this.show = false;
                                },
                                201,
                            );
                        },
                    });
            }
            if (this.dialogTitle === 'Cập nhật vai trò') {
                this.roleService
                    .updateRole(
                        {
                            code: this.code,
                            name: this.name,
                            roleType: this.type.code,
                        },
                        this.selectedRoleId,
                    )
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.getTableData();
                                    this.show = false;
                                },
                                200,
                            );
                        },
                    });
            }
        }
    }

    handleConfig(data: Role) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(data.id.toString())}`,
        );
    }

    callDeleteAPI(id: number) {
        this.roleService.deleteRole(id).subscribe({
            next: (res: CommonResponse) => {
                this.apiHandlerService.handleSuccess(
                    res,
                    () => {
                        this.getTableData();
                    },
                    200,
                );
            },
        });
    }

    handleConfirmDelete(data: Role) {
        this.currentRole = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá vai trò <strong>${this.currentRole}</strong>?`,
            () => {
                this.callDeleteAPI(data?.id);
            },
        );
    }
}
