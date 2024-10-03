import {
    Component,
    EventEmitter,
    Injector,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { IAgencyGroup } from 'src/app/interface/category/agency.interface';
import {
    IAppResourceGroup,
    ICreateAppResourcePayload,
    ICreateUpdateResouceVersion,
    ICreateResouceVersionPayload,
    IResourcesVersion,
    IAddResouceGroupPayload,
} from 'src/app/interface/system-management/resource-management.interface';
import { ImageService } from 'src/app/service/api/image.service';
import { ResourceManagementService } from 'src/app/service/api/resource-management.service';
import {
    AppResouceDialogMode,
    AppResourcesVersion,
} from './create-update-resouce.constant';
import { ConfirmationService } from 'primeng/api';
import { IFileUpload } from 'src/app/interface/common.interface';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-create-app-resource',
    templateUrl: './create-app-resource.component.html',
    styleUrl: './create-app-resource.component.scss',
})
export class CreateAppResourceComponent
    extends AppComponentBase
    implements OnInit
{
    resourceName: string = '';
    errorResourceName: string = '';
    selectedResouceGroup = {} as IAppResourceGroup;
    listResourceGroup: IAppResourceGroup[] = [];
    description: string = '';
    showCreateVersionDialog: boolean = false;
    showSelectGroupDialog: boolean = false;
    createdVersionPayload = {} as ICreateResouceVersionPayload;
    listWebVersion: IResourcesVersion[] = [];
    listMobileVersion: IResourcesVersion[] = [];
    listGroup: IAgencyGroup[] = [];
    updatingGroup = {} as IAgencyGroup;
    appImage: File | undefined = undefined;
    webImage: File | undefined = undefined;
    imageHost: string = '';
    currentDialogMode = AppResouceDialogMode.CREATE;
    currentVersionType = AppResourcesVersion.WEB;
    curentResourceMode = AppResouceDialogMode.CREATE;
    currentAppResouceId: number = null;

    currentMobileVersion = {} as IResourcesVersion;
    currentWebVersion = {} as IResourcesVersion;

    versionToUpdate = {} as IResourcesVersion;

    errAppName: string = '';
    errGroup: string = '';
    errDescription: string = '';

    constructor(
        injector: Injector,
        private readonly resourceManagementService: ResourceManagementService,
        private readonly imageService: ImageService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly verificationService: VerificationService,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.currentAppResouceId = Number(
            this.route.snapshot.queryParamMap.get('id'),
        );

        this.callListResouceGroup();
    }

    callListResouceGroup() {
        this.resourceManagementService
            .getResourceGroup()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listResourceGroup = rs.data;
                if (this.currentAppResouceId) {
                    this.callDetail();
                }
            });
    }

    callDetail() {
        this.isLoading = true;
        this.resourceManagementService
            .getAppResourceDetail(this.currentAppResouceId)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.resourceName = rs.data.name;
                this.description = rs.data.description;
                this.selectedResouceGroup = this.listResourceGroup.find(
                    (x) => x.id === Number(rs.data.groupAppId),
                );
                this.listWebVersion = rs.data.webVersions;
                this.currentWebVersion = this.listWebVersion.find(
                    (x) => x.isNowVersion,
                );
                this.listMobileVersion = rs.data.appVersions;
                this.currentMobileVersion = this.listMobileVersion.find(
                    (x) => x.isNowVersion,
                );
                this.listGroup = rs.data.appGroupUsers.map((group) => {
                    return {
                        name: group.groupUserName,
                        id: group.groupUserId,
                        groupId: group.id,
                        agencyId: group.agencyId,
                    } as IAgencyGroup;
                });
                this.imageHost = rs.data.imageHost;
                this.appImage = rs.data.attachFileMobile;
                this.webImage = rs.data.attachFileWeb;
            });
    }

    handleTextChange(description) {
        this.description = description.htmlValue;
        this.errDescription = '';
    }

    handleAppImageChange(file) {
        this.appImage = file;
    }

    handleWebImageChange(file) {
        this.webImage = file;
    }

    handleshowCreateMobileVersion() {
        this.showCreateVersionDialog = true;
        this.versionToUpdate = {} as IResourcesVersion;
        this.currentVersionType = AppResourcesVersion.MOBILE;
        this.currentDialogMode = AppResouceDialogMode.CREATE;
    }
    handleshowCreateWebVersion() {
        this.showCreateVersionDialog = true;
        this.versionToUpdate = {} as IResourcesVersion;
        this.currentVersionType = AppResourcesVersion.WEB;
        this.currentDialogMode = AppResouceDialogMode.CREATE;
    }

    handleCreateGroupDialog() {
        this.showSelectGroupDialog = true;
        this.currentDialogMode = AppResouceDialogMode.CREATE;
    }

    handleCloseCreateVersion() {
        this.showCreateVersionDialog = false;
    }
    handleCloseSelectGroupDialog() {
        this.showSelectGroupDialog = true;
    }
    handleSaveCreateVersion(data: IResourcesVersion) {
        if (this.currentAppResouceId) {
            let oldVersion: number = null;

            if (data.isNowVersion) {
                if (data.isWebVersion) {
                    oldVersion = this.currentWebVersion?.id;
                } else {
                    oldVersion = this.currentMobileVersion?.id;
                }
            }

            this.handleAddNewVersion(
                data,
                oldVersion != this.versionToUpdate.id ? oldVersion : null,
            );
            this.showCreateVersionDialog = false;

            return;
        }

        if (this.currentDialogMode === AppResouceDialogMode.CREATE) {
            if (data.isWebVersion) {
                if (data.isNowVersion) {
                    this.currentWebVersion = data;
                    this.setCurrentVer(this.listWebVersion);
                }
                this.listWebVersion.push(data);
            } else {
                if (data.isNowVersion) {
                    this.currentMobileVersion = data;
                    this.setCurrentVer(this.listMobileVersion);
                }
                this.listMobileVersion.push(data);
            }
        }

        this.showCreateVersionDialog = false;
    }

    handleAddNewVersion(data: IResourcesVersion, oldVersionId: number) {
        const payload = {
            appCategoryId: data.appCategoryId,
            appResourceId: this.currentAppResouceId,
            appStatusId: data.appStatusId,
            description: data.description,
            name: data.name,
            isNowVersion: data.isNowVersion === 1 ? true : false,
            isWebVersion: data.isWebVersion === 1 ? true : false,
            url: data.url || '',
            androidPackageName: data.androidPackageName || '',
            appstoreLink: data.appstoreLink || '',
            iosUrl: data.iosUrl || '',
            parameters: data.parameters,
        } as ICreateUpdateResouceVersion;
        if (this.currentDialogMode === AppResouceDialogMode.CREATE) {
            this.resourceManagementService
                .createAppResourceVersion(oldVersionId, payload)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.callDetail();
                    this.toastService.showSuccess(
                        'Thành công',
                        'Thêm phiên bản ứng dụng thành công',
                        2000,
                    );
                });
        } else {
            this.resourceManagementService
                .updateAppResourceVersion(
                    this.versionToUpdate.id,
                    oldVersionId,
                    payload,
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.callDetail();
                    this.toastService.showSuccess(
                        'Thành công',
                        'Cập nhật phiên bản ứng dụng thành công',
                        2000,
                    );
                    this.versionToUpdate = {} as IResourcesVersion;
                });
        }
    }

    setCurrentVer(list: IResourcesVersion[]) {
        list.forEach((x) => {
            x.isNowVersion = 0;
        });
    }

    hanldeSaveSelectUserGroup(data: IAgencyGroup) {
        if (this.currentAppResouceId) {
            const payload = {
                appResourceId: this.currentAppResouceId,
                groupUserId: data.id.toString(),
            } as IAddResouceGroupPayload;

            if (this.currentDialogMode === AppResouceDialogMode.CREATE) {
                this.resourceManagementService
                    .AddResourceGroup(payload)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.callDetail();
                        this.toastService.showSuccess(
                            'Thành công',
                            'Thêm nhóm người dùng thành công',
                            2000,
                        );
                        return;
                    });
            } else {
                this.resourceManagementService
                    .updateResourceGroup(data.groupId, payload)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.callDetail();
                        this.toastService.showSuccess(
                            'Thành công',
                            'cập nhật nhóm người dùng thành công',
                            2000,
                        );
                        return;
                    });
            }
        }

        if (this.currentDialogMode === AppResouceDialogMode.CREATE) {
            this.listGroup.push(data);
        } else {
            this.listGroup.forEach((group) => {
                if (group.id === this.updatingGroup.id) {
                    group.id = data.id;
                    group.name = data.name;
                }
            });
        }
        this.showSelectGroupDialog = false;
        this.updatingGroup = {} as IAgencyGroup;
    }

    hanldeCloseSelectUserGroup() {
        this.showSelectGroupDialog = false;
        this.updatingGroup = {} as IAgencyGroup;
    }

    handleInputResouceName(data) {
        this.resourceName = data;
        this.errAppName = '';
    }

    handleSelectResouceGroup(group) {
        this.selectedResouceGroup = group;
        this.errGroup = '';
    }
    handleUpdateGroup(data: IAgencyGroup) {
        this.showSelectGroupDialog = true;
        this.updatingGroup = data;
        this.currentDialogMode = AppResouceDialogMode.UPDATE;
    }

    handleUpdateWebVersionDiglog(data: IResourcesVersion) {
        this.versionToUpdate = data;
        this.showCreateVersionDialog = true;
        this.currentVersionType = AppResourcesVersion.WEB;
        this.currentDialogMode = AppResouceDialogMode.UPDATE;
    }
    handleUpdateMobileVersionDiglog(data: IResourcesVersion) {
        this.versionToUpdate = data;
        this.showCreateVersionDialog = true;
        this.currentVersionType = AppResourcesVersion.MOBILE;
        this.currentDialogMode = AppResouceDialogMode.UPDATE;
    }

    handleDeleteAppVersion(data: IResourcesVersion) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa phiên bản mobile <strong>${data.name} </strong>?`,
            () => {
                if (this.currentAppResouceId) {
                    this.resourceManagementService
                        .deleteAppResourceVersion(data.id)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.toastService.showSuccess(
                                'Thành công',
                                'Xóa phiên bản thành công',
                                2000,
                            );
                            this.callDetail();
                        });
                } else {
                    this.removeElement(this.listMobileVersion, data);
                }
            },
        );
    }

    handleDeleteWebVersion(data: IResourcesVersion) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa phiên bản web <strong>${data.name} </strong>?`,
            () => {
                if (this.currentAppResouceId) {
                    this.resourceManagementService
                        .deleteAppResourceVersion(data.id)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.toastService.showSuccess(
                                'Thành công',
                                'Xóa phiên bản thành công',
                                2000,
                            );
                            this.callDetail();
                        });
                } else {
                    this.removeElement(this.listWebVersion, data);
                }
            },
        );
    }

    handleDeleteGroup(data: IAgencyGroup) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa nhóm người dùng <strong>${data.name} </strong>?`,
            () => {
                if (this.currentAppResouceId) {
                    this.resourceManagementService
                        .deleteResourceGroup(data.groupId)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.toastService.showSuccess(
                                'Thành công',
                                'Xóa nhóm người dùng thành công',
                                2000,
                            );
                            this.callDetail();
                        });
                } else {
                    this.removeElement(this.listGroup, data);
                }
            },
        );
    }

    removeElement(list, data) {
        return list.splice(list.indexOf(data), 1);
    }

    async handleCreateResources() {
        if (!this.validFormData()) {
            return;
        }

        const payload = {
            name: this.resourceName,
            description: this.description,
            groupAppId: this.selectedResouceGroup?.id?.toString(),
        } as ICreateAppResourcePayload;

        const uploadImage = async (image, key: string) => {
            if (image && (image.name || image.fileName)) {
                if (image.path) {
                    payload[key] = JSON.stringify(image);
                } else {
                    const formData = new FormData();
                    formData.append('service', 'alarms');
                    formData.append('files', image);
                    const rs = await this.imageService
                        .uploadMultipleFiles(formData)
                        .toPromise();

                    if (rs.data) {
                        payload[key] = JSON.stringify(rs.data).slice(1, -1);
                    }
                }
            }
        };

        await uploadImage(this.appImage, 'attachFileMobile');
        await uploadImage(this.webImage, 'attachFileWeb');

        const listVersion = [...this.listMobileVersion, ...this.listWebVersion];
        if (listVersion.length > 0) {
            payload.applicationResourceVersionDTOS =
                JSON.stringify(listVersion);
        }

        if (this.listGroup.length > 0) {
            payload.applicationResourceGroupUserDTOS = JSON.stringify(
                this.listGroup.map((group) => ({ groupUserId: group.id })),
            );
        }

        if (this.currentAppResouceId) {
            this.isLoading = true;
            this.resourceManagementService
                .updateApplicationResource(this.currentAppResouceId, payload)
                .pipe(
                    takeUntil(this.destroy$),
                    finalize(() => (this.isLoading = false)),
                )
                .subscribe((rs) => {
                    this.router.navigate([
                        '/system-management/resource-application-management',
                    ]);

                    this.toastService.showSuccess(
                        'Thành công',
                        'Cập nhật tài nguyên ứng dụng thành công',
                        2000,
                    );
                });
        } else {
            this.isLoading = true;
            this.resourceManagementService
                .createApplicationResource(payload)
                .pipe(
                    takeUntil(this.destroy$),
                    finalize(() => (this.isLoading = false)),
                )
                .subscribe((rs) => {
                    this.router.navigate([
                        '/system-management/resource-application-management',
                    ]);

                    this.toastService.showSuccess(
                        'Thành công',
                        'Tạo ứng dụng thành công',
                        2000,
                    );
                });
        }
    }

    handleClose() {
        this.router.navigate([
            '/system-management/resource-application-management',
        ]);
    }

    handleClickNowVersion(data: IResourcesVersion) {
        if (data.isWebVersion) {
            this.listWebVersion.forEach((x) => {
                if (JSON.stringify(x) == JSON.stringify(data)) {
                    x.isNowVersion = 1;
                } else {
                    x.isNowVersion = 0;
                }
            });
        } else {
            this.listMobileVersion.forEach((x) => {
                if (JSON.stringify(x) == JSON.stringify(data)) {
                    x.isNowVersion = 1;
                } else {
                    x.isNowVersion = 0;
                }
            });
        }
    }
    getTagServerity(statusId: number) {
        switch (statusId) {
            case 1:
                return 'success';
            case 2:
                return 'secondary';
            case 3:
                return 'danger';
            case 4:
                return 'warning';
            case 5:
                return 'warning';
            case 7:
                return 'success';
            default:
                return 'secondary';
        }
    }

    validFormData() {
        let valid: boolean = true;

        if (!this.resourceName) {
            this.errAppName = 'Hãy nhập tên ứng dụng';
            valid = false;
        }
        if (!this.description) {
            this.errDescription = 'Hãy nhập mô tả';
            valid = false;
        }
        if (!this.selectedResouceGroup?.id) {
            this.errGroup = 'Hãy chọn nhóm ứng dụng';
            valid = false;
        }

        return valid;
    }
}
