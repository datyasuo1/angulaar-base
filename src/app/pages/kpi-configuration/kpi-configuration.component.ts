import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
    KPI,
    KpiConfigurationService,
    KPIsResponse,
} from 'src/app/service/api/kpi-configuration.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { encryptLong } from 'src/app/utils/encrypt';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { CommonResponse } from 'src/app/service/common';

@Component({
    selector: 'app-kpi-configuration',
    templateUrl: './kpi-configuration.component.html',
    styleUrls: ['./kpi-configuration.component.scss'],
})
export class KpiConfigurationComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private kpiConfigurationService: KpiConfigurationService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    searchText: string = '';

    currentKpiConfiguration: string = '';

    override ngOnInit(): void {
        this.getTableData();
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        this.kpiConfigurationService
            .getKpiConfiguration(this.currentPage, this.rows, this.searchText)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: KPIsResponse) => {
                    this.data = res?.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    handleCreateKPiConfiguration() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    watchKPiConfiguration(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/watch/${encryptLong(id.toString())}`,
        );
    }

    updateKPiConfiguration(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    confirmDeleteKPiConfiguration(data: KPI) {
        this.currentKpiConfiguration = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa cấu hình KPI <strong>${this.currentKpiConfiguration}</strong>?`,
            () => {
                this.handleDeleteKpiConfig(data?.id);
            },
        );
    }

    handleDeleteKpiConfig(id: number) {
        this.kpiConfigurationService.deleteKpiConfiguration(id).subscribe({
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
