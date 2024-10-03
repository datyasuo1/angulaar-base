import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    Screen,
    ScreenService,
    ScreensResponse,
} from 'src/app/service/api/screen.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { exportJSON } from 'src/app/utils/export-file';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-screen',
    templateUrl: './screen.component.html',
    styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent extends TableBaseComponent implements OnInit {
    constructor(
        private screenService: ScreenService,
        private router: Router,
        private verificationService: VerificationService,
        private confirmationService: ConfirmationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        this.getTableData();
    }

    dialogLoading: boolean = false;

    searchText: string = '';

    showDialog: boolean = false;

    screenName: string = '';

    errorScreenName: string = '';

    screenDescription: string = '';

    errorDescription: string = '';

    dialogTitle: string = '';

    dialogScreenId: string;

    import: boolean = false;

    file: File;

    errorFile: string = '';

    handleConfig(appId: string) {
        this.router.navigateByUrl(
            this.router.url + '/update/' + encryptLong(appId),
        );
    }

    handleAdd() {
        this.import = false;
        this.showDialog = true;
        this.dialogTitle = 'Thêm mới màn hình';
    }

    handleCopy(data: Screen) {
        this.import = false;
        this.showDialog = true;
        this.dialogTitle = 'Sao chép màn hình';
        this.screenName = data.title + ' Copy';
        this.screenDescription = data.description;
        this.dialogScreenId = data.appId;
    }

    handleFileChange(file: File) {
        this.file = file;
        this.errorFile = '';
    }

    handleCopyScreen() {
        this.dialogLoading = true;
        this.screenService
            .copyScreen(
                this.dialogScreenId,
                this.screenDescription,
                this.screenName,
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
                        201,
                    );
                },
            });
    }

    isValidFile() {
        let res = true;
        if (!this.file) {
            this.errorFile = 'Vui lòng chọn file để tải lên!';
            res = false;
        }
        return res;
    }

    handleImportScreen() {
        if (this.isValidFile()) {
            this.dialogLoading = true;
            this.screenService
                .uploadScreen(this.file)
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
                                this.import = false;
                            },
                            201,
                        );
                    },
                });
        }
    }

    handleDialogButtonClick() {
        switch (this.dialogTitle) {
            case 'Thêm mới màn hình':
                this.handleAddScreen();
                break;
            case 'Sao chép màn hình':
                this.handleCopyScreen();
                break;
            case 'Tải lên màn hình':
                this.handleImportScreen();
                break;
        }
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleScreenNameChange(value: string) {
        this.screenName = value;
        this.errorScreenName = '';
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.screenName)) {
            this.errorScreenName = 'Vui lòng nhập tên màn hình!';
            res = false;
        }

        if (!validator.isStringInputValid(this.screenDescription)) {
            this.errorDescription = 'Vui lòng nhập mô tả!';
            res = false;
        }
        return res;
    }

    handleAddScreen() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            this.screenService
                .addScreen(this.screenDescription, this.screenName)
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

    handleDeleteScreen(id: string) {
        this.screenService.deleteScreen(id).subscribe({
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

    handleDownloadScreen(appId: string) {
        this.screenService.exportScreen(appId).subscribe({
            next: (res: any) => {
                exportJSON(res, `${res?.title}.json`);
            },
        });
    }

    handleImport() {
        this.dialogTitle = 'Tải lên màn hình';
        this.import = true;
        this.showDialog = true;
    }

    resetDialog() {
        this.screenName = '';
        this.screenDescription = '';
        this.errorDescription = '';
        this.errorScreenName = '';
        this.dialogScreenId = '';
        this.file = undefined;
        this.errorFile = '';
    }

    override getTableData() {
        this.loading = true;
        this.screenService
            .getScreens(this.currentPage, this.rows, this.searchText)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: ScreensResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    confirmDeleteScreen(data: Screen) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá màn hình <strong>${data.title}</strong>?`,
            () => {
                this.handleDeleteScreen(data.appId);
            },
        );
    }

    confirmDownloadScreen(data: Screen) {
        this.confirmationService.confirm({
            message: `Bạn có chắc muốn tải màn hình ${data.title}?`,
            header: 'Xuất màn hình',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Tải xuống',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.handleDownloadScreen(data?.appId);
            },
        });
    }
}
