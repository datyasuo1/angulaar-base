import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { DepartmentService } from 'src/app/service/api/department.service';
import { TaskStatusService } from 'src/app/service/api/task-status.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-task-status',
    templateUrl: './task-status.component.html',
    styleUrls: ['./task-status.component.scss'],
})
export class TaskStatusComponent {
    constructor(
        private taskStatusService: TaskStatusService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {}

    ngOnInit() {
        this.callGetTaskStatusAPI();
    }

    data: any;

    loading: boolean = false;

    currentPage: number = 1;

    first: number = 0;

    rows: number = 10;

    searchText: string = '';

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
        this.callGetTaskStatusAPI();
    }

    handleAdd() {
        this.dialogTitle = 'Thêm mới trạng thái công việc';
        this.dialogButtonText = 'Thêm mới';
        this.showDialog = true;
        this.dialogData = undefined;
    }

    handleEdit(data: any) {
        this.dialogTitle = 'Cập nhật trạng thái công việc';
        this.dialogButtonText = 'Cập nhật';
        this.showDialog = true;
        this.dialogData = data;
    }

    handleDeleteTaskStatus(id: number) {
        this.taskStatusService.deleteTaskStatus(id).subscribe({
            next: (res: any) => {
                this.apiHandlerService.handleSuccess(
                    res,
                    () => {
                        this.callGetTaskStatusAPI();
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
            `Bạn có chắc muốn xoá trạng thái công việc <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteTaskStatus(data.id);
            },
        );
    }

    handleDone(dataChange: boolean) {
        this.showDialog = false;
        this.dialogTitle = '';
        this.dialogButtonText = '';
        this.dialogData = [];
        if (dataChange) this.callGetTaskStatusAPI();
    }

    loadTable(event: any) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.callGetTaskStatusAPI();
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.callGetTaskStatusAPI();
    }

    callGetTaskStatusAPI() {
        this.loading = true;
        this.taskStatusService
            .getTaskStatuss(
                this.currentPage,
                this.rows,
                this.searchText,
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
