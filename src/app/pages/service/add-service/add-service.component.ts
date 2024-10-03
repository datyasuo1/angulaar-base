import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { MapComponent } from 'src/app/components/core/map/map.component';
import { Address } from 'src/app/interface';
import {
    Field,
    FieldService,
    FieldsResponse,
} from 'src/app/service/api/field.service';
import { ImageService } from 'src/app/service/api/image.service';
import {
    PrioritiesResponse,
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import {
    Process,
    ProcessesResponse,
    ProcessService,
} from 'src/app/service/api/process.service';
import { ServiceService } from 'src/app/service/api/service.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-new-service',
    templateUrl: './add-service.component.html',
    styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent extends FormBaseComponent {
    @ViewChild(MapComponent) mapComponent!: MapComponent;

    constructor(
        private verificationService: VerificationService,
        private router: Router,
        private fieldService: FieldService,
        private priorityService: PriorityService,
        private serviceService: ServiceService,
        private processService: ProcessService,
        private apiHandlerService: ApiHandlerService,
        private imageService: ImageService,
    ) {
        super();
    }

    ngOnInit() {
        this.callPrioritiesAPI();
        this.callFieldsAPI();
        this.callProcessList();
    }

    ngAfterViewInit(): void {
        this.mapComponent.setMap();
    }

    process: Process;

    processes: Process[] = [];

    errorProcess: string = '';

    lng: number | null;

    lat: number | null;

    address: string = '';

    title: string = '';

    errorTitle: string = '';

    warningContent: string = '';

    errorContent: string = '';

    field: Field;

    fields: Field[] = [];

    errorField: string = '';

    level: Priority;

    levels: Priority[] = [];

    errorLevel: string = '';

    selectedProcess: any = {};

    showProcessSelection: boolean = false;

    files: File[] = [];

    handleFileChange(files: File[]) {
        this.files = files;
    }

    handleLevelChange(data: Priority) {
        this.level = data;
        this.errorLevel = '';
        this.callProcessByPriorityIdAndFieldId();
    }

    handleFieldChange(data: Field) {
        this.field = data;
        this.errorField = '';
        this.callProcessByPriorityIdAndFieldId();
    }

    callProcessList() {
        this.processService.getComboBoxProcesses(1).subscribe({
            next: (res: ProcessesResponse) => {
                this.processes = res.data;
            },
        });
    }

    callPrioritiesAPI() {
        this.priorityService.getComboBoxPriorities().subscribe({
            next: (res: PrioritiesResponse) => {
                this.levels = res.data;
            },
        });
    }

    callFieldsAPI() {
        this.fieldService.getComboBoxFields().subscribe({
            next: (res: FieldsResponse) => {
                this.fields = res.data;
            },
        });
    }

    callProcessByPriorityIdAndFieldId() {
        const fieldId = this.field?.id;
        const priorityId = this.level?.id;
        if (fieldId && priorityId) {
            this.showProcessSelection = true;
            this.serviceService
                .getProcessByPriorityIdAndFieldId(
                    fieldId,
                    priorityId.toString(),
                )
                .subscribe({
                    next: (res: any) => {
                        if (res.data?.length > 0) {
                            this.selectedProcess = res.data[0];
                        } else {
                            this.selectedProcess = {};
                        }
                    },
                });
        } else {
            this.showProcessSelection = false;
        }
    }

    handleAddressChange(data: Address) {
        this.address = data.address;
        this.lng = data.lng;
        this.lat = data.lat;
    }

    validateForm() {
        let isValid = true;
        const validator = new CustomFormValidator();
        if (!validator.isObjectInputValid(this.level)) {
            this.errorLevel = 'Vui lòng chọn mức độ';
            isValid = false;
        }
        if (!validator.isObjectInputValid(this.field)) {
            this.errorField = 'Vui lòng chọn lĩnh vực';
            isValid = false;
        }
        if (!validator.isStringInputValid(this.title)) {
            this.errorTitle = 'Vui lòng nhập tiêu đề';
            isValid = false;
        }
        if (!validator.isStringInputValid(this.warningContent)) {
            this.errorContent = 'Vui lòng nhập nội dung cảnh báo';
            isValid = false;
        }
        if (!validator.isObjectInputValid(this.selectedProcess)) {
            if (Object.keys(this.process).length == 0) {
                this.errorProcess = 'Vui lòng chọn quy trình';
                isValid = false;
            }
        }
        return isValid;
    }

    async handleAddAlert() {
        if (this.validateForm()) {
            const data: any = {};
            if (this.selectedProcess?.masterProcessId) {
                data.workflowTypeId = this.selectedProcess?.masterProcessId;
            } else {
                data.workflowTypeId = this.process?.id;
            }
            data.content = {
                priority_id: this.level?.id,
                lng: this.lng,
                lat: this.lat,
                location: this.address,
                title: this.title,
                content: this.warningContent,
                field_id: this.field?.id,
            };

            this.loading = true;

            if (this.files.length > 0) {
                data.content = {
                    ...data.content,
                    files: JSON.stringify(this.files),
                };
            }

            this.serviceService
                .createAlert(data)
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
                                    this.router.url.replace('/create', ''),
                                ]);
                            },
                            201,
                        );
                    },
                });
        }
    }

    handleClearAddress() {
        this.address = '';
        this.lat = null;
        this.lng = null;
    }

    handleClose() {
        if (
            this.title != '' ||
            this.warningContent != '' ||
            (this.field && Object.keys(this.field).length > 0) ||
            (this.level && Object.keys(this.level).length > 0) ||
            this.address != ''
        ) {
            this.verificationService.saveVerification(() => {
                this.router.navigate([this.router.url.replace('/create', '')]);
            });
        } else {
            this.router.navigate([this.router.url.replace('/create', '')]);
        }
    }
}
