import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    AutoConfiguration,
    AutoConfigurationService,
    AutoConfigurationsResponse,
} from 'src/app/service/api/auto-configuration.service';
import {
    Field,
    FieldService,
    FieldsResponse,
} from 'src/app/service/api/field.service';
import {
    PrioritiesResponse,
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import {
    Process,
    ProcessesResponse,
    ProcessService,
} from 'src/app/service/api/process.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-auto-configuration',
    templateUrl: './auto-configuration.component.html',
    styleUrls: ['./auto-configuration.component.scss'],
})
export class AutoConfigurationComponent
    extends TableBaseComponent
    implements OnInit
{
    searchText: string = '';

    warningTypes: Field[] = [];

    selectedWarningType: Field;

    levels: Priority[] = [];

    selectedLevel: Priority;

    processes: Process[] = [];

    selectedProcess: Process;

    errorLevel: string = '';

    errorWarningType: string = '';

    errorProcess: string = '';

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogLoading: boolean = false;

    selectedId: number | null;

    constructor(
        private autoConfigurationService: AutoConfigurationService,
        private verificationService: VerificationService,
        private processService: ProcessService,
        private priorityService: PriorityService,
        private fieldService: FieldService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.callFieldsAPI();
        this.callPrioritiesAPI();
        this.callProcessList();
    }

    resetDialog() {
        this.selectedLevel = {};
        this.selectedProcess = null;
        this.selectedWarningType = null;
        this.errorLevel = '';
        this.errorProcess = '';
        this.errorWarningType = '';
        this.selectedId = null;
    }

    validateSubmitData() {
        let isValid = true;
        const validator = new CustomFormValidator();
        if (!validator.isObjectInputValid(this.selectedLevel)) {
            this.errorLevel = 'Vui lòng chọn mức độ!';
            isValid = false;
        }
        if (!validator.isObjectInputValid(this.selectedWarningType)) {
            this.errorWarningType = 'Vui lòng chọn loại cảnh báo!';
            isValid = false;
        }
        if (!validator.isObjectInputValid(this.selectedProcess)) {
            this.errorProcess = 'Vui lòng chọn quy trình!';
            isValid = false;
        }
        return isValid;
    }

    addConfig() {
        if (this.validateSubmitData()) {
            const submitData = {
                processId: this.selectedProcess?.id,
                fieldId: this.selectedWarningType?.id,
                priorityId: this.selectedLevel?.id,
            };
            this.dialogLoading = true;
            this.autoConfigurationService
                .createConfiguration(submitData)
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

    updateConfig() {
        if (this.validateSubmitData() && typeof this.selectedId == 'number') {
            const submitData = {
                processId: this.selectedProcess?.id,
                fieldId: this.selectedWarningType?.id,
                priorityId: this.selectedLevel?.id,
            };
            this.dialogLoading = true;
            this.autoConfigurationService
                .updateConfiguration(submitData, this.selectedId)
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

    handleDialogButtonClick() {
        if (this.dialogTitle == 'Thêm mới cấu hình tự động') this.addConfig();
        if (this.dialogTitle == 'Cập nhật cấu hình tự động')
            this.updateConfig();
    }

    handleLevelChange(event: Priority) {
        this.selectedLevel = event;
        this.errorLevel = '';
    }

    handleWarningTypeChange(event: Field) {
        this.selectedWarningType = event;
        this.errorWarningType = '';
    }

    handleProcessChange(event: Process) {
        this.selectedProcess = event;
        this.errorProcess = '';
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleCreate() {
        this.dialogTitle = 'Thêm mới cấu hình tự động';
        this.showDialog = true;
    }

    handleUpdate(data: AutoConfiguration) {
        this.dialogTitle = 'Cập nhật cấu hình tự động';
        this.selectedWarningType = this.warningTypes.filter(
            (i) => i.id == data.fieldId,
        )[0];
        this.selectedLevel = this.levels.filter(
            (i) => i.id == data.priorityId,
        )[0];
        this.selectedProcess = this.processes.filter(
            (i) => i.id == data.masterProcessId,
        )[0];

        this.selectedId = data?.id;
        this.showDialog = true;
    }

    callProcessList() {
        this.processService.getComboBoxProcesses().subscribe({
            next: (res: ProcessesResponse) => {
                this.processes = res.data;
            },
        });
    }

    callPrioritiesAPI() {
        this.priorityService.getComboBoxPriorities().subscribe({
            next: (res: PrioritiesResponse) => {
                this.levels = res.data;
            },
        });
    }

    callFieldsAPI() {
        this.fieldService.getComboBoxFields().subscribe({
            next: (res: FieldsResponse) => {
                this.warningTypes = res.data;
            },
        });
    }

    override getTableData() {
        this.loading = true;
        this.autoConfigurationService
            .getAutoConfigServiceList(
                this.currentPage,
                this.rows,
                this.searchText,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: AutoConfigurationsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    confirmDelete(data: AutoConfiguration) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá cấu hình <strong>${data?.masterProcessName}</strong>?`,
            () => {
                this.handleDeleteConfiguration(data.id);
            },
        );
    }

    handleDeleteConfiguration(id: number) {
        this.autoConfigurationService.deleteConfiguration(id).subscribe({
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
}
