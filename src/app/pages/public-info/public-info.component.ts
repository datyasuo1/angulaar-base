import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    PublicInfo,
    PublicInfoService,
    PublicInfosResponse,
    PublicInfoType,
    PublicInfoTypesResponse,
} from 'src/app/service/api/public-info.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-public-info',
    templateUrl: './public-info.component.html',
    styleUrls: ['./public-info.component.scss'],
})
export class PublicInfoComponent extends TableBaseComponent implements OnInit {
    constructor(
        private publicInfoService: PublicInfoService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    publicInfoTypes: PublicInfoType[] = [];

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnitType: string = '';

    searchText: string = '';

    currentPublicInfo: string = '';

    place: string = ',,';

    publicInfoType: PublicInfoType;

    override ngOnInit(): void {
        super.ngOnInit();
        this.getPublicInfoTypes();
    }

    getPublicInfoTypes() {
        this.publicInfoService
            .getPublicInfosTypes(-1, this.rows, this.searchText)
            .subscribe({
                next: (res: PublicInfoTypesResponse) => {
                    this.publicInfoTypes = res.data;
                    this.loading = false;
                },
            });
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handlePublicInfoTypeFindChange(data: PublicInfoType) {
        this.publicInfoType = data;
        this.getTableData();
    }

    handleAUFilterChange(event: AdministrativeUnitTree) {
        if (event !== null) {
            this.administrativeUnit = event;
            const provinceCode = event?.provinceCode ?? '';
            const wardCode = event?.wardCode ?? '';
            const districtCode = event?.districtCode ?? '';
            this.place = [wardCode, districtCode, provinceCode].join(', ');
        } else {
            this.place = ', , ,';
        }
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        this.publicInfoService
            .getPublicInfos(
                this.currentPage,
                this.rows,
                this.searchText,
                this.place,
                this.publicInfoType?.id.toString() ?? '',
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: PublicInfosResponse) => {
                    this.data = res?.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    handleCreatePublicInfos() {
        this.router.navigate(['/system-management/public-info/create']);
    }

    watchPublicInfos(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/watch/${encryptLong(id.toString())}`,
        );
    }

    updatePublicInfos(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    confirmDeletePublicInfos(data: PublicInfo) {
        this.currentPublicInfo = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa Thông tin công cộng <strong>${this.currentPublicInfo}</strong>?`,
            () => {
                this.handleDeletePublicInfos(data?.id);
            },
        );
    }

    handleDeletePublicInfos(id: number) {
        this.publicInfoService.deletePublicInfos(id).subscribe({
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
