import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { DepartmentService } from 'src/app/service/api/department.service';
import { TaskClassificationService } from 'src/app/service/api/task-classification.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-task-classification',
    templateUrl: './task-classification.component.html',
    styleUrls: ['./task-classification.component.scss'],
})
export class TaskClassificationComponent {
    constructor(
        private taskClassificationService: TaskClassificationService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {}

    ngOnInit() {
        this.callGetTaskClassificationAPI();
    }

    data: any;

    loading: boolean = false;

    currentPage: number = 1;

    first: number = 0;

    rows: number = 10;

    searchText: string = '';
    searchDescription: string = '';

    totalRecords: number = 0;

    dialogTitle: string = '';

    dialogButtonText: string = '';

    dialogData: any = undefined;

    showDialog: boolean = false;

    roles: any[] = [];

    departments: any[] = [];

    sortColumns: any[] = [
        {
            name: 'Sắp xếp danh sách theo tên loại công việc',
            code: 'name',
        },
        {
            name: 'Sắp xếp danh sách theo thời gian tạo',
            code: 'created_at',
        },
    ];

    selectedColumn: any = {
        name: 'Sắp xếp danh sách theo tên loại công việc',
        code: 'name',
    };

    handleSortColumnChange(data: any) {
        this.selectedColumn = data;
        this.callGetTaskClassificationAPI();
    }

    handleAdd() {
        this.dialogTitle = 'Thêm mới loại công việc';
        this.dialogButtonText = 'Thêm mới';
        this.showDialog = true;
        this.dialogData = undefined;
    }

    handleEdit(data: any) {
        this.dialogTitle = 'Cập nhật loại công việc';
        this.dialogButtonText = 'Cập nhật';
        this.showDialog = true;
        this.dialogData = data;
    }

    handleDeleteTaskClassification(id: number) {
        this.taskClassificationService.deleteTaskClassification(id).subscribe({
            next: (res: any) => {
                this.apiHandlerService.handleSuccess(
                    res,
                    () => {
                        this.callGetTaskClassificationAPI();
                    },
                    200,
                );
            },
            error: (err: any) => {
                this.apiHandlerService.handleError(err);
            },
        });
    }

    handleConfirmDelete(data: any) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá loại công việc <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteTaskClassification(data.id);
            },
        );
    }

    handleDone(dataChange: boolean) {
        this.showDialog = false;
        this.dialogTitle = '';
        this.dialogButtonText = '';
        this.dialogData = [];
        if (dataChange) this.callGetTaskClassificationAPI();
    }

    loadTable(event: any) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.callGetTaskClassificationAPI();
    }

    handleSearchName(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.callGetTaskClassificationAPI();
    }

    handleSearchDescription(data: string) {
        this.searchDescription = data;
        this.currentPage = 1;
        this.first = 0;
        this.callGetTaskClassificationAPI();
    }

    callGetTaskClassificationAPI() {
        this.loading = true;
        this.taskClassificationService
            .getTaskClassifications(
                this.currentPage,
                this.rows,
                this.searchText || this.searchDescription,
                this.selectedColumn.code,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    this.data = res.data;
                    this.totalRecords = res?.totalElement;
                },
                error: (err: any) => {
                    this.apiHandlerService.handleError(err);
                },
            });
    }
}
