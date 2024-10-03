import { Component, OnInit } from '@angular/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import {
    FeatureGroup,
    FeatureGroupService,
    FeatureGroupsResponse,
} from 'src/app/service/api/feature-group.service';
import { ImageService } from 'src/app/service/api/image.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import { CommonResponse, Image } from 'src/app/service/common';
import { Platform } from 'src/app/interface';

@Component({
    selector: 'app-feature-group',
    templateUrl: './feature-group.component.html',
    styleUrls: ['./feature-group.component.scss'],
})
export class FeatureGroupComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(
        private featureGroupService: FeatureGroupService,
        private verificationService: VerificationService,
        private imageService: ImageService,
        private apiHandlerService: ApiHandlerService,
        private userInfoService: UserInfoService,
    ) {
        super();
    }

    menuIcon: string = '';

    errorMenuIcon: string = '';

    file: Image;

    searchText: string = '';

    searchTextFeatureCode: string = '';

    currentFeature: string = '';

    showDialog: boolean = false;

    dialogTitle: string = '';

    dialogLoading: boolean = false;

    uiUrl: string = '';

    errorUiUrl: string = '';

    featureGroupName: string = '';

    errorFeatureGroupName: string = '';

    featureGroupCode: string = '';

    errorFeatureGroupCode: string = '';

    parentFeatureGroups: FeatureGroup[] = [];

    errorParentFeatureGroup: string = '';

    selectedParentFeatureGroup: FeatureGroup;

    selectedSearchParentFeatureGroup: FeatureGroup;

    selectedId: number | null;

    import: boolean = false;

    importFile: File;

    errorImportFile: string = '';

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

    selectedPlatform: Platform;

    errorPlatform: string = '';

    override ngOnInit() {
        super.ngOnInit();
        this.getFullFeatureGroups();
    }

    handlePlatformChange(data: Platform) {
        this.selectedPlatform = data;
        this.errorPlatform = '';
    }

    handleFileChange(file: Image) {
        this.file = file;
    }

    handleFeatureGroupsFileChange(file: File) {
        this.importFile = file;
        this.errorImportFile = '';
    }

    handleImport() {
        this.dialogTitle = 'Tải lên danh sách nhóm chức năng';
        this.import = true;
        this.showDialog = true;
    }

    handleUiUrlChange(data: string) {
        this.uiUrl = data;
        this.errorUiUrl = '';
    }

    handleFeatureGroupNameChange(data: string) {
        this.featureGroupName = data;
        this.errorFeatureGroupName = '';
    }

    handleFeatureGroupCodeChange(data: string) {
        this.featureGroupCode = data;
        this.errorFeatureGroupCode = '';
    }

    handleParentFeatureGroupChange(data: FeatureGroup) {
        this.selectedParentFeatureGroup = data;
        this.errorParentFeatureGroup = '';
    }

    handleSearchParentFeatureGroupChange(data: FeatureGroup) {
        this.selectedSearchParentFeatureGroup = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    resetDialog() {
        this.uiUrl = '';
        this.errorUiUrl = '';
        this.featureGroupName = '';
        this.errorFeatureGroupName = '';
        this.featureGroupCode = '';
        this.errorFeatureGroupCode = '';
        this.selectedParentFeatureGroup = null;
        this.errorParentFeatureGroup = '';
        this.selectedId = null;
        this.file = undefined;
        this.importFile = undefined;
        this.errorImportFile = '';
        this.selectedPlatform = null;
        this.errorPlatform = '';
    }

    handleAdd() {
        this.dialogTitle = 'Thêm mới nhóm chức năng';
        this.import = false;
        this.showDialog = true;
    }

    handleEdit(data: any) {
        const { id, name, code, routerLink, parentId, image, icon } =
            data ?? {};
        this.dialogTitle = 'Cập nhật nhóm chức năng';
        this.import = false;
        this.featureGroupName = name;
        this.featureGroupCode = code;
        this.menuIcon = icon;
        this.uiUrl = routerLink || '';
        this.selectedParentFeatureGroup = this.parentFeatureGroups.filter(
            (item) => item.id == parentId,
        )[0];
        if (image && Object.keys(image).length > 0) {
            const img = image;
            img.name = img.fileName;
            this.file = img;
        }

        this.selectedId = id;
        this.selectedPlatform = this.platforms.find(
            (item) => item.name == data.platform,
        );
        this.showDialog = true;
    }

    isValidFile() {
        let valid = true;
        if (!this.importFile) {
            this.errorImportFile = 'Vui lòng chọn file để tải lên!';
            valid = false;
        }
        return valid;
    }

    handleImportFeatureGroup() {
        if (this.isValidFile()) {
            this.dialogLoading = true;
            this.featureGroupService
                .uploadFeatureGroup(this.importFile)
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
            case 'Thêm mới nhóm chức năng':
                this.handleFeatureGroupForm(true);
                break;
            case 'Cập nhật nhóm chức năng':
                this.handleFeatureGroupForm(false);
                break;
            case 'Tải lên danh sách nhóm chức năng':
                this.handleImportFeatureGroup();
                break;
        }
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.featureGroupCode)) {
            this.errorFeatureGroupCode = 'Vui lòng nhập mã nhóm chức năng';
            res = false;
        }
        if (!validator.isStringInputValid(this.featureGroupName)) {
            this.errorFeatureGroupName = 'Vui lòng nhập tên nhóm chức năng';
            res = false;
        }
        if (!validator.isObjectInputValid(this.selectedPlatform)) {
            this.errorPlatform = 'Vui lòng chọn nền tảng';
            res = false;
        }
        return res;
    }

    handleFeatureGroupForm(isAdd: boolean) {
        if (this.validateForm()) {
            this.dialogLoading = true;

            const data = {
                code: this.featureGroupCode,
                name: this.featureGroupName,
                menuIcon: this.menuIcon,
                menuRouterLink: this.uiUrl,
                parentId: this.selectedParentFeatureGroup?.id,
                platform: this.selectedPlatform?.name,
                image: JSON.stringify(this.file ?? {}),
            };

            ((isAdd: boolean) => {
                if (!isAdd) {
                    return this.featureGroupService.updateFeatureGroup(
                        data,
                        this.selectedId,
                    );
                } else {
                    return this.featureGroupService.addFeatureGroup(data);
                }
            })(isAdd)
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        if (isAdd) {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.showDialog = false;
                                    this.getTableData();
                                },
                                201,
                            );
                        } else {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.showDialog = false;
                                    this.userInfoService.updateLocalUserInfo();
                                    this.getTableData();
                                },
                                200,
                            );
                        }
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

    handleMenuIconChange(data: string) {
        this.menuIcon = data;
        this.errorMenuIcon = '';
    }

    handleInputFeatureCodeChange(data: string) {
        this.searchTextFeatureCode = data;
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        this.loading = true;
        const parentId =
            this.selectedSearchParentFeatureGroup?.id?.toString() ?? '';
        this.featureGroupService
            .getFeatureGroups(
                false,
                false,
                '',
                this.currentPage,
                this.rows,
                this.searchText,
                this.searchTextFeatureCode,
                parentId,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: FeatureGroupsResponse) => {
                    this.data = res.data;
                    this.totalRecords = res?.totalElement;
                },
            });
    }

    getFullFeatureGroups() {
        this.featureGroupService.getFeatureGroups().subscribe({
            next: (res: FeatureGroupsResponse) => {
                this.parentFeatureGroups = res.data;
            },
        });
    }

    callDeleteAPI(id: number) {
        this.featureGroupService.deleteFeatureGroup(id).subscribe({
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

    handleConfirmDelete(data: FeatureGroup) {
        this.currentFeature = data?.name;
        this.verificationService.delVerification(
            `Bạn có chắc muốn xoá nhóm chức năng <strong>${this.currentFeature}</strong>?`,
            () => {
                this.callDeleteAPI(data?.id);
            },
        );
    }
}
