import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    ProcessGroup,
    ProcessGroupService,
    ProcessGroupsResponse,
} from 'src/app/service/api/process-group.service';
import {
    Process,
    ProcessesResponse,
    ProcessService,
} from 'src/app/service/api/process.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { exportJSON } from 'src/app/utils/export-file';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-process',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
})
export class ProcessComponent extends TableBaseComponent implements OnInit {
    constructor(
        private processService: ProcessService,
        private processGroupService: ProcessGroupService,
        private confirmationService: ConfirmationService,
        private verificationService: VerificationService,
        private router: Router,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.callProcessCategories();
    }

    searchText: string = '';

    showDialog: boolean = false;

    addDialogLoading: boolean = false;

    errorProccessGroup: string = '';

    processName: string = '';

    errorProcessName: string = '';

    description: string = '';

    errorDescription: string = '';

    file: File;

    selectedProcessGroup: ProcessGroup;

    processGroups: ProcessGroup[];

    callProcessCategories() {
        this.processGroupService.getComboBoxProcessGroups().subscribe({
            next: (res: ProcessGroupsResponse) => {
                this.processGroups = res.data;
            },
        });
    }

    handleUploadProcess() {
        this.router.navigateByUrl(this.router.url + '/process-upload');
    }

    handleAddProcess() {
        this.showDialog = true;
    }

    resetDialog() {
        this.errorProccessGroup = '';
        this.errorProcessName = '';
        this.errorDescription = '';
        this.processName = '';
        this.description = '';
        this.selectedProcessGroup = null;
        this.file = undefined;
    }

    isFormValid() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.processName)) {
            this.errorProcessName = 'Vui lòng nhập tên quy trình!';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedProcessGroup)) {
            this.errorProccessGroup = 'Vui lòng chọn nhóm quy trình!';
            res = false;
        }
        if (!validator.isStringInputValid(this.description)) {
            this.errorDescription = 'Vui lòng nhập mô tả!';
            res = false;
        }
        return res;
    }

    handleConfirmDownload(id: number, name: string) {
        this.confirmationService.confirm({
            message: `Bạn sắp tải xuống quy trình: <b>${name}</b>. Công việc người dùng giao và các biến môi trường không được xuất ra.`,
            header: 'Xác nhận tải xuống',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Tải xuống',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.processService.exportProcess(id).subscribe({
                    next: (res: any) => {
                        exportJSON(res, `${res?.name}.json`);
                    },
                });
            },
        });
    }

    handleConfirmDelete(data: Process) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá quy trình <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteProcess(data.id);
            },
        );
    }

    handleConfigProcess(id: number) {
        this.router.navigateByUrl(
            this.router.url + '/process-modeler/' + encryptLong(id.toString()),
        );
    }

    handleDeleteProcess(id: number) {
        this.processService.deleteProcess(id).subscribe({
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

    handleCreateProcess() {
        if (this.isFormValid()) {
            this.addDialogLoading = true;
            this.processService
                .createProcess(
                    this.processName,
                    this.description,
                    this.selectedProcessGroup?.id,
                    this.file,
                )
                .pipe(
                    finalize(() => {
                        this.addDialogLoading = false;
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

    handleProccessGroupChange(data: ProcessGroup) {
        this.selectedProcessGroup = data;
        this.errorProccessGroup = '';
    }

    handleProcessNameChange(data: string) {
        this.processName = data;
        this.errorProcessName = '';
    }

    handleFileChange(file: File) {
        this.file = file;
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        this.processService
            .getProcesses(-1, this.currentPage, this.rows, this.searchText)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: ProcessesResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }
}
