import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { AUCodes } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    AddDepartmentRequestBody,
    DepartmentService,
    DepartmentsResponse,
    DepartmentTree,
} from 'src/app/service/api/department.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-create-department',
    templateUrl: './create-department.component.html',
    styleUrls: ['./create-department.component.scss'],
})
export class CreateDepartmentComponent extends FormBaseComponent {
    constructor(
        private departmentService: DepartmentService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    departmentName: string = '';

    errorDepartmentName: string = '';

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    parents: DepartmentTree[] = [];

    parent: DepartmentTree;

    errorParent: string = '';

    description: string = '';

    cardTitle: string = '';

    id: string = '';

    auCodes: AUCodes;

    async ngOnInit() {
        if (this.router.url.includes('update')) {
            this.cardTitle = 'Cập nhật phòng ban';

            this.id = decryptLong(this.activatedRoute.snapshot.params?.['id']);
            try {
                const departmentData = await lastValueFrom(
                    this.departmentService.getDepartmentById(parseInt(this.id)),
                );
                const {
                    name,
                    wardCode,
                    districtCode,
                    provinceCode,
                    description,
                    parentId,
                } = departmentData.data;
                const places = `${wardCode ?? ''},${districtCode ?? ''},${provinceCode ?? ''}`;
                const parentData = await lastValueFrom(
                    this.departmentService.getComboBoxAgencies(
                        -1,
                        1,
                        '',
                        places,
                        true,
                    ),
                );
                this.parents = parentData?.data;
                this.findParentById(parentId, this.parents);
                this.departmentName = name;
                this.auCodes = {
                    wardCode,
                    districtCode,
                    provinceCode,
                };
                this.cdr.detectChanges();
                this.description = description;
            } catch (error: unknown) {
                console.error(error);
            }
        } else {
            this.cardTitle = 'Thêm mới phòng ban';
        }
    }

    findParentById(parentId: number, parents: DepartmentTree[]) {
        parents.forEach((item: DepartmentTree) => {
            if (item.id == parentId) {
                this.parent = item;
            }
            if (item && item.children && item.children.length > 0) {
                this.findParentById(parentId, item.children);
            }
        });
    }

    callParentDepartment() {
        if (
            this.administrativeUnit &&
            Object.keys(this.administrativeUnit).length > 0
        ) {
            const { wardCode, districtCode, provinceCode } =
                this.administrativeUnit;

            const places = `${wardCode ?? ''},${districtCode ?? ''},${provinceCode ?? ''}`;

            this.departmentService
                .getComboBoxAgencies(-1, 1, '', places, true)
                .subscribe({
                    next: (res: DepartmentsResponse) => {
                        this.parents = res.data;
                    },
                });
        }
    }

    handleAUChange(event: AdministrativeUnitTree) {
        this.administrativeUnit = event;
        this.errorAdministrativeUnit = '';
        this.parent = undefined;
        this.callParentDepartment();
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.departmentName)) {
            res = false;
            this.errorDepartmentName = 'Vui lòng nhập Phòng ban!';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng chọn Đơn vị hành chính!';
        }
        return res;
    }

    handleDepartmentForm() {
        if (this.validateForm()) {
            this.loading = true;
            const data: AddDepartmentRequestBody = {
                name: this.departmentName,
                wardCode: this.administrativeUnit?.wardCode,
                districtCode: this.administrativeUnit?.districtCode,
                provinceCode: this.administrativeUnit?.provinceCode,
            };

            if (this.parent) {
                data.parentId = this.parent.id;
            }

            if (this.description.length > 0) {
                data.description = this.description;
            }
            if (this.cardTitle === 'Thêm mới phòng ban') {
                this.departmentService
                    .createDepartment(data)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        }),
                    )
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.router.navigate([
                                        'category',
                                        'department',
                                    ]);
                                },
                                201,
                            );
                        },
                    });
            } else {
                this.departmentService
                    .updateDepartment(data, parseInt(this.id))
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        }),
                    )
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.router.navigate([
                                        'category',
                                        'department',
                                    ]);
                                },
                                200,
                            );
                        },
                    });
            }
        }
    }

    validateInformationChange() {
        if (this.departmentName.length > 0) {
            return true;
        }
        if (
            this.administrativeUnit &&
            Object.keys(this.administrativeUnit).length > 0
        ) {
            return true;
        }
        if (this.parent && Object.keys(this.parent).length > 0) {
            return true;
        }
        return this.description.length > 0;
    }

    handleCloseCreateDepartment() {
        if (this.validateInformationChange()) {
            this.verificationService.saveVerification(() => {
                this.router.navigate(['category', 'department']);
            });
        } else {
            this.router.navigate(['category', 'department']);
        }
    }
}
