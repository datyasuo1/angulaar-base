import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import {
    ProcessGroup,
    ProcessGroupService,
    ProcessGroupsResponse,
} from 'src/app/service/api/process-group.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import { CommonResponse } from 'src/app/service/common';
import { Status } from 'src/app/interface';

@Component({
    selector: 'app-process-group',
    templateUrl: './process-group.component.html',
    styleUrls: ['./process-group.component.scss'],
})
export class ProcessGroupComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private processGroupService: ProcessGroupService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    dialogLoading: boolean = false;

    searchText: string = '';

    showDialog: boolean = false;

    name: string = '';

    errorName: string = '';

    status: Status = { name: '', code: '' };

    statusList: Status[] = [
        { name: 'Đang hoạt động', code: 'ACTIVE' },
        { name: 'Không hoạt động', code: 'INACTIVE' },
    ];

    errorStatus: string = '';

    dialogTitle: string = '';

    pageType: string = '';

    dialogProcessId: number;

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleStatusChange(value: Status) {
        this.status = value;
        this.errorStatus = '';
    }

    handleNameChange(value: string) {
        this.name = value;
        this.errorName = '';
    }

    override getTableData() {
        this.loading = true;
        this.processGroupService
            .getProcessGroups(this.currentPage, this.rows, this.searchText)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: ProcessGroupsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.name)) {
            res = false;
            this.errorName = 'Vui lòng nhập tên nhóm quy trình!';
        }
        if (
            !validator.isObjectInputValid(this.status) ||
            (this.status?.code?.length === 0 && this.status.name.length === 0)
        ) {
            res = false;
            this.errorStatus = 'Vui lòng chọn trạng thái!';
        }
        return res;
    }

    handleClickAddButton() {
        this.dialogTitle = 'Thêm mới nhóm quy trình';
        this.pageType = 'create';
        this.showDialog = true;
    }

    handleClickEditButton(id: number, name: string, status: string) {
        this.dialogTitle = 'Cập nhật nhóm quy trình';
        this.pageType = 'update';
        this.dialogProcessId = id;
        this.name = name;
        this.status =
            status === 'ACTIVE'
                ? { name: 'Đang hoạt động', code: 'ACTIVE' }
                : { name: 'Không hoạt động', code: 'INACTIVE' };
        this.showDialog = true;
    }

    handleUpdateProcessGroup() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            this.processGroupService
                .updateProcessGroup(
                    this.dialogProcessId,
                    this.name,
                    this.status.code,
                )
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

    handleAddProcessGroup() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            this.processGroupService
                .addProcessGroup(this.name, this.status.code)
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
                            201,
                        );
                    },
                });
        }
    }

    handleDelete(id: number) {
        this.processGroupService.deleteProcessGroup(id).subscribe({
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

    resetDialog() {
        this.name = '';
        this.status = { name: '', code: '' };
        this.errorName = '';
        this.errorStatus = '';
    }

    confirmDelete(data: ProcessGroup) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa nhóm quy trình <strong>${data.name}</strong>?`,
            () => {
                this.handleDelete(data.id);
            },
        );
    }
}
