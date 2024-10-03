import { Component, Injector, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAddUpdateVirtualMachinePayload,
    IAddVirtualMachineConfig,
    IServerStatus,
    IVirtualMachine,
} from '../../../../interface/system-management/server-management.interface';
import { ServerManagementService } from 'src/app/service/api/server-management.service';
import { takeUntil } from 'rxjs';
import { ActionEnum } from 'src/app/shared/AppEnum';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-add-virtual-machine',
    templateUrl: './add-virtual-machine.component.html',
    styleUrl: './add-virtual-machine.component.scss',
})
export class AddVirtualMachineComponent
    extends AppComponentBase
    implements OnInit
{
    addVirtualMachineForm: FormGroup;
    submitted: boolean = false;
    listStatus: IServerStatus[] = [];
    readonly DIALOG_ACTION = ActionEnum;

    constructor(
        injector: Injector,
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private fb: FormBuilder,
        private readonly serverManagementService: ServerManagementService,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.initForm();
        this.getServerStatus();
        if (this.config.data.virtualMachine) {
            const { name, vCPU, ram, ssd, hdd, ipAddress, monitorLink } =
                this.config.data.virtualMachine;

            this.addVirtualMachineForm.patchValue({
                name,
                vCPU,
                ram,
                ssd,
                hdd,
                ipAddress,
                monitorLink,
            });
        }
    }

    initForm() {
        const minValue: number = 1;
        const maxValue: number = 1024000000;

        this.addVirtualMachineForm = this.fb.group({
            name: [
                '',
                [CustomFormValidator.required('Vui lòng nhập tên máy ảo')],
            ],
            vCPU: [
                null,
                [
                    CustomFormValidator.required('Vui lòng nhập số CPU'),
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            ram: [
                null,
                [
                    CustomFormValidator.required('Vui lòng nhập số RAM'),
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            ssd: [
                null,
                [
                    CustomFormValidator.required('Vui lòng nhập số SSD'),
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            hdd: [
                null,
                [
                    CustomFormValidator.required('Vui lòng nhập số SDD'),
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            ipAddress: [
                '',
                [CustomFormValidator.required('Vui lòng nhập địa chỉ IP')],
            ],
            monitorLink: [''],
            status: [
                null,
                CustomFormValidator.required('Vui lòng chọn trạng thái'),
            ],
        });
    }

    getServerStatus() {
        this.serverManagementService
            .getServerStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listStatus = rs.data;
                if (this.config.data.virtualMachine) {
                    this.addVirtualMachineForm.patchValue({
                        status: this.listStatus.find(
                            (x) =>
                                x.id === this.config.data.virtualMachine.status,
                        ),
                    });
                } else {
                    this.addVirtualMachineForm.patchValue({
                        status: this.listStatus[0],
                    });
                }
            });
    }
    handleClose() {
        this.ref.close();
    }
    handleSave() {
        this.submitted = true;

        if (this.addVirtualMachineForm.valid) {
            const virtualMachine = {
                ...this.addVirtualMachineForm.value,
                status: this.addVirtualMachineForm.value?.status?.id,
                statusName: this.addVirtualMachineForm.value?.status?.name,
            } as IVirtualMachine;

            this.ref.close(virtualMachine);
        }
    }
}
