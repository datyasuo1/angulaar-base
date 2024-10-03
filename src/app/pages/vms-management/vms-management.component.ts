import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import {
    AUCodes,
    AuTreeSelectComponent,
} from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { Status } from 'src/app/interface';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    Vms,
    VmsesResponse,
    VmsManagementService,
    VmsType,
    VmsTypesResponse,
} from 'src/app/service/api/vms-management.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { encryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-vms-management',
    templateUrl: './vms-management.component.html',
    styleUrls: ['./vms-management.component.scss'],
})
export class VmsManagementComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private vmsManagementService: VmsManagementService,
        private router: Router,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    vmsName: string = '';

    errorVMSName: string = '';

    vmsTypes: VmsType[] = [];

    vmsType: VmsType;

    selectedVmsType: VmsType;

    errorVmsType: string = '';

    administrativeUnitF: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    link: string = '';

    errorLink: string = '';

    statusTypes: Status[] = [
        {
            name: 'Đang hoạt động',
            code: 'ACTIVE',
        },
        {
            name: 'Không hoạt động',
            code: 'INACTIVE',
        },
    ];

    selectedStatusType: Status;

    errorStatusType: string = '';

    accountName: string = '';

    errorAccountName: string = '';

    password: string = '';

    searchText: string = '';

    searchStatus: Status;

    searchPlaces: string = ', ,';

    dialogTitle: string = '';

    showDialog: boolean = false;

    dialogLoading: boolean = false;

    vmsId: number | undefined;

    currentVmsName: string = '';

    administrativeUnit: AdministrativeUnitTree;

    isPublic: boolean | undefined = undefined;

    auCodes: AUCodes;

    override ngOnInit(): void {
        super.ngOnInit();
        this.callVmsType();
    }

    resetDialog() {
        this.vmsName = '';
        this.errorVMSName = '';
        this.selectedVmsType = undefined;
        this.errorVmsType = '';
        this.administrativeUnit = undefined;
        this.errorAdministrativeUnit = '';
        this.link = '';
        this.errorLink = '';
        this.selectedStatusType = null;
        this.errorStatusType = '';
        this.accountName = '';
        this.errorAccountName = '';
        this.password = '';
        this.isPublic = false;
        this.auCodes = null;
    }

    handleVMSNameChange(value: string) {
        this.vmsName = value;
        this.errorVMSName = '';
    }

    handleVmsTypeChange(event: VmsType) {
        this.selectedVmsType = event;
        this.errorVmsType = '';
    }

    handleAUChange(event: AdministrativeUnitTree) {
        this.administrativeUnit = event;
        this.errorAdministrativeUnit = '';
    }

    handleLinkChange(value: string) {
        this.link = value;
        this.errorLink = '';
    }

    handleStatusTypeChange(event: Status) {
        this.selectedStatusType = event;
        this.errorStatusType = '';
    }

    handleAccountNameChange(value: string) {
        this.accountName = value;
        this.errorAccountName = '';
    }

    handlePasswordChange(value: string) {
        this.password = value;
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleVMSTypeFindChange(data: VmsType) {
        this.vmsType = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleAUFilterChange(event: AdministrativeUnitTree) {
        if (event !== null) {
            this.administrativeUnitF = event;
            const provinceCode = event?.provinceCode ?? '';
            const wardCode = event?.wardCode ?? '';
            const districtCode = event?.districtCode ?? '';
            this.searchPlaces = [wardCode, districtCode, provinceCode].join(
                ',',
            );
        } else {
            this.searchPlaces = ', , ,';
        }
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleStatusChange(data: Status) {
        this.searchStatus = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    callVmsType() {
        this.vmsManagementService
            .getVmsType(-1, this.rows, this.searchText)
            .subscribe({
                next: (res: VmsTypesResponse) => {
                    this.vmsTypes = res?.data;
                    this.loading = false;
                },
            });
    }

    override getTableData() {
        this.loading = true;
        this.vmsManagementService
            .getVmsManagements(
                this.currentPage,
                this.rows,
                this.searchText,
                this.vmsType?.id?.toString() ?? '',
                this.searchStatus?.code ?? '',
                this.searchPlaces,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: VmsesResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }

    handleCreateVms() {
        this.dialogTitle = 'Thêm mới VMS';
        this.showDialog = true;
    }

    watchVmsManagement(id: number) {
        this.router.navigateByUrl(
            `${this.router.url}/watch/${encryptLong(id.toString())}`,
        );
    }

    handleUpdateVms(data: Vms) {
        this.dialogTitle = 'Cập nhật VMS';
        this.showDialog = true;
        this.vmsName = data?.name;
        this.link = data?.url;
        this.accountName = data?.username;
        this.password = data?.password;
        this.vmsId = data?.id;
        this.isPublic = data?.isPublic;
        this.selectedVmsType = this.vmsTypes.filter(
            (item) => item.id == data?.vmsCategoryId,
        )[0];

        this.selectedStatusType =
            data?.status === 'ACTIVE'
                ? {
                      name: 'Đang hoạt động',
                      code: 'ACTIVE',
                  }
                : {
                      name: 'Không hoạt động',
                      code: 'INACTIVE',
                  };
        this.auCodes = {
            wardCode: data.wardCode,
            districtCode: data.districtCode,
            provinceCode: data.provinceCode,
        };
    }

    confirmDeleteVms(data: Vms) {
        this.currentVmsName = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa <strong>${this.currentVmsName}</strong>? `,
            () => {
                this.handleDeleteVmsManagement(data?.id);
            },
        );
    }

    handleDeleteVmsManagement(id: number) {
        this.vmsManagementService.deleteVmsManagement(id).subscribe({
            next: (res: CommonResponse) => {
                this.apiHandlerService.handleSuccess(
                    res,
                    () => {
                        this.getTableData();
                    },
                    200,
                );
            },
        });
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.vmsName)) {
            res = false;
            this.errorVMSName = 'Vui lòng nhập Tên VMS!';
        }
        if (!validator.isObjectInputValid(this.selectedVmsType)) {
            res = false;
            this.errorVmsType = 'Vui lòng chọn Loại VMS!';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng nhập Đơn vị hành chính!';
        }
        if (!validator.isStringInputValid(this.link)) {
            res = false;
            this.errorLink = 'Vui lòng nhập Đường dẫn!';
        }
        return res;
    }

    handleVmsForm() {
        if (this.validateForm()) {
            const data = {
                name: this.vmsName,
                vmsCategoryId: this.selectedVmsType.id,
                url: this.link,
                wardCode: this.administrativeUnitF?.wardCode,
                districtCode: this.administrativeUnitF?.districtCode,
                provinceCode: this.administrativeUnitF?.provinceCode,
                username: this.accountName,
                password: this.password,
                isPublic: this.isPublic,
                status: this.selectedStatusType.code,
            };
            this.dialogLoading = true;
            if (this.dialogTitle === 'Thêm mới VMS') {
                this.vmsManagementService
                    .createVmsManagement(data)
                    .pipe(
                        finalize(() => {
                            this.dialogLoading = false;
                        }),
                    )
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.showDialog = false;
                                    this.getTableData();
                                },
                                201,
                            );
                        },
                    });
            } else {
                if (this.vmsId) {
                    this.vmsManagementService
                        .updateVmsManagement(data, this.vmsId)
                        .pipe(
                            finalize(() => {
                                this.dialogLoading = false;
                            }),
                        )
                        .subscribe({
                            next: (res: CommonResponse) => {
                                this.apiHandlerService.handleSuccess(
                                    res,
                                    () => {
                                        this.showDialog = false;
                                        this.getTableData();
                                    },
                                    200,
                                );
                            },
                        });
                }
            }
        }
    }
}
