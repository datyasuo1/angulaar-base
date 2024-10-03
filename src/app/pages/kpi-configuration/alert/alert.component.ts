import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { Address } from 'src/app/interface';
import { Field } from 'src/app/service/api/field.service';
import { KpiConfigurationService } from 'src/app/service/api/kpi-configuration.service';
import { Priority } from 'src/app/service/api/priority.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { KpiConfigInfoService } from 'src/app/service/app/kpi-config-info.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    templateUrl: './alert.component.html',
})
export class AlertComponent extends FormBaseComponent implements OnInit {
    constructor(
        private kpiConfigInfoService: KpiConfigInfoService,
        private router: Router,
        private verificationService: VerificationService,
        private route: ActivatedRoute,
        private kpiConfigurationService: KpiConfigurationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    pageType: string = '';

    @ViewChild(MapComponent) mapComponent!: MapComponent;

    ngOnInit(): void {
        this.kpiConfigInfoService.alertUpdate$.subscribe(() => {
            this.assignData();
        });

        if (this.router.url.includes('create')) {
            this.pageType = 'create';
        }

        if (this.router.url.includes('update')) {
            this.pageType = 'update';
        }

        if (this.router.url.includes('watch')) {
            this.pageType = 'watch';
        }
    }

    ngAfterViewInit(): void {
        this.mapComponent.setMap();
    }

    assignData() {
        const alert = this.kpiConfigInfoService.getAlert();
        this.kpiConfigurationTitle = alert.kpiConfigurationTitle;
        this.field = alert.selectedField;
        this.level = alert.selectedLevel;
        this.fields = alert.fields;
        this.levels = alert.levels;
        this.description = alert.content;
        this.address = alert.address;
    }

    _address: string = '';

    get address() {
        return this._address;
    }

    set address(value: string) {
        this._address = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            address: value,
        });
    }

    _kpiConfigurationTitle: string = '';

    get kpiConfigurationTitle() {
        return this._kpiConfigurationTitle;
    }

    set kpiConfigurationTitle(value: string) {
        this._kpiConfigurationTitle = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            kpiConfigurationTitle: value,
        });
    }

    errorKpiConfigurationTitle: string = '';

    _description: string = '';

    get description() {
        return this._description;
    }

    set description(value: string) {
        this._description = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            content: value,
        });
    }

    errorContent: string = '';

    _field: Field;

    get field() {
        return this._field;
    }

    set field(value: Field) {
        this._field = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            selectedField: value,
        });
    }

    errorField: string = '';

    _level: Priority;

    get level() {
        return this._level;
    }

    set level(value: Priority) {
        this._level = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            selectedLevel: value,
        });
    }

    errorLevel: string = '';

    _fields: Field[] = [];

    get fields() {
        return this._fields;
    }

    set fields(value: Field[]) {
        this._fields = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            fields: value,
        });
    }

    _levels: Priority[] = [];

    get levels() {
        return this._levels;
    }

    set levels(value: Priority[]) {
        this._levels = value;

        this.kpiConfigInfoService.setAlert({
            ...this.kpiConfigInfoService.getAlert(),
            levels: value,
        });
    }

    file: File;

    movePage() {
        this.router.navigateByUrl(
            `${this.router.url.replace('alert', 'threshold')}`,
        );
    }

    handleClose() {
        const threshold = this.kpiConfigInfoService.getThreshold();
        const alert = this.kpiConfigInfoService.getAlert();

        if (
            threshold?.list?.length > 0 ||
            threshold?.kpiConfiguraionName?.length > 0 ||
            (threshold?.selectedServiceType &&
                Object.keys(threshold?.selectedServiceType)?.length > 0) ||
            (alert?.selectedLevel &&
                Object.keys(alert?.selectedLevel)?.length > 0) ||
            (alert?.selectedField &&
                Object.keys(alert?.selectedField)?.length > 0) ||
            alert?.kpiConfigurationTitle?.length > 0
        ) {
            this.verificationService.saveVerification(() => {
                this.router.navigate([
                    'system-management',
                    'kpi-configuration',
                ]);
            });
        } else {
            this.router.navigate(['system-management', 'kpi-configuration']);
        }
    }

    handleFileChange(file: File) {
        this.file = file;
    }

    changeAttribute(data: any[]) {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (item.children) {
                    item.group = item.children;
                    delete item.children;
                }
                if (item.group?.length > 0) {
                    this.changeAttribute(item.group);
                }
            });
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.kpiConfigurationTitle)) {
            res = false;
            this.errorKpiConfigurationTitle = 'Vui lòng nhập tiêu đề!';
        }
        if (!validator.isStringInputValid(this.description)) {
            res = false;
            this.errorContent = 'Vui lòng nhập nội dung!';
        }
        if (!validator.isObjectInputValid(this.field)) {
            res = false;
            this.errorField = 'Vui lòng chọn lĩnh vực!';
        }
        if (!validator.isObjectInputValid(this.level)) {
            res = false;
            this.errorLevel = 'Vui lòng chọn mức độ!';
        }
        return res;
    }

    handleAddOrUpdate() {
        if (this.validateForm()) {
            if (this.pageType == 'create') {
                const threshold = this.kpiConfigInfoService.getThreshold();
                const alert = this.kpiConfigInfoService.getAlert();
                const list = threshold.list;
                this.changeAttribute(list);
                // validate
                if (true) {
                    const data = {
                        name: threshold.kpiConfiguraionName,
                        patternId: threshold.selectedServiceType?.id,
                        groupConditions: list,
                        actions: [
                            {
                                type: 'alert',
                                parameters: {
                                    json: {
                                        content: alert.content,
                                        title: alert.kpiConfigurationTitle,
                                        field_id: alert.selectedField?.id,
                                        files: [],
                                        location: alert.address,
                                        priority_id: alert.selectedLevel?.id,
                                    },
                                },
                            },
                        ],
                    };
                    this.loading = true;
                    this.kpiConfigurationService
                        .createKpiConfiguration(data)
                        .pipe(
                            finalize(() => {
                                setTimeout(() => {
                                    this.loading = false;
                                }, 300);
                            }),
                        )
                        .subscribe({
                            next: (res: CommonResponse) => {
                                this.apiHandlerService.handleSuccess(
                                    res,
                                    () => {
                                        this.router.navigate([
                                            'system-management',
                                            'kpi-configuration',
                                        ]);
                                    },
                                    201,
                                );
                            },
                        });
                }
            }
            if (this.pageType == 'update') {
                const threshold = this.kpiConfigInfoService.getThreshold();
                const alert = this.kpiConfigInfoService.getAlert();
                const list = threshold.list;
                this.changeAttribute(list);
                // validate
                if (true) {
                    const data = {
                        name: threshold.kpiConfiguraionName,
                        patternId: threshold.selectedServiceType?.id,
                        groupConditions: list,
                        actions: [
                            {
                                type: 'alert',
                                parameters: {
                                    json: {
                                        content: alert.content,
                                        title: alert.kpiConfigurationTitle,
                                        field_id: alert.selectedField?.id,
                                        files: [],
                                        location: alert.address,
                                        priority_id: alert.selectedLevel?.id,
                                    },
                                },
                            },
                        ],
                    };
                    this.loading = true;
                    this.kpiConfigurationService
                        .updateKpiConfiguration(
                            data,
                            decryptLong(
                                (this.route.parent.params as any)?._value?.[
                                    'id'
                                ],
                            ),
                        )
                        .pipe(
                            finalize(() => {
                                setTimeout(() => {
                                    this.loading = false;
                                }, 300);
                            }),
                        )
                        .subscribe({
                            next: (res: CommonResponse) => {
                                this.apiHandlerService.handleSuccess(
                                    res,
                                    () => {
                                        this.router.navigate([
                                            'system-management',
                                            'kpi-configuration',
                                        ]);
                                    },
                                    200,
                                );
                            },
                        });
                }
            }
        }
    }

    handleClearAddress() {
        this.address = '';
    }

    lng: number | null = null;

    lat: number | null = null;

    handleAddressChange(data: Address) {
        this.address = data.address;
        this.lng = data.lng;
        this.lat = data.lat;
    }
}
