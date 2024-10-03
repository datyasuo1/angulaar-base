import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import {
    PrioritiesResponse,
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { CommonResponse, Image } from 'src/app/service/common';

@Component({
    selector: 'app-priority',
    templateUrl: './priority.component.html',
    styleUrls: ['./priority.component.scss'],
})
export class PriorityComponent extends TableBaseComponent implements OnInit {
    constructor(
        private priorityService: PriorityService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    searchText: string = '';

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogData: Priority;

    currentPriority: string = '';

    showImage(obj: Image) {
        if (obj && Object.keys(obj).length > 0) {
            return true;
        }
        return false;
    }

    override getTableData() {
        this.loading = true;
        this.priorityService
            .getPriorities(this.searchText, this.currentPage, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe((res) => {
                this.data = res.data;
                this.totalRecords = res?.totalElement;
            });
    }

    handleConfirmDelete(data: Priority) {
        this.currentPriority = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá độ ưu tiên <strong>${this.currentPriority}</strong>?`,
            () => {
                this.callDeleteAPI(data?.id);
            },
        );
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleAddPriority() {
        this.dialogTitle = 'Thêm mới độ ưu tiên';
        this.showDialog = true;
    }

    handleEditPriority(data: Priority) {
        this.dialogTitle = 'Cập nhật độ ưu tiên';
        this.showDialog = true;
        this.dialogData = data;
    }

    callDeleteAPI(id: number) {
        this.priorityService.deletePriority(id).subscribe({
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

    handleDone(dataChange: boolean) {
        this.showDialog = false;
        this.dialogTitle = '';
        this.dialogData = null;
        if (dataChange) this.getTableData();
    }
}
