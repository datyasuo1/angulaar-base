import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    DeviceActivity,
    DeviceActivityResponse,
    LoginHistoryService,
} from 'src/app/service/api/login-history.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';

@Component({
    selector: 'app-device-activity',
    templateUrl: './device-activity.component.html',
    styleUrl: './device-activity.component.scss',
})
export class DeviceActivityComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private loginHistoryService: LoginHistoryService,
        private confirmService: ConfirmationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit() {
        super.ngOnInit();
    }

    handleSignOutAll() {
        this.confirmService.confirm({
            message:
                'Bạn sắp đăng xuất tất cả các thiết bị, bạn có chắc chắn về điều này?',
            header: 'Xác nhận',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Chắc chắn',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.loginHistoryService.signOutAll().subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                document.location.reload();
                            },
                            200,
                        );
                    },
                });
            },
        });
    }

    handleSignOut(data: DeviceActivity) {
        this.confirmService.confirm({
            message: `Bạn sắp đăng xuất thiết bị <b>${data.browser}</b>, bạn có chắc chắn về điều này?`,
            header: 'Xác nhận',
            icon: 'ti ti-info-circle',
            acceptLabel: 'Chắc chắn',
            rejectLabel: 'Huỷ',
            accept: () => {
                this.loginHistoryService.signOut(data.sessionId).subscribe({
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
            },
        });
    }

    override getTableData() {
        this.loading = true;
        this.loginHistoryService
            .getDeviceActivity(this.currentPage, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: DeviceActivityResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }
}
