import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { AUCodes } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { Address } from 'src/app/interface';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    CommonPropertyResourceType,
    ResourcesTypeService,
    ResourceType,
    ResourceTypesResponse,
} from 'src/app/service/api/resources-type.service';
import {
    ResourceResponse,
    ResourcesService,
} from 'src/app/service/api/resources.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-create-resource',
    templateUrl: './create-resource.component.html',
    styleUrls: ['./create-resource.component.scss'],
})
export class CreateResourceComponent extends FormBaseComponent {
    @ViewChild(MapComponent) mapComponent!: MapComponent;

    lng: number;

    lat: number;

    address: string;

    types: ResourceType[] = [];

    type: ResourceType;

    errorType: string = '';

    name: string = '';

    errorName: string = '';

    phoneNumber: string = '';

    errorPhoneNumber: string = '';

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    valueTypes: any[] = [
        {
            value: 'Số',
            code: 'number',
        },
        {
            value: 'Chuỗi',
            code: 'text',
        },
        {
            value: 'Có/Không',
            code: 'yes_no',
        },
    ];

    specialityProperties: any[] = [];

    commonProperties: CommonPropertyResourceType[] = [];

    constructor(
        private resourcesService: ResourcesService,
        private resourcesTypeService: ResourcesTypeService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    id: number;

    pageType: string = '';

    cardTitle: string = '';

    auCodes: AUCodes;

    ngOnInit() {
        if (this.router.url.includes('update')) {
            this.pageType = 'update';
            this.cardTitle = 'Cập nhật tài nguyên';
            this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
            this.resourcesTypeService.getComboBoxResourceTypes().subscribe({
                next: (res: ResourceTypesResponse) => {
                    this.types = res.data;

                    this.resourcesService.getResourceById(this.id).subscribe({
                        next: (res2: ResourceResponse) => {
                            const {
                                wardCode,
                                districtCode,
                                provinceCode,
                                name,
                                phone,
                                address,
                                resourceTypeId,
                                specialityProperties,
                                commonProperties,
                            } = res2.data;
                            this.type = this.types.find(
                                (item: ResourceType) =>
                                    item.id === resourceTypeId,
                            );
                            this.name = name;
                            this.phoneNumber = phone;
                            this.address = address;
                            this.auCodes = {
                                wardCode,
                                districtCode,
                                provinceCode,
                            };
                            this.cdr.detectChanges();
                            this.specialityProperties =
                                specialityProperties.map((item: any) => {
                                    const { name, type, value } = item;

                                    return {
                                        name,
                                        errorName: '',
                                        valueType: this.valueTypes.find(
                                            (item: any) => item.code === type,
                                        ),
                                        errorValueType: '',
                                        value,
                                        errorValue: '',
                                    };
                                });

                            this.commonProperties = commonProperties;
                        },
                    });
                },
            });
        } else {
            this.pageType = 'create';
            this.cardTitle = 'Thêm mới tài nguyên';
            this.callResourcesType();
        }
    }

    ngAfterViewInit() {
        this.mapComponent.setMap();
    }

    handleTypeChange(data: ResourceType) {
        this.type = data;
        this.errorType = '';
        this.commonProperties = data.commonProperties;
    }

    deleteProperties(rowIndex: number) {
        this.specialityProperties.splice(rowIndex, 1);
    }

    validateCommonProperties() {
        let res = true;
        const validator = new CustomFormValidator();
        this.specialityProperties.forEach((p) => {
            if (!validator.isStringInputValid(p.name)) {
                res = false;
                p.errorName = 'Vui lòng nhập tên thuộc tính!';
            }
            if (!validator.isObjectInputValid(p.valueType)) {
                res = false;
                p.errorValueType = 'Vui lòng chọn loại giá trị!';
            }
            if (!validator.isStringInputValid(p.value)) {
                res = false;
                p.errorValue = 'Vui lòng nhập giá trị!';
            }
        });
        return res;
    }

    handleAddProperties() {
        if (this.validateCommonProperties()) {
            this.specialityProperties.push({
                name: '',
                errorName: '',
                valueType: '',
                errorValueType: '',
                value: '',
                errorValue: '',
            });
        }
    }

    handleName(event: any, rowIndex: number): void {
        this.specialityProperties[rowIndex].name = event;
        this.specialityProperties[rowIndex].errorName = '';
    }

    handleValueType(event: any, rowIndex: number) {
        this.specialityProperties[rowIndex].valueType = event;
        this.specialityProperties[rowIndex].errorValueType = '';
    }

    handleValue(value: any, rowIndex: number) {
        this.specialityProperties[rowIndex].value = value;
        this.specialityProperties[rowIndex].errorValue = '';
    }

    handleClose() {
        const hasInputData =
            this.type ||
            this.name ||
            this.phoneNumber ||
            this.administrativeUnit;

        if (hasInputData) {
            this.verificationService.saveVerification(() => {
                this.router.navigate(['system-management', 'resources']);
            });
        } else {
            this.router.navigate(['system-management', 'resources']);
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isObjectInputValid(this.type)) {
            res = false;
            this.errorType = 'Vui lòng nhập Loại tài nguyên!';
        }
        if (!validator.isStringInputValid(this.name)) {
            res = false;
            this.errorName = 'Vui lòng nhập Tên tài nguyên!';
        }
        // if (!validator.isStringInputValid(this.phoneNumber)) {
        //     res = false;
        //     this.errorPhoneNumber = 'Vui lòng nhập số điện thoại!';
        // }
        if (
            validator.isStringInputValid(this.phoneNumber) &&
            !validator.isPhoneNumberValid(this.phoneNumber)
        ) {
            res = false;
            this.errorPhoneNumber =
                'Số điện thoại không đúng định dạng: 0xx (10-11 ký tự)!';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng nhập Đơn vị hành chính!';
        }
        if (this.specialityProperties.length > 0) {
            res = this.validateCommonProperties() ? res : false;
        }
        return res;
    }

    handleAddResource() {
        if (this.validateForm()) {
            this.loading = true;
            let data: any = {
                name: this.name,
                resourceTypeId: this.type.id,
                phone: this.phoneNumber,
                lat: this.lat,
                lng: this.lng,
                address: this.address,
                wardCode: this.administrativeUnit.wardCode,
                districtCode: this.administrativeUnit.districtCode,
                provinceCode: this.administrativeUnit.provinceCode,
            };

            if (this.specialityProperties.length > 0) {
                const specialityProperties = this.specialityProperties.map(
                    (item) => {
                        const { name, valueType, value } = item;
                        return {
                            name,
                            type: valueType.code,
                            value,
                        };
                    },
                );
                data = { ...data, specialityProperties };
            }

            if (this.commonProperties.length > 0) {
                const commonProperties = this.commonProperties.map(
                    (item: any) => ({
                        ...item,
                        type: item.valueType.code,
                    }),
                );
                data = { ...data, commonProperties };
            }

            if (this.router.url.includes('update')) {
                this.resourcesService
                    .updateResources(data, this.id)
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
                                        'system-management',
                                        'resources',
                                    ]);
                                },
                                200,
                            );
                        },
                    });
            } else {
                this.resourcesService
                    .createResources(data)
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
                                        'system-management',
                                        'resources',
                                    ]);
                                },
                                201,
                            );
                        },
                    });
            }
        }
    }

    handleAddressChange(data: Address) {
        this.address = data.address;
        this.lng = data.lng;
        this.lat = data.lat;
    }

    handleClearAddress() {
        this.address = '';
        this.lat = null;
        this.lng = null;
    }

    callResourcesType() {
        this.resourcesTypeService.getComboBoxResourceTypes().subscribe({
            next: (res: ResourceTypesResponse) => {
                this.types = res?.data;
            },
        });
    }
}
