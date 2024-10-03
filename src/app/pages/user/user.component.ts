import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { HeaderSchema } from 'src/app/components/core/lazy-table/lazy-table.component';
import { Status } from 'src/app/interface';
import { DepartmentTree } from 'src/app/service/api/department.service';
import {
    IOCRole,
    User,
    UserService,
    UsersResponse,
} from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { exportExcel } from 'src/app/utils/export-file';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent extends TableBaseComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router,
        private apiHandlerService: ApiHandlerService,
        private verificationService: VerificationService,
        private confirmService: ConfirmationService,
    ) {
        super();
    }

    override ngOnInit() {
        super.ngOnInit();
    }

    searchText: string = '';

    selectedDepartment: DepartmentTree;

    tableHeaderSchema: HeaderSchema[] = [
        {
            label: 'STT',
            minWidth: '3rem',
            align: 'center',
        },
        {
            label: 'Tài khoản',
            sortableColumn: 'username',
        },
        {
            label: 'Họ và tên',
            sortableColumn: 'fullName',
        },
        {
            label: 'Email',
            sortableColumn: 'email',
        },
        {
            label: 'Số điện thoại',
            sortableColumn: 'mainPhone',
        },
        {
            label: 'Phòng ban',
            sortableColumn: 'agencyName',
        },
        {
            label: 'Vai trò',
        },
        {
            label: 'Trạng thái',
            sortableColumn: 'isActive',
        },
        {
            label: 'Thao tác',
            align: 'center',
        },
    ];

    statusTypes: Status[] = [
        {
            name: 'Đang hoạt động',
            code: '1',
        },
        {
            name: 'Không hoạt động',
            code: '0',
        },
    ];

    role: any[];

    searchStatus: Status;

    showDialog: boolean = false;

    dialogLoading: boolean = false;

    file: File;

    errorFile: string = '';

    handleDownloadTemplate() {
        this.userService.downloadTemplate().subscribe({
            next: (res: any) => {
                exportExcel(res, `Mẫu tải lên danh sách người dùng`, '.xlsm');
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
        this.showDialog = true;
    }

    handleImportUser() {
        if (this.isValidFile()) {
            this.dialogLoading = true;
            this.userService
                .uploadUsers(this.file)
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

    handleAdd() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    handleDeleteUser(id: number) {
        this.userService.deleteUser(id).subscribe({
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

    handleStatusChange(data: Status) {
        this.searchStatus = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleRoleChange(data: any[]) {
        this.role = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleConfirmDelete(data: User) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá người dùng <strong>${data.username}</strong>?`,
            () => {
                this.handleDeleteUser(data.id);
            },
        );
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleDepartmentChange(data: DepartmentTree) {
        this.selectedDepartment = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    getRoles(data: IOCRole[]) {
        return data.map((item: IOCRole) => item.name).join(', ');
    }

    override getTableData() {
        this.loading = true;
        this.userService
            .getUsers(
                this.currentPage,
                this.rows,
                this.searchText,
                this.sortObject,
                this.searchStatus?.code,
                this.selectedDepartment?.id.toString(),
                this.role?.map((item: any) => item.id).join(','),
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: UsersResponse) => {
                    this.data = res.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    updateAccountStatus(data: User, status: boolean) {
        this.userService
            .updateUser({ isActive: status }, data.id.toString())
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
                            this.getTableData();
                        },
                        200,
                    );
                },
            });
    }

    handleLockAccount(data: User) {
        this.confirmService.confirm({
            message: `Bạn có chắc muốn Khoá tài khoản <strong>${data.username}</strong>?`,
            header: 'Xác nhận',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Khoá',
            acceptButtonStyleClass: 'danger',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.updateAccountStatus(data, false);
            },
        });
    }

    handleUnlockAccount(data: User) {
        this.confirmService.confirm({
            message: `Bạn có chắc muốn Mở khoá tài khoản <strong>${data.username}</strong>?`,
            header: 'Xác nhận',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Mở Khoá',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.updateAccountStatus(data, true);
            },
        });
    }

    handleUpdate(data: User) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(data.id.toString())}`,
        );
    }

    handleViewDetail(data: User) {
        this.router.navigateByUrl(
            `${this.router.url}/detail/${encryptLong(data.id.toString())}`,
        );
    }

    handleViewHistory(data: User) {
        this.router.navigateByUrl(
            `${this.router.url}/history/${encryptLong(data.id.toString())}`,
        );
    }
}
