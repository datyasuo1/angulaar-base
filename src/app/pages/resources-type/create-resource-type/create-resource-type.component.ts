import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { AUCodes } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    AddResourceTypeBody,
    CommonPropertyResourceType,
    ResourcesTypeService,
    ResourceType,
    ResourceTypeResponse,
    UpdateResourceTypeBody,
} from 'src/app/service/api/resources-type.service';
import {
    Vms,
    VmsesResponse,
    VmsManagementService,
} from 'src/app/service/api/vms-management.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse, Image } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';
@Component({
    selector: 'app-create-resource-type',
    templateUrl: './create-resource-type.component.html',
    styleUrls: ['./create-resource-type.component.scss'],
})
export class CreateResourceTypeComponent extends FormBaseComponent {
    constructor(
        private resourcesTypeService: ResourcesTypeService,
        private verificationService: VerificationService,
        private vmsManagementService: VmsManagementService,
        private router: Router,
        private route: ActivatedRoute,
        private apiHandlerService: ApiHandlerService,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    pageType: string = '';

    cardTitle: string = '';

    id: number;

    resourceTypeData: ResourceType;

    auCodes: AUCodes;

    ngOnInit() {
        if (this.router.url.includes('update')) {
            this.pageType = 'update';
            this.cardTitle = 'Cập nhật loại tài nguyên';
            this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
            this.vmsManagementService
                .getComboBoxVmsManagements()
                .pipe(
                    switchMap((res: VmsesResponse) => {
                        this.vmsTypes = res.data;
                        return this.resourcesTypeService.getResourceTypeById(
                            this.id,
                        );
                    }),
                )
                .subscribe({
                    next: (res: ResourceTypeResponse) => {
                        this.resourceTypeData = res.data;
                        const {
                            name,
                            wardCode,
                            districtCode,
                            provinceCode,
                            activeImage,
                            vmsId,
                            type,
                            isPublic,
                            isDefaultOnMap,
                            passiveImage,
                            commonProperties,
                        } = res.data;
                        this.name = name;

                        this.auCodes = {
                            wardCode,
                            districtCode,
                            provinceCode,
                        };
                        this.cdr.detectChanges();

                        if (activeImage) {
                            const temp = JSON.parse(activeImage);
                            if (temp && Object.keys(temp).length > 0) {
                                temp.name = temp?.fileName;
                            }
                            this.activeFile = temp;
                        }
                        if (passiveImage) {
                            const temp = JSON.parse(passiveImage);
                            if (temp && Object.keys(temp).length > 0) {
                                temp.name = temp?.fileName;
                            }
                            this.inactiveFile = temp;
                        }

                        this.vmsType = this.vmsTypes.find(
                            (item: Vms) => item.id === vmsId,
                        );

                        this.resourceTypeRadio = type;
                        this.isPublic = isPublic === 1;
                        this.isDefaultOnMap = isDefaultOnMap === 1;

                        this.commonProperties = commonProperties;
                    },
                });
        } else {
            this.pageType = 'create';
            this.cardTitle = 'Thêm mới loại tài nguyên';
            this.callVmsTypeAPI();
        }
    }

    callVmsTypeAPI() {
        this.vmsManagementService.getComboBoxVmsManagements().subscribe({
            next: (res: VmsesResponse) => {
                this.vmsTypes = res.data;
            },
        });
    }

    name: string = '';

    errorName: string = '';

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    vmsTypes: Vms[] = [];

    vmsType: Vms;

    errorVmsType: string = '';

    errorActiveFile: string = '';

    errorInactiveFile: string = '';

    resourceTypeRadio: string = 'Tài nguyên thông thường';

    valueType: any[] = [
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

    commonProperties: CommonPropertyResourceType[] = [];

    isPublic: boolean = false;

    isDefaultOnMap: boolean = false;

    activeFile: Image;

    inactiveFile: Image;

    handleFileChange(file: Image) {
        this.activeFile = file;
        this.errorActiveFile = '';
    }

    handleFileChangeInActive(file: Image) {
        this.inactiveFile = file;
        this.errorInactiveFile = '';
    }

    handlePropertiesName(value: any, rowIndex: number) {
        this.commonProperties[rowIndex].name = value;
        this.commonProperties[rowIndex].errorPropertiesName = '';
    }

    handleValueType(event: any, rowIndex: number) {
        this.commonProperties[rowIndex].valueType = event;
        this.commonProperties[rowIndex].errorValueType = '';
    }

    deleteProperties(rowIndex: number) {
        this.commonProperties.splice(rowIndex, 1);
    }

    validateCommonProperties() {
        let res = true;
        const validator = new CustomFormValidator();
        this.commonProperties.forEach((p) => {
            if (!validator.isStringInputValid(p.name)) {
                res = false;
                p.errorPropertiesName = 'Vui lòng nhập tên thuộc tính!';
            }
            if (!validator.isObjectInputValid(p.valueType)) {
                res = false;
                p.errorValueType = 'Vui lòng chọn loại giá trị!';
            }
        });
        return res;
    }

    handleAddCommonProperties() {
        if (this.validateCommonProperties()) {
            this.commonProperties.push({
                name: '',
                valueType: '',
                required: false,
                errorPropertiesName: '',
                errorValueType: '',
            });
        }
    }

    handleCloseCreateResourceType() {
        const hasInputData =
            this.name.length > 0 ||
            (this.administrativeUnit &&
                Object.keys(this.administrativeUnit).length > 0) ||
            (this.vmsType && Object.keys(this.vmsType).length > 0);

        if (hasInputData) {
            this.verificationService.saveVerification(() => {
                this.router.navigate(['category', 'resources-type']);
            });
        } else {
            this.router.navigate(['category', 'resources-type']);
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.name)) {
            res = false;
            this.errorName = 'Vui lòng nhập Tên loại tài nguyên';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng nhập Đơn vị hành chính';
        }
        if (!this.activeFile) {
            res = false;
            this.errorActiveFile =
                'Vui lòng chọn Icon hiển thị trạng thái khả dụng';
        }
        if (this.resourceTypeRadio === 'Camera') {
            if (!validator.isObjectInputValid(this.vmsType)) {
                res = false;
                this.errorVmsType = 'Vui lòng nhập Hệ thống quản lý video';
            }

            if (!this.inactiveFile) {
                res = false;
                this.errorInactiveFile =
                    'Vui lòng chọn Icon hiển thị trạng thái không khả dụng';
            }
        } else if (this.resourceTypeRadio === 'IOT') {
            if (!this.inactiveFile) {
                res = false;
                this.errorInactiveFile =
                    'Vui lòng chọn Icon hiển thị trạng thái không khả dụng';
            }
        }
        if (this.commonProperties.length > 0) {
            res = this.validateCommonProperties() ? res : false;
        }
        return res;
    }

    callAddAPI(data: AddResourceTypeBody) {
        this.resourcesTypeService
            .createResourceTypes(data)
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
                                'resources-type',
                            ]);
                        },
                        201,
                    );
                },
            });
    }

    callUpdateAPI(data: UpdateResourceTypeBody) {
        this.resourcesTypeService
            .updateResourceTypes(data, this.id)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (response: CommonResponse) => {
                    this.apiHandlerService.handleSuccess(
                        response,
                        () => {
                            this.router.navigate([
                                'category',
                                'resources-type',
                            ]);
                        },
                        200,
                    );
                },
            });
    }

    async handleCreateOrUpdateResourceType() {
        if (this.validateForm()) {
            this.loading = true;

            const type = this.resourceTypeRadio ?? '';

            let data: any = {
                ...this.resourceTypeData,
                name: this.name,
                type: this.resourceTypeRadio,
                wardCode: this.administrativeUnit.wardCode,
                districtCode: this.administrativeUnit.districtCode,
                provinceCode: this.administrativeUnit.provinceCode,
                isPublic: this.isPublic ? 1 : 0,
                isDefaultOnMap: this.isDefaultOnMap ? 1 : 0,
                activeImage: JSON.stringify(this.activeFile ?? {}),
                passiveImage:
                    type !== 'Tài nguyên thông thường'
                        ? JSON.stringify(this.inactiveFile ?? {})
                        : null,
            };

            if (this.commonProperties.length > 0) {
                const commonProperties = this.commonProperties.map(
                    (item: any) => ({
                        ...item,
                        type: item.valueType.code,
                    }),
                );
                data = { ...data, commonProperties };
            }

            if (type === 'Camera') {
                data = {
                    ...data,
                    vmsId: this.vmsType?.id,
                };
            }

            if (this.pageType === 'create') {
                this.callAddAPI(data);
            }

            if (this.pageType === 'update') {
                this.callUpdateAPI(data);
            }
        }
    }
}
