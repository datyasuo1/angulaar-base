import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAddUpdateServerPayload,
    IAddUpdateVirtualMachinePayload,
    IAddVirtualMachineConfig,
    IGetVirtualMachinePayload,
    IServerStatus,
    IVirtualMachine,
} from 'src/app/interface/system-management/server-management.interface';
import { ServerManagementService } from 'src/app/service/api/server-management.service';
import { ActionEnum } from 'src/app/shared/AppEnum';
import { AddVirtualMachineComponent } from './add-virtual-machine/add-virtual-machine.component';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-create-edit-server',
    templateUrl: './create-edit-server.component.html',
    styleUrl: './create-edit-server.component.scss',
})
export class CreateEditServerComponent
    extends AppComponentBase
    implements OnInit
{
    serverId: number = null;
    listServerStatus: IServerStatus[] = [];
    listVirtualMachine: IVirtualMachine[] = [];
    addServerForm: FormGroup;
    submitted: boolean = false;
    isUpdating: boolean = false;
    searchParams = {
        name: '',
        ipAddress: '',
        monitorLink: '',
    };
    readonly DIALOG_ACTION = ActionEnum;

    constructor(
        injector: Injector,
        private readonly route: ActivatedRoute,
        private readonly serverManagementService: ServerManagementService,
        private readonly verificationService: VerificationService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        super(injector);

        this.serverId = Number(route.snapshot.queryParamMap.get('id'));

        if (this.serverId) {
            this.route.snapshot.data = {
                breadcrumb: 'Cập nhật',
            };
            this.isUpdating = true;
        }
    }
    ngOnInit(): void {
        this.initForm();
        this.callServerStatusAndDetail();
    }

    initForm() {
        const minValue: number = 1;
        const maxValue: number = 1024000000;

        this.addServerForm = this.fb.group({
            name: [
                '',
                [CustomFormValidator.required('Vui lòng nhập tên máy chủ')],
            ],
            ipAddressPhysical: [
                '',
                [
                    CustomFormValidator.required(
                        'Vui lòng nhập địa chỉ IP vật lý',
                    ),
                ],
            ],
            status: [
                null,
                [CustomFormValidator.required('Vui lòng chọn trạng thái')],
            ],
            ram: [
                null,
                [
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
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            vcpu: [
                null,
                [
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
            monitorLink: [''],
        });
    }

    callServerDetail() {
        this.isLoading = true;

        this.serverManagementService
            .getServer(this.serverId)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                const {
                    name,
                    ipAddressPhysical,
                    status,
                    hdd,
                    ssd,
                    ram,
                    vCPU,
                    monitorLink,
                } = rs.data;
                this.addServerForm.patchValue({
                    name,
                    ipAddressPhysical,
                    status: this.listServerStatus.find((x) => x.id == status),
                    hdd,
                    ssd,
                    ram,
                    vcpu: vCPU,
                    monitorLink,
                });
            });
    }

    callListVirtualMachine() {
        const payload = {
            serverId: this.serverId,
            name: this.searchParams.name,
            ipAddress: this.searchParams.ipAddress,
            monitorLink: this.searchParams.monitorLink,
        } as IGetVirtualMachinePayload;

        this.serverManagementService
            .getListVirtualMachine(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listVirtualMachine = rs.data;
            });
    }

    callServerStatusAndDetail() {
        this.serverManagementService
            .getServerStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listServerStatus = rs.data;
                if (this.isUpdating) {
                    this.callServerDetail();
                    this.callListVirtualMachine();
                }
            });
    }

    handleSave() {
        this.submitted = true;
        const payload = {
            ...this.addServerForm.value,
            status: this.addServerForm.value?.status?.id,
            virtualMachine: JSON.stringify(this.listVirtualMachine),
        } as IAddUpdateServerPayload;

        if (this.addServerForm.valid) {
            this.isLoading = true;

            if (this.isUpdating) {
                this.serverManagementService
                    .updateServer(this.serverId, payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.router.navigate([
                                    'system-management/server-management',
                                ]);
                            },
                            200,
                        );
                    });
            } else {
                this.serverManagementService
                    .addServer(payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.router.navigate([
                                    'system-management/server-management',
                                ]);
                            },
                            201,
                        );
                    });
            }
        }
    }
    handleClose() {
        this.router.navigate(['system-management/server-management']);
    }

    handleAddUpdateVirtualMachine(
        machine: IVirtualMachine,
        dialogAction: ActionEnum,
    ) {
        const dialogConfig: IAddVirtualMachineConfig = {
            virtualMachine: machine,
            action: dialogAction,
        };
        const dialogRef = this.openDialog(
            `${dialogConfig.action === ActionEnum.CREATE ? 'Thêm mới' : 'Cập nhật thông tin'} máy ảo`,
            AddVirtualMachineComponent,
            dialogConfig,
        );

        dialogRef.onClose.subscribe((res: IVirtualMachine) => {
            if (res) {
                if (this.isUpdating) {
                    const payload = this.createOrUpdatePayload(res);
                    const serviceFunction =
                        dialogAction === ActionEnum.CREATE
                            ? this.serverManagementService.addVirtualMachine(
                                  payload,
                              )
                            : this.serverManagementService.updateVirtualMachine(
                                  machine.id,
                                  payload,
                              );

                    serviceFunction
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((rs) => {
                            this.apiHandlerService.handleSuccess(
                                rs,
                                () => {
                                    this.callListVirtualMachine();
                                },
                                rs.code,
                            );
                        });
                } else {
                    this.handleLocalUpdate(dialogAction, machine, res);
                }
            }
        });
    }

    private createOrUpdatePayload(
        machine: IVirtualMachine,
    ): IAddUpdateVirtualMachinePayload {
        const { name, ram, ssd, hdd, ipAddress, status, vCPU, monitorLink } =
            machine;
        return {
            name,
            ram,
            ssd,
            hdd,
            ipAddress,
            status,
            vcpu: vCPU,
            serverId: this.serverId,
            monitorLink,
        };
    }

    private handleLocalUpdate(
        action: ActionEnum,
        machine: IVirtualMachine,
        res: IVirtualMachine,
    ) {
        if (action === ActionEnum.CREATE) {
            this.listVirtualMachine.unshift(res);
        } else {
            const machineIndex = this.listVirtualMachine.findIndex(
                (x) => JSON.stringify(x) === JSON.stringify(machine),
            );
            if (machineIndex !== -1) {
                this.listVirtualMachine[machineIndex] = {
                    ...machine,
                    ...res,
                };
            }
        }
    }

    handleDeleteVirtualMachine(machine: IVirtualMachine) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa thông tin máy ảo <strong>${machine.name}</strong>?`,
            () => {
                this.serverManagementService
                    .removeVirtualMachine(machine.id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.callListVirtualMachine();
                            },
                            200,
                        );
                    });
            },
        );
    }

    getTagSeverity(statusId: number) {
        switch (statusId) {
            case 1:
                return 'success';
            case 2:
                return 'secondary';
            default:
                return 'secondary';
        }
    }

    handleSearch(data: string, field: string) {
        this.searchParams[field] = data;
        this.currentPage = 1;
        this.first = 0;
        this.callListVirtualMachine();
    }
}
