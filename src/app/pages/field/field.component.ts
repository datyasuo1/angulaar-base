import {
    ResourcesTypeService,
    ResourceType,
    ResourceTypesResponse,
} from 'src/app/service/api/resources-type.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
    Field,
    FieldService,
    FieldsResponse,
} from 'src/app/service/api/field.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { encryptLong } from 'src/app/utils/encrypt';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { CommonResponse } from 'src/app/service/common';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
})
export class FieldComponent extends TableBaseComponent implements OnInit {
    administrativeUnit: AdministrativeUnitTree;

    searchText: string = '';

    currentService: string = '';

    resourceTypes: ResourceType[] = [];

    constructor(
        private fieldService: FieldService,
        private resourcesTypeService: ResourcesTypeService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit(): void {
        this.loading = true;
        this.callResourcesTypeAPI();
    }

    filteredResourceTypes(data: number[]): string {
        return this.resourceTypes
            .filter((item: ResourceType) => data?.includes(item.id))
            .map((item) => item.name)
            .join(', ');
    }

    handleAUFilterChange(value: AdministrativeUnitTree) {
        this.administrativeUnit = value;
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

    override getTableData() {
        this.loading = true;
        const selectedPlace = this.administrativeUnit;

        const { wardCode, districtCode, provinceCode } = selectedPlace ?? {};

        const place = `${wardCode ?? ''},${districtCode ?? ''},${
            provinceCode ?? ''
        }`;

        this.fieldService
            .getFields(this.currentPage, this.rows, this.searchText, place)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: FieldsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    callResourcesTypeAPI() {
        this.resourcesTypeService.getComboBoxResourceTypes().subscribe({
            next: (res: ResourceTypesResponse) => {
                this.resourceTypes = res?.data;
                this.loading = false;
                this.getTableData();
            },
        });
    }

    createFields() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    updateFields(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    confirmDeleteFields(data: Field) {
        this.currentService = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa loại dịch vụ <strong>${this.currentService}</strong>?`,
            () => {
                this.handleDeleteServices(data?.id);
            },
        );
    }

    handleDeleteServices(id: number) {
        this.fieldService.deleteField(id).subscribe({
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
