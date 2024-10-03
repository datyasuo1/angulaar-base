import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { DeployedSystemService } from '../../../service/api/deployed-system.service';
import { IAddUpdateDeployedSystemPayload } from 'src/app/interface/system-management/deployed-system-management.interface';
import { finalize, takeUntil } from 'rxjs';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';

@Component({
    selector: 'app-create-edit-deployed-system',
    templateUrl: './create-edit-deployed-system.component.html',
    styleUrl: './create-edit-deployed-system.component.scss',
})
export class CreateEditDeployedSystemComponent
    extends AppComponentBase
    implements OnInit
{
    deployedSystemForm: FormGroup;
    systemId: number;
    isUpdating: boolean = false;
    isSubmitted = false;
    constructor(
        injector: Injector,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private readonly deployedSystemService: DeployedSystemService,
    ) {
        super(injector);
        this.systemId = Number(route.snapshot.queryParamMap.get('id'));
        if (this.systemId) {
            this.route.snapshot.data = {
                breadcrumb: 'Cập nhật',
            };
            this.isUpdating = true;
        }
    }
    ngOnInit(): void {
        this.initForm();
        if (this.isUpdating) {
            this.callSystemDetail();
        }
    }

    initForm() {
        const minValue: number = 1;
        const maxValue: number = 1024000000;

        this.deployedSystemForm = this.fb.group({
            name: [
                '',
                [CustomFormValidator.required('Vui lòng nhập tên phần mềm')],
            ],
            domain: [
                '',
                [
                    CustomFormValidator.required(
                        'Vui lòng nhập địa chỉ domain hệ thống',
                    ),
                ],
            ],
            ipAddress: [
                '',
                [CustomFormValidator.required('Vui lòng nhập địa chỉ IP')],
            ],
            monitorAppLink: [
                '',
                [
                    CustomFormValidator.required(
                        'Vui lòng nhập link giám sát tài nguyên hệ thống',
                    ),
                ],
            ],
            serverQuantity: [
                null,
                [
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            serviceQuantity: [
                null,
                [
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            vcpuquantity: [
                null,
                [
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            ramQuantity: [
                null,
                [
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            devDepartment: [''],
            operateDepartment: [''],
        });
    }

    callSystemDetail() {
        this.isLoading = true;

        this.deployedSystemService
            .getSystem(this.systemId)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                const {
                    name,
                    domain,
                    ipAddress,
                    monitorAppLink,
                    devDepartment,
                    operateDepartment,
                    server,
                    service,
                    ram,
                    vCPU,
                } = rs.data;
                this.deployedSystemForm.setValue({
                    name,
                    domain,
                    ipAddress,
                    monitorAppLink,
                    devDepartment,
                    operateDepartment,
                    serverQuantity: server,
                    serviceQuantity: service,
                    vcpuquantity: vCPU,
                    ramQuantity: ram,
                });
            });
    }

    handleSave() {
        this.isSubmitted = true;

        if (this.deployedSystemForm.valid) {
            this.isLoading = true;
            const payload = this.deployedSystemForm
                .value as IAddUpdateDeployedSystemPayload;

            if (this.isUpdating) {
                this.deployedSystemService
                    .updateSystem(this.systemId, payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((res) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.navigateToListSystem();
                            },
                            200,
                        );
                    });
            } else {
                this.deployedSystemService
                    .addSystem(payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((res) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.navigateToListSystem();
                            },
                            201,
                        );
                    });
            }
        }
    }
    handleClose() {
        this.navigateToListSystem();
    }

    navigateToListSystem() {
        this.router.navigate(['system-management/deployed-system-management']);
    }
}
