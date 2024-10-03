import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { AUCodes } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { Address } from 'src/app/interface';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    PublicInfoResponse,
    PublicInfoService,
    PublicInfoType,
    PublicInfoTypesResponse,
} from 'src/app/service/api/public-info.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-create-public-info',
    templateUrl: './create-public-info.component.html',
    styleUrls: ['./create-public-info.component.scss'],
})
export class CreatePublicInfoComponent extends FormBaseComponent {
    constructor(
        private publicInfoService: PublicInfoService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    @ViewChild(MapComponent) mapComponent: MapComponent;

    types: PublicInfoType[] = [];

    type: PublicInfoType;

    errorType: string = '';

    name: string = '';

    errorName: string = '';

    addressStart: Address;

    addressEnd: Address;

    errorAddressStart: string = '';

    administrativeUnit: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    rangeDates: Date[] | undefined = [];
    errorRangeDates: string = '';

    pageType = '';

    cardTitle = '';

    auCodes: AUCodes;

    ngOnInit() {
        if (this.router.url.includes('update')) {
            this.pageType = 'update';
            this.cardTitle = 'Cập nhật thông tin công cộng';

            this.publicInfoService
                .getPublicInfosTypes(-1, 1, '')
                .pipe(
                    switchMap((res: PublicInfoTypesResponse) => {
                        this.types = res?.data;

                        this.id = decryptLong(
                            this.route.snapshot.params?.['id'],
                        );
                        // Call another API after parallel calls
                        return this.publicInfoService.getPublicInfoById(
                            parseInt(this.id),
                        );
                    }),
                )
                .subscribe({
                    next: (res: PublicInfoResponse) => {
                        const {
                            publicInfoTypeId,
                            name,
                            wardCode,
                            districtCode,
                            provinceCode,
                            startAddress,
                            endAddress,
                            startLat,
                            startLng,
                            endLat,
                            endLng,
                            startTime,
                            endTime,
                        } = res.data;
                        this.type = this.types.find(
                            (item: PublicInfoType) =>
                                publicInfoTypeId == item.id,
                        );
                        this.name = name;

                        this.auCodes = {
                            wardCode,
                            districtCode,
                            provinceCode,
                        };

                        this.cdr.detectChanges();

                        this.addressStart = {
                            lat: startLat,
                            lng: startLng,
                            address: startAddress,
                        };
                        this.addressEnd = {
                            lat: endLat,
                            lng: endLng,
                            address: endAddress,
                        };

                        // Update this to take the effect
                        this.rangeDates = [
                            new Date(startTime),
                            new Date(endTime),
                        ];
                    },
                });
        } else {
            this.pageType = 'create';
            this.cardTitle = 'Thêm mới thông tin công cộng';
            this.callPublicInfosType();
        }
    }

    ngAfterViewInit() {
        this.mapComponent.setMap();
    }

    handleStartAddressChange(value: Address) {
        this.addressStart = value;
        this.errorAddressStart = '';
    }

    handleEndAddressChange(value: Address) {
        this.addressEnd = value;
    }

    handleClose() {
        const hasInputData =
            (this.type && Object.keys(this.type).length > 0) ||
            this.name.length > 0 ||
            (this.addressStart && Object.keys(this.addressStart).length > 0) ||
            (this.addressEnd && Object.keys(this.addressEnd).length > 0) ||
            (this.administrativeUnit &&
                Object.keys(this.administrativeUnit).length > 0);

        if (hasInputData) {
            this.verificationService.saveVerification(() => {
                this.router.navigate(['system-management', 'public-info']);
            });
        } else {
            this.router.navigate(['system-management', 'public-info']);
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.name)) {
            res = false;
            this.errorName = 'Vui lòng nhập Tên thông tin công cộng!';
        }
        if (!validator.isObjectInputValid(this.type)) {
            res = false;
            this.errorType = 'Vui lòng chọn Loại thông tin công cộng!';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng chọn Đơn vị hành chính!';
        }
        if (!validator.isObjectInputValid(this.addressStart)) {
            res = false;
            this.errorAddressStart = 'Vui lòng nhập Địa điểm bắt đầu!';
        }
        if (!validator.isRangeDateInputValid(this.rangeDates)) {
            res = false;
            this.errorRangeDates =
                'Vui lòng chọn đầy đủ Thời gian bắt đầu - kết thúc!';
        }

        return res;
    }

    handleAddOrUpdatePublicInfo() {
        if (this.validateForm()) {
            this.loading = true;
            const data = {
                name: this.name,
                infoTypeId: this.type.id,
                startAddress: this.addressStart?.address,
                endAddress: this.addressEnd?.address,
                startTime: this.rangeDates[0],
                endTime: this.rangeDates[1],
                startLat: this.addressStart?.lat,
                startLng: this.addressStart?.lng,
                endLat: this.addressEnd?.lat,
                endLng: this.addressEnd?.lng,
                wardCode: this.administrativeUnit.wardCode,
                districtCode: this.administrativeUnit.districtCode,
                provinceCode: this.administrativeUnit.provinceCode,
            };
            if (this.pageType == 'create') {
                this.publicInfoService
                    .createPublicInfos(data)
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
                                        'public-info',
                                    ]);
                                },
                                201,
                            );
                        },
                    });
            } else {
                this.publicInfoService
                    .updatePublicInfos(data, parseInt(this.id))
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
                                        'public-info',
                                    ]);
                                },
                                200,
                            );
                        },
                    });
            }
        }
    }

    callPublicInfosType() {
        this.publicInfoService.getPublicInfosTypes(-1, 1, '').subscribe({
            next: (res: PublicInfoTypesResponse) => {
                this.types = res?.data;
            },
        });
    }

    // handle update page from here
    id: string;
}
