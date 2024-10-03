import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { ResourceTypeComboBox } from 'src/app/interface';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {} from 'src/app/service/api/field.service';
import {
    ResourcesTypeService,
    ResourceType,
    ResourceTypesResponse,
} from 'src/app/service/api/resources-type.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-resources-type',
    templateUrl: './resources-type.component.html',
    styleUrls: ['./resources-type.component.scss'],
})
export class ResourcesTypeComponent
    extends TableBaseComponent
    implements OnInit
{
    administrativeUnit: AdministrativeUnitTree;

    searchText: string = '';

    searchPlace: string = ',,';

    wardCode: string = '';

    districtCode: string = '';

    provinceCode: string = '';

    currentNameResourceType: string = '';

    selectedType: ResourceTypeComboBox;

    types: ResourceTypeComboBox[] = [
        {
            name: 'Tài nguyên thông thường',
            code: 1,
        },
        {
            name: 'Camera',
            code: 2,
        },
        {
            name: 'IOT',
            code: 3,
        },
    ];

    constructor(
        private resourcesTypeService: ResourcesTypeService,
        private verificationService: VerificationService,
        private router: Router,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        this.loading = true;
        this.getTableData();
    }

    handleTypeChange(data: ResourceTypeComboBox) {
        this.selectedType = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
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
            this.searchPlace = ',,';
        }
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleCreateResourceType() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    override getTableData() {
        this.loading = true;
        this.resourcesTypeService
            .getResourceTypes(
                this.currentPage,
                this.rows,
                this.searchText,
                this.searchPlace,
                this.selectedType?.code.toString() ?? '',
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: ResourceTypesResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    watchResourceTypes(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/watch/${encryptLong(id.toString())}`,
        );
    }

    updateResourceTypes(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    confirmDeleteResourceTypes(data: ResourceType) {
        this.currentNameResourceType = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa loại tài nguyên <strong>${this.currentNameResourceType}</strong>?`,
            () => {
                this.handleDeleteResourceTypes(data.id);
            },
        );
    }

    handleDeleteResourceTypes(id: number) {
        this.resourcesTypeService.deleteResourceTypes(id).subscribe({
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
