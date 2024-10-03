import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { HeaderSchema } from 'src/app/components/core/lazy-table/lazy-table.component';
import { DepartmentTree } from 'src/app/service/api/department.service';
import {
    Role,
    RoleService,
    RolesResponse,
} from 'src/app/service/api/role.service';
import {
    UserGroup,
    UserGroupService,
    UserGroupsResponse,
} from 'src/app/service/api/user-group.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { exportExcel } from 'src/app/utils/export-file';

@Component({
    selector: 'app-user-group',
    templateUrl: './user-group.component.html',
    styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent extends TableBaseComponent {
    constructor(
        private userGroupService: UserGroupService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private roleService: RoleService,
        private router: Router,
    ) {
        super();
    }

    override ngOnInit() {
        this.getRoles();

        this.callGetParents();

        super.ngOnInit();
    }

    callGetParents() {
        this.userGroupService
            .getUserGroups(-1, 1)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: UserGroupsResponse) => {
                    this.parents = res.data;
                },
            });
    }

    searchText: string = '';

    dialogData: UserGroup;

    showDialog: boolean = false;

    roles: Role[] = [];

    selectedDepartment: DepartmentTree;

    role: Role;

    selectedParent: UserGroup;

    parents: UserGroup[] = [];

    tableHeaderSchema: HeaderSchema[] = [
        {
            label: 'STT',
            minWidth: '3rem',
            align: 'center',
        },
        {
            label: 'Tên nhóm người dùng',
            sortableColumn: 'name',
        },
        {
            label: 'Nhóm cha',
            sortableColumn: 'parentName',
        },
        {
            label: 'Phòng ban',
            sortableColumn: 'agencyName',
        },
        {
            label: 'Tổng số người dùng',
        },
        {
            label: 'Vai trò',
        },
        {
            label: 'Thao tác',
            align: 'center',
        },
    ];

    import: boolean = false;

    dialogLoading: boolean = false;

    file: File;

    errorFile: string = '';

    getRoles() {
        this.roleService.getComboBoxRoles(-1, 1, '', 'GROUP').subscribe({
            next: (res: RolesResponse) => {
                this.roles = res.data;
            },
        });
    }

    handleDownloadTemplate() {
        this.userGroupService.downloadTemplate().subscribe({
            next: (res: any) => {
                exportExcel(
                    res,
                    `Mẫu tải lên danh sách nhóm người dùng`,
                    '.xlsm',
                );
            },
        });
    }

    handleFileChange(file: File) {
        this.file = file;
        this.errorFile = '';
    }

    resetDialog() {
        this.file = null;
        this.errorFile = '';
    }

    isValidFile() {
        let res = true;
        if (!this.file) {
            this.errorFile = 'Vui lòng chọn file để tải lên!';
            res = false;
        }
        return res;
    }

    handleImport() {
        this.import = true;
        this.showDialog = true;
    }

    handleImportUserGroup() {
        if (this.isValidFile()) {
            this.dialogLoading = true;
            this.userGroupService
                .uploadUserGroups(this.file)
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
                                this.showDialog = false;
                                this.getTableData();
                            },
                            200,
                        );
                    },
                });
        }
    }

    handleDepartmentChange(data: DepartmentTree) {
        this.selectedDepartment = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleParentChange(data: UserGroup) {
        this.selectedParent = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleRoleChange(data: Role) {
        this.role = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleAdd() {
        this.import = false;
        this.showDialog = true;
        this.dialogData = undefined;
    }

    handleEdit(data: UserGroup) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(data.id.toString())}`,
        );
    }

    handleDeleteUserGroup(id: number) {
        this.userGroupService.deleteUserGroup(id).subscribe({
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

    handleViewDetail(data: UserGroup) {
        this.router.navigateByUrl(
            `${this.router.url}/detail/${encryptLong(data.id.toString())}`,
        );
    }

    handleConfirmDelete(data: UserGroup) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá nhóm người dùng <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteUserGroup(data.id);
            },
        );
    }

    handleDone(dataChange: boolean) {
        this.showDialog = false;
        this.dialogData = undefined;
        if (dataChange) this.getTableData();
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        this.userGroupService
            .getUserGroups(
                this.currentPage,
                this.rows,
                this.searchText,
                this.sortObject,
                this.selectedDepartment?.id.toString(),
                this.role?.id.toString(),
                this.selectedParent?.id?.toString(),
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: UserGroupsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }
}
