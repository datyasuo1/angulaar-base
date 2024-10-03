import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    ResourcesTypeService,
    ResourceType,
    ResourceTypesResponse,
} from 'src/app/service/api/resources-type.service';
import {
    Resource,
    ResourcesResponse,
    ResourcesService,
} from 'src/app/service/api/resources.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { exportExcel } from 'src/app/utils/export-file';

@Component({
    selector: 'app-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent extends TableBaseComponent implements OnInit {
    constructor(
        private resourcesService: ResourcesService,
        private resourcesTypeService: ResourcesTypeService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    resourceTypes: ResourceType[] = [];

    administrativeUnit: AdministrativeUnitTree;

    searchText: string = '';

    resourceType: ResourceType;

    searchPlace: string = ',,';

    currentResource: string = '';

    showDialog: boolean = false;

    dialogLoading: boolean = false;

    file: File;

    errorFile: string = '';

    handleDownloadTemplate() {
        this.resourcesService.downloadTemplate().subscribe({
            next: (res: any) => {
                exportExcel(res, `Mẫu tải lên danh sách tài nguyên`, '.xlsm');
            },
        });
    }

    handleFileChange(file: File) {
        this.file = file;
        this.errorFile = '';
    }

    resetDialog() {
        this.file = null;
        this.errorFile = '';
    }

    isValidFile() {
        let res = true;
        if (!this.file) {
            this.errorFile = 'Vui lòng chọn file để tải lên!';
            res = false;
        }
        return res;
    }

    handleImport() {
        this.showDialog = true;
    }

    handleImportResources() {
        if (this.isValidFile()) {
            this.dialogLoading = true;
            this.resourcesService
                .uploadResources(this.file)
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

    override ngOnInit(): void {
        super.ngOnInit();
        this.callResourcesType();
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleResourceTypeFindChange(data: ResourceType) {
        this.resourceType = data;
        this.getTableData();
    }

    handleAUFilterChange(event: AdministrativeUnitTree) {
        if (event !== null) {
            this.administrativeUnit = event;
            const provinceCode = event?.provinceCode ?? '';
            const wardCode = event?.wardCode ?? '';
            const districtCode = event?.districtCode ?? '';
            this.searchPlace = [wardCode, districtCode, provinceCode].join(',');
        } else {
            this.searchPlace = ', , ,';
        }
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    callResourcesType() {
        this.resourcesTypeService.getComboBoxResourceTypes().subscribe({
            next: (res: ResourceTypesResponse) => {
                this.resourceTypes = res?.data;
            },
        });
    }

    override getTableData() {
        this.loading = true;
        this.resourcesService
            .getResources(
                this.currentPage,
                this.rows,
                this.searchText,
                this.resourceType?.id?.toString() ?? '',
                this.searchPlace,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: ResourcesResponse) => {
                    this.data = res?.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    handleCreateResources() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    watchResources(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/watch/${encryptLong(id.toString())}`,
        );
    }

    updateResources(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    confirmDeleteResources(data: Resource) {
        this.currentResource = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa tài nguyên <strong>${this.currentResource}</strong>?`,
            () => {
                this.handleDeleteResources(data?.id);
            },
        );
    }

    handleDeleteResources(id: number) {
        this.resourcesService.deleteResources(id).subscribe({
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
