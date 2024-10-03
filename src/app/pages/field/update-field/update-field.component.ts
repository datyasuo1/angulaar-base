import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { AUCodes } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    Field,
    FieldResponse,
    FieldService,
} from 'src/app/service/api/field.service';
import {
    ResourcesTypeService,
    ResourceType,
    ResourceTypesResponse,
} from 'src/app/service/api/resources-type.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-update-field',
    templateUrl: './update-field.component.html',
    styleUrls: ['./update-field.component.scss'],
})
export class UpdateFieldComponent extends FormBaseComponent implements OnInit {
    serviceName: string = '';

    errorServiceName: string = '';

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    wardCode: string = '';

    districtCode: string = '';

    provinceCode: string = '';

    auCodes: AUCodes;

    resourceTypes: ResourceType[] = [];

    resourceType: ResourceType[];

    id: number;

    detail: Field;

    constructor(
        private fieldService: FieldService,
        private router: Router,
        private route: ActivatedRoute,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private resourcesTypeService: ResourcesTypeService,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit() {
        this.resourcesTypeService
            .getComboBoxResourceTypes()
            .pipe(
                switchMap((res: ResourceTypesResponse) => {
                    this.resourceTypes = res?.data;
                    this.id = parseInt(
                        decryptLong(this.route.snapshot.params?.['id']),
                    );
                    return this.fieldService.getFieldById(this.id);
                }),
            )
            .subscribe({
                next: (res: FieldResponse) => {
                    this.detail = res.data;
                    this.serviceName = this.detail.name;
                    this.auCodes = {
                        wardCode: this.detail.wardCode,
                        districtCode: this.detail.districtCode,
                        provinceCode: this.detail.provinceCode,
                    };
                    this.cdr.detectChanges();
                    this.resourceType = this.resourceTypes.filter((item) =>
                        this.detail.resourceTypeIds.includes(item.id),
                    );
                    this.wardCode = this.detail.wardCode;
                    this.districtCode = this.detail.districtCode;
                    this.provinceCode = this.detail.provinceCode;
                },
            });
    }

    handleCloseUpdateField() {
        const hasInputData = this.serviceName || this.administrativeUnit;
        if (hasInputData) {
            this.verificationService.saveVerification(() => {
                this.router.navigate(['category', 'service-type']);
            });
        } else {
            this.router.navigate(['category', 'service-type']);
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.serviceName)) {
            res = false;
            this.errorServiceName = 'Vui lòng nhập Tên loại dịch vụ!';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng chọn Đơn vị hành chính';
        }
        return res;
    }

    handleUpdateField() {
        if (this.validateForm()) {
            const data = {
                name: this.serviceName,
                wardCode: this.administrativeUnit.wardCode,
                districtCode: this.administrativeUnit.districtCode,
                provinceCode: this.administrativeUnit.provinceCode,
            };

            if (this.resourceType) {
                data['resourceTypeIds'] = this.resourceType.map(
                    (item: ResourceType) => item.id,
                );
            } else {
                data['resourceTypeIds'] = [];
            }
            this.loading = true;
            this.fieldService
                .updateField(data, this.id)
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
                                    'service-type',
                                ]);
                            },
                            200,
                        );
                    },
                });
        }
    }
}
