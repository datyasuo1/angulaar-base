import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import { FieldService } from 'src/app/service/api/field.service';
import {
    ResourcesTypeService,
    ResourceType,
    ResourceTypesResponse,
} from 'src/app/service/api/resources-type.service';
import {
    Screen,
    ScreenService,
    ScreensResponse,
} from 'src/app/service/api/screen.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';
@Component({
    selector: 'app-create-field',
    templateUrl: './create-field.component.html',
    styleUrls: ['./create-field.component.scss'],
})
export class CreateFieldComponent extends FormBaseComponent implements OnInit {
    serviceName: string = '';

    errorServiceName: string = '';

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    resourceTypes: ResourceType[] = [];

    resourceType: ResourceType[];

    selectedScreen: Screen;

    screens: Screen[] = [];

    hasAlert: boolean = false;

    constructor(
        private fieldService: FieldService,
        private resourcesTypeService: ResourcesTypeService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private screenService: ScreenService,
    ) {
        super();
    }

    ngOnInit() {
        this.callResourceTypes();
        this.getScreens();
    }

    callResourceTypes() {
        this.resourcesTypeService.getComboBoxResourceTypes().subscribe({
            next: (res: ResourceTypesResponse) => {
                this.resourceTypes = res?.data;
            },
        });
    }

    handleCloseCreateField() {
        const hasInputData = this.serviceName || this.administrativeUnit;
        if (hasInputData) {
            this.verificationService.saveVerification(() => {
                this.router.navigate(['category', 'service-type']);
            });
        } else {
            this.router.navigate(['category', 'service-type']);
        }
    }

    getScreens() {
        this.screenService.getComboBoxScreens(-1, 1, '').subscribe({
            next: (res: ScreensResponse) => {
                this.screens = res.data;
            },
        });
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
            this.errorAdministrativeUnit = 'Vui lòng chọn Đơn vị hành chính!';
        }
        return res;
    }

    handleCreateField() {
        if (this.validateForm()) {
            const data = {
                name: this.serviceName,
                wardCode: this.administrativeUnit.wardCode,
                districtCode: this.administrativeUnit.districtCode,
                provinceCode: this.administrativeUnit.provinceCode,
                dashboardScreenId: this.selectedScreen.appId,
                hasAlert: this.hasAlert ? 1 : 0,
            };

            if (this.resourceType !== undefined) {
                data['resourceTypeIds'] = this.resourceType.map(
                    (item: ResourceType) => item.id,
                );
            }

            this.loading = true;

            this.fieldService
                .createField(data)
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
                            201,
                        );
                    },
                });
        }
    }
}
