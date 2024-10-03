import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import {
    FeatureGroup,
    FeatureGroupService,
    FeatureGroupsResponse,
} from 'src/app/service/api/feature-group.service';
import {
    Feature,
    FeatureService,
    FeaturesResponse,
} from 'src/app/service/api/feature.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import { APIMethod, Platform } from 'src/app/interface';
import { CommonResponse } from 'src/app/service/common';

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent extends TableBaseComponent {
    constructor(
        private featureService: FeatureService,
        private verificationService: VerificationService,
        private featureGroupService: FeatureGroupService,
        private apiHandlerService: ApiHandlerService,
        private userInfoService: UserInfoService,
    ) {
        super();
    }

    searchText: string = '';

    searchTextFeatureCode: string = '';

    currentFeature: string = '';

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogLoading: boolean = false;

    uiUrl: string = '';

    errorUiUrl: string = '';

    apiUrl: string = '';

    errorApiUrl: string = '';

    methodList: APIMethod[] = [
        {
            name: 'GET',
            code: 'GET',
        },
        {
            name: 'POST',
            code: 'POST',
        },
        {
            name: 'PUT',
            code: 'PUT',
        },
        {
            name: 'PATCH',
            code: 'PATCH',
        },
        {
            name: 'DELETE',
            code: 'DELETE',
        },
        {
            name: 'HEAD',
            code: 'HEAD',
        },
        {
            name: 'OPTIONS',
            code: 'OPTIONS',
        },
    ];

    selectedMethod: APIMethod;

    errorMethod: string = '';

    featureName: string = '';

    errorFeatureName: string = '';

    featureCode: string = '';

    errorFeatureCode: string = '';

    featureGroups: FeatureGroup[] = [];

    errorFeatureGroup: string = '';

    selectedFeatureGroup: FeatureGroup;

    selectedSearchFeatureGroup: FeatureGroup;

    selectedId: number | null;

    import: boolean = false;

    file: File;

    errorFile: string = '';

    platforms: Platform[] = [
        {
            name: 'WEB',
            code: 1,
        },
        {
            name: 'MOBILE',
            code: 2,
        },
        {
            name: 'MULTI',
            code: 3,
        },
    ];

    selectedPlatform: Platform = undefined;

    errorPlatform: string = '';

    override ngOnInit() {
        super.ngOnInit();
        this.callFeatureGroupsAPI();
    }

    callFeatureGroupsAPI() {
        this.featureGroupService.getFeatureGroups().subscribe({
            next: (res: FeatureGroupsResponse) => {
                this.featureGroups = res.data;
            },
        });
    }

    handlePlatformChange(data: Platform) {
        this.selectedPlatform = data;
        this.errorPlatform = '';
    }

    handleFileChange(file: File) {
        this.file = file;
        this.errorFile = '';
    }

    handleImport() {
        this.dialogTitle = 'Tải lên danh sách chức năng';
        this.import = true;
        this.showDialog = true;
    }

    handleUiUrlChange(data: string) {
        this.uiUrl = data;
        this.errorUiUrl = '';
    }

    handleApiUrlChange(data: string) {
        this.apiUrl = data;
        this.errorApiUrl = '';
    }

    handleMethodChange(data: APIMethod) {
        this.selectedMethod = data;
        this.errorMethod = '';
    }

    handleFeatureNameChange(data: string) {
        this.featureName = data;
        this.errorFeatureName = '';
    }

    handleFeatureCodeChange(data: string) {
        this.featureCode = data;
        this.errorFeatureCode = '';
    }

    handleFeatureGroupChange(data: FeatureGroup) {
        this.selectedFeatureGroup = data;
        this.errorFeatureGroup = '';
    }

    handleSearchFeatureGroupChange(data: FeatureGroup) {
        this.selectedSearchFeatureGroup = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    resetDialog() {
        this.uiUrl = '';
        this.errorUiUrl = '';
        this.apiUrl = '';
        this.errorApiUrl = '';
        this.selectedMethod = null;
        this.errorMethod = '';
        this.featureName = '';
        this.errorFeatureName = '';
        this.featureCode = '';
        this.errorFeatureCode = '';
        this.selectedFeatureGroup = null;
        this.errorFeatureGroup = '';
        this.selectedId = null;
        this.file = undefined;
        this.errorFile = '';
    }

    handleAdd() {
        this.dialogTitle = 'Thêm mới chức năng';
        this.import = false;
        this.showDialog = true;
    }

    handleEdit(data: Feature) {
        this.dialogTitle = 'Cập nhật chức năng';
        this.import = false;
        this.featureName = data.name;
        this.featureCode = data.code;
        this.apiUrl = data.apiPath;
        this.uiUrl = data.uiPath;
        this.selectedMethod = {
            name: data.method,
            code: data.method,
        };
        this.selectedFeatureGroup = this.featureGroups.filter(
            (g) => g.id == data.categoryId,
        )[0];
        this.selectedId = data.id;
        this.selectedPlatform = this.platforms.find(
            (item) => item.name == data.platform,
        );
        this.showDialog = true;
    }

    isValidFile() {
        let res = true;
        if (!this.file) {
            this.errorFile = 'Vui lòng chọn file để tải lên!';
            res = false;
        }
        return res;
    }

    handleImportFeature() {
        if (this.isValidFile()) {
            this.dialogLoading = true;
            this.featureService
                .uploadFeatures(this.file)
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
                                this.import = false;
                            },
                            200,
                        );
                    },
                });
        }
    }

    handleDialogButtonClick() {
        switch (this.dialogTitle) {
            case 'Thêm mới chức năng':
                this.addNewFeature();
                break;
            case 'Cập nhật chức năng':
                this.updateFeature();
                break;
            case 'Tải lên danh sách chức năng':
                this.handleImportFeature();
                break;
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.featureCode)) {
            this.errorFeatureCode = 'Vui lòng nhập mã chức năng';
            res = false;
        }
        if (!validator.isStringInputValid(this.featureName)) {
            this.errorFeatureName = 'Vui lòng nhập tên chức năng';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedMethod)) {
            this.errorMethod = 'Vui lòng chọn phương thức';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedFeatureGroup)) {
            this.errorFeatureGroup = 'Vui lòng chọn nhóm chức năng';
            res = false;
        }
        if (!validator.isStringInputValid(this.apiUrl)) {
            this.errorApiUrl = 'Vui lòng nhập đường dẫn API';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedPlatform)) {
            this.errorPlatform = 'Vui lòng chọn nền tảng';
            res = false;
        }
        return res;
    }

    updateFeature() {
        if (this.validateForm()) {
            const data = {
                code: this.featureCode,
                name: this.featureName,
                method: this.selectedMethod?.name,
                apiPath: this.apiUrl,
                uiPath: this.uiUrl,
                permissionCategoryId: this.selectedFeatureGroup?.id,
                platform: this.selectedPlatform?.name,
            };
            this.dialogLoading = true;
            this.featureService
                .updateFeature(data, this.selectedId)
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
                                this.userInfoService.updateLocalUserInfo();
                                this.getTableData();
                            },
                            200,
                        );
                    },
                });
        }
    }

    addNewFeature() {
        if (this.validateForm()) {
            const data = {
                code: this.featureCode,
                name: this.featureName,
                method: this.selectedMethod?.name,
                apiPath: this.apiUrl,
                uiPath: this.uiUrl,
                permissionCategoryId: this.selectedFeatureGroup?.id,
                platform: this.selectedPlatform?.name,
            };
            this.dialogLoading = true;
            this.featureService
                .addFeature(data)
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
        }
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    handleInputFeatureCodeChange(data: string) {
        this.searchTextFeatureCode = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        const categoryId =
            this.selectedSearchFeatureGroup?.id?.toString() ?? '';
        this.featureService
            .getFeatures(
                this.currentPage,
                this.rows,
                this.searchText,
                this.searchTextFeatureCode,
                categoryId,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: FeaturesResponse) => {
                    this.data = res.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    callDeleteAPI(id: number) {
        this.featureService.deleteFeature(id).subscribe({
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

    handleConfirmDelete(data: Feature) {
        this.currentFeature = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá chức năng <strong>${this.currentFeature}</strong>?`,
            () => {
                this.callDeleteAPI(data?.id);
            },
        );
    }
}
