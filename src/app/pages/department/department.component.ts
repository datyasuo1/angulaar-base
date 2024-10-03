import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    DepartmentField,
    DepartmentService,
    DepartmentsResponse,
    DepartmentTree,
} from 'src/app/service/api/department.service';
import {
    Field,
    FieldService,
    FieldsResponse,
} from 'src/app/service/api/field.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent extends TableBaseComponent {
    dialogLoading: boolean = false;

    searchText: string = '';

    searchPlaces: string = ', ,';

    administrativeUnit: AdministrativeUnitTree;

    currentDepartmentName: string = '';

    showDialog = false;

    services: Field[] = [];

    selectedServices: Field[] = [];

    errorService: string = '';

    clickedDepartment: DepartmentTree;

    isViewDetail: boolean = false;

    constructor(
        private router: Router,
        private verificationService: VerificationService,
        private departmentService: DepartmentService,
        private apiHandlerService: ApiHandlerService,
        private fieldService: FieldService,
    ) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.callFieldsAPI();
    }

    handleUpdateDepartment(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/update/${encryptLong(id.toString())}`,
        );
    }

    handleAddDepartment() {
        this.router.navigateByUrl(`${this.router.url}/create`);
    }

    handleDeleteDepartment(id: number) {
        this.departmentService.deleteDepartment(id).subscribe({
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

    handleConfirmDelete(data: DepartmentTree) {
        const { name, id } = data ?? {};
        this.currentDepartmentName = name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá phòng ban <strong>${this.currentDepartmentName} </strong>?`,
            () => {
                this.handleDeleteDepartment(id);
            },
        );
    }

    handleAUFilterChange(event: AdministrativeUnitTree) {
        if (event !== null) {
            this.administrativeUnit = event;
            const provinceCode = event?.provinceCode ?? '';
            const wardCode = event?.wardCode ?? '';
            const districtCode = event?.districtCode ?? '';
            this.searchPlaces = [wardCode, districtCode, provinceCode].join(
                ',',
            );
        } else {
            this.searchPlaces = ', , ,';
        }
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

    callFieldsAPI() {
        this.fieldService.getComboBoxFields().subscribe({
            next: (res: FieldsResponse) => {
                this.services = res.data;
            },
        });
    }

    handleViewDetail(data: DepartmentTree) {
        this.clickedDepartment = data;
        this.isViewDetail = true;
        this.showDialog = true;
    }

    handleConfig(data: DepartmentTree) {
        this.clickedDepartment = data;
        this.isViewDetail = false;
        const ids = data?.agencyFields?.map((item: DepartmentField) => item.id);
        this.selectedServices = this.services.filter((item: Field) =>
            ids.includes(item.id),
        );
        this.showDialog = true;
    }

    resetDialog() {
        this.selectedServices = [];
    }

    handleDialogButtonClick() {
        this.dialogLoading = true;

        const data = {
            fieldIds: this.selectedServices.map((service) => service.id),
        };

        this.departmentService
            .addFieldsToDepartment(data, this.clickedDepartment?.id?.toString())
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

    handleServiceChange(data: Field[]) {
        this.selectedServices = data;
        this.errorService = '';
    }

    override getTableData() {
        this.loading = true;
        this.departmentService
            .getAgencies(
                this.currentPage,
                this.rows,
                this.searchText,
                this.searchPlaces,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: DepartmentsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }
}
