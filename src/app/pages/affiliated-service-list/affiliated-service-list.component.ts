import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { AUCodes } from 'src/app/components/common/au-tree-select/au-tree-select.component';
import { Status } from 'src/app/interface';
import { AdministrativeUnitTree } from 'src/app/service/api/administrative-unit.service';
import {
    AffiliatedService,
    AffiliatedServiceListService,
    AffiliatedServicesResponse,
    SystemType,
    SystemTypesResponse,
} from 'src/app/service/api/affiliated-service-list.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-affiliated-service-list',
    templateUrl: './affiliated-service-list.component.html',
    styleUrls: ['./affiliated-service-list.component.scss'],
})
export class AffiliatedServiceListComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private affiliatedServiceListService: AffiliatedServiceListService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.callSystemType();
    }

    dialogLoading: boolean = false;

    showDialogDetail: boolean = false;

    searchText: string = '';

    showDialog: boolean = false;

    systemName: string = '';

    errorSystemName: string = '';

    link: string = '';

    errorLink: string = '';

    accountName: string = '';

    errorAccountName: string = '';

    password: string = '';

    errorPassword: string = '';

    status: Status = {
        name: '',
        code: '',
    };

    refreshTime: number | string;

    errorRefreshTime: string = '';

    administrativeUnit: AdministrativeUnitTree;

    administrativeUnitF: AdministrativeUnitTree;

    errorAdministrativeUnit: string = '';

    key: string = '';

    systemTypes: SystemType[];

    selectedSystemType: SystemType;

    errorSystemType: string = '';

    clientId: string = '';

    clientSecret: string = '';

    dialogTitle: string = '';

    serviceId: number | undefined;

    auCodes: AUCodes;

    resetDialog() {
        this.systemName = '';
        this.errorSystemName = '';
        this.accountName = '';
        this.errorAccountName = '';
        this.link = '';
        this.errorLink = '';
        this.password = '';
        this.errorPassword = '';
        this.refreshTime = null;
        this.errorRefreshTime = '';
        this.administrativeUnit = null;
        this.errorAdministrativeUnit = '';
        this.clientId = '';
        this.clientSecret = '';
        this.key = '';
        this.status = { code: '', name: '' };
        this.selectedSystemType = null;
        this.errorSystemType = '';
        this.auCodes = null;
    }

    getAUColumn(data: AffiliatedService) {
        const { wardName, districtName, provinceName } = data ?? {};
        return wardName || districtName || provinceName || '';
    }

    handleUpdate(data: AffiliatedService) {
        const {
            wardCode,
            districtCode,
            provinceCode,
            name,
            link,
            username,
            password,
            refreshTime,
            key,
            clientId,
            clientSecret,
            statusId,
            type,
            id,
        } = data ?? {};
        this.dialogTitle = 'Cập nhật dịch vụ liên kết';
        this.showDialog = true;
        this.systemName = name;
        this.link = link;
        this.accountName = username;
        this.password = password;
        this.refreshTime = refreshTime;
        this.key = key;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.status = {
            name: statusId === '1' ? 'Hoạt động' : 'Không hoạt động',
            code: statusId,
        };

        this.selectedSystemType = this.systemTypes.filter(
            (systemType) => systemType.id === type,
        )[0];

        this.serviceId = id;

        this.auCodes = {
            wardCode,
            districtCode,
            provinceCode,
        };
    }

    detailData: AffiliatedService;

    handleViewDetail(data: AffiliatedService) {
        this.detailData = data;
        this.showDialogDetail = true;
    }

    handleAdd() {
        this.dialogTitle = 'Thêm mới dịch vụ liên kết';
        this.showDialog = true;
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.systemName)) {
            res = false;
            this.errorSystemName = 'Vui lòng nhập tên hệ thống!';
        }
        if (!validator.isStringInputValid(this.link)) {
            res = false;
            this.errorLink = 'Vui lòng nhập đường dẫn!';
        }
        if (!validator.isObjectInputValid(this.administrativeUnit)) {
            res = false;
            this.errorAdministrativeUnit = 'Vui lòng chọn đơn vị hành chính!';
        }
        return res;
    }

    handleServiceForm() {
        const isAdd = this.dialogTitle === 'Thêm mới dịch vụ liên kết';
        if (this.validateForm()) {
            const { wardCode, districtCode, provinceCode } =
                this.administrativeUnit ?? {};
            const data = {
                name: this.systemName?.trim(),
                link: this.link?.trim(),
                statusId: this.status?.code,
                username: this.accountName?.trim(),
                password: this.password?.trim(),
                refreshTime: this.refreshTime?.toString(),
                clientId: this.clientId?.trim(),
                clientSecret: this.clientSecret?.trim(),
                wardCode,
                districtCode,
                provinceCode,
                type: this.selectedSystemType?.id,
                key: this.key?.trim(),
                statusConnect: this.status.code === '1' || isAdd ? '1' : '0',
            };
            this.dialogLoading = true;
            if (isAdd) {
                this.affiliatedServiceListService
                    .addAffiliatedService(data)
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
                if (this.serviceId) {
                    this.affiliatedServiceListService
                        .updateAffiliatedService(this.serviceId, data)
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

    handleDeleteService(id: number) {
        this.affiliatedServiceListService
            .deleteAffiliatedService(id)
            .subscribe({
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

    handleConfirmDelete(data: AffiliatedService) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá dịch vụ <strong>${data.name}</strong>?`,
            () => {
                this.handleDeleteService(data.id);
            },
        );
    }

    handleSystemNameChange(value: string) {
        this.systemName = value;
        this.errorSystemName = '';
    }

    handlePasswordChange(value: string) {
        this.password = value;
        this.errorPassword = '';
    }

    handleLinkChange(value: string) {
        this.link = value;
        this.errorLink = '';
    }

    handleAccountNameChange(value: string) {
        this.accountName = value;
        this.errorAccountName = '';
    }

    handleRefreshTimeChange(value: number) {
        this.refreshTime = value;
        this.errorRefreshTime = '';
    }

    handleAdministrativeUnitChange(value: AdministrativeUnitTree) {
        this.administrativeUnit = value;
        this.errorAdministrativeUnit = '';
    }

    handleAUFilterChange(value: AdministrativeUnitTree) {
        this.administrativeUnitF = value;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleKeyChange(value: string) {
        this.key = value;
    }

    handleSystemTypeChange(value: SystemType) {
        this.selectedSystemType = value;
        this.errorSystemType = '';
    }

    handleClientIdChange(value: string) {
        this.clientId = value;
    }

    handleClientSecretChange(value: string) {
        this.clientSecret = value;
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    callSystemType() {
        this.affiliatedServiceListService.getSystemType().subscribe({
            next: (res: SystemTypesResponse) => {
                this.systemTypes = res?.data;
            },
        });
    }

    override getTableData() {
        this.loading = true;

        const selectedPlace = this.administrativeUnitF;

        const { wardCode, districtCode, provinceCode } = selectedPlace ?? {};

        const place = `${wardCode ?? ''},${districtCode ?? ''},${
            provinceCode ?? ''
        }`;

        this.affiliatedServiceListService
            .getAffiliatedServiceList(
                this.currentPage,
                this.rows,
                this.searchText,
                place,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: AffiliatedServicesResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }
}
