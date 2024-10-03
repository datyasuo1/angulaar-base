import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    DashboardConfig,
    DashboardConfigService,
    DashboardConfigsResponse,
    DashboardService,
    DashboardServicesResponse,
} from 'src/app/service/api/dashboard-config.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-dashboard-config',
    templateUrl: './dashboard-config.component.html',
    styleUrls: ['./dashboard-config.component.scss'],
})
export class DashboardConfigComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private dashboardConfigService: DashboardConfigService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    searchText: string = '';

    services: DashboardService[] = [];

    service: DashboardService;

    currentDashboard: string = '';

    override ngOnInit(): void {
        super.ngOnInit();
        this.callDashboardController();
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.getTableData();
    }

    handleServiceFilterChange(data: DashboardService) {
        this.service = data;
        this.getTableData();
    }

    callDashboardController() {
        this.dashboardConfigService
            .getDashboardServices(-1, this.rows)
            .subscribe({
                next: (res: DashboardServicesResponse) => {
                    this.services = res.data;
                    this.loading = false;
                },
            });
    }

    override getTableData() {
        this.loading = true;
        this.dashboardConfigService
            .getDashboardConfigServiceList(
                this.currentPage,
                this.rows,
                this.searchText,
                this.service?.id,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: DashboardConfigsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    handleCreate() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    watchDashboardConfig(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/watch/${encryptLong(id.toString())}`,
        );
    }

    updateDashboardConfig(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    confirmDelete(data: DashboardConfig) {
        this.currentDashboard = data?.configName;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa cấu hình hiển thị Dashboard <strong>${this.currentDashboard}</strong>?`,
            () => {
                this.handleDeleteDashboardConfig(data?.id);
            },
        );
    }

    handleDeleteDashboardConfig(id: number) {
        this.dashboardConfigService.deleteDashboardConfig(id).subscribe({
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
