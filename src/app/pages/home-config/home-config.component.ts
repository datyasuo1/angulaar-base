import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import { HomeConfigService } from 'src/app/service/api/home-config.service';
import { ImageService } from 'src/app/service/api/image.service';

import { takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAppVersion,
    ICreateAppVersionPayload,
} from 'src/app/interface/system-management/home-config';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { AddAppVersionComponent } from './add-app-version/add-app-version.component';

@Component({
    selector: 'app-home-config',
    templateUrl: './home-config.component.html',
    styleUrls: ['./home-config.component.scss'],
})
export class HomeConfigComponent extends AppComponentBase implements OnInit {
    constructor(
        private homeConfigService: HomeConfigService,
        private router: Router,
        private verificationService: VerificationService,
        private imageService: ImageService,
        private injector: Injector,
    ) {
        super(injector);
    }

    title: string = '';

    errorTitle: string = '';

    systemName: string = '';

    errorSystemName: string = '';

    description: string = '';

    errorDescription: string = '';

    displayContent: boolean = true;

    files: any[] = [];

    homeConfigData: any = {};

    dataChange = false;

    listAppVersion: IAppVersion[] = [];

    isUpdatingVersion: boolean = false;

    isUploadFileError: boolean = false;

    ngOnInit() {
        this.getHomeConfig();
        this.getAppVersions();
    }

    getHomeConfig() {
        this.homeConfigService
            .getHomeDashboard()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res: any) => {
                    this.homeConfigData = res.data;
                    this.title = this.homeConfigData.title;
                    this.systemName = this.homeConfigData.systemName;
                    this.displayContent = this.homeConfigData.isShowDescription;
                    this.description = this.homeConfigData.description;
                    this.homeConfigData?.image.forEach((element: any) => {
                        element.name = element.fileName;
                    });
                    this.files = this.homeConfigData?.image || [];
                },
            });
    }

    getAppVersions() {
        this.homeConfigService
            .getAppVersions()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listAppVersion = rs.data;
            });
    }

    handleTitleChange(value: string) {
        this.title = value;
        this.errorTitle = '';
        this.dataChange = true;
    }

    handleSystemNameChange(value: string) {
        this.systemName = value;
        this.errorSystemName = '';
        this.dataChange = true;
    }

    handleFileChange(fileResponses: any) {
        if (fileResponses.error) {
            this.isUploadFileError = true;
            return;
        }

        this.files = fileResponses.files;
        this.dataChange = true;
        this.isUploadFileError = false;
    }

    handleTextChange(data: string) {
        this.description = data;
        this.dataChange = true;
        this.errorDescription = '';
    }

    handleSwitchChange(data: boolean) {
        this.displayContent = data;
        this.dataChange = true;
    }

    handleCloseHomeConfig() {
        if (this.dataChange) {
            this.verificationService.saveVerification(() => {
                this.router.navigateByUrl('/home');
            });
        } else {
            this.router.navigateByUrl('/home');
        }
    }

    validateSaveConfig() {
        let isValid: boolean = true;
        if (!this.title || this.title.trim() == '') {
            this.errorTitle = 'Vui lòng nhập tên ứng dụng';
            isValid = false;
        }
        if (!this.systemName || this.systemName.trim() == '') {
            this.errorSystemName = 'Vui lòng nhập tên hệ thống';
            isValid = false;
        }
        if (
            !this.description ||
            this.description.trim() == '' ||
            this.description == '<p></p>'
        ) {
            this.errorDescription = 'Vui lòng nhập nội dung giới thiệu';
            isValid = false;
        }
        if (this.isUploadFileError) {
            isValid = false;
        }

        return isValid;
    }

    async handleSaveHomeConfig() {
        if (!this.validateSaveConfig()) {
            return;
        }

        this.isLoading = true;
        const newFiles = this.files.filter((x) => x instanceof File);
        const filesToSave = this.files.filter((x) => !(x instanceof File));

        if (newFiles.length > 0) {
            const formData = new FormData();
            formData.append('service', 'home-dashboards');

            newFiles.forEach((file) => formData.append('files', file));

            let res: any = {};

            res = await lastValueFrom(
                this.imageService.uploadMultipleFiles(formData),
            ).catch(() => {
                this.isLoading = false;
            });

            filesToSave.push(...res.data);
            const data = {
                title: this.title,
                systemName: this.systemName,
                description: this.description,
                isShowDescription: this.displayContent,
                image: JSON.stringify(filesToSave),
            };

            this.homeConfigService
                .updateHomeDashboard(data)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.dataChange = false;
                                this.router.navigate(['/home']);
                            },
                            200,
                        );
                    },
                });
        } else {
            const data = {
                title: this.title,
                systemName: this.systemName,
                description: this.description,
                isShowDescription: this.displayContent,
                image: JSON.stringify(filesToSave),
            };
            this.homeConfigService
                .updateHomeDashboard(data)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.dataChange = false;
                                this.router.navigate(['/home']);
                            },
                            200,
                        );
                    },
                });
        }
    }

    handleSetCurrentVersion(version: IAppVersion) {
        this.isUpdatingVersion = true;

        this.listAppVersion.forEach((x) => {
            if (x.id != version.id) {
                x.isCurrent = 0;
            }
        });

        const payload = {
            version: version.version,
            description: version.description,
            isCurrent: true,
        } as ICreateAppVersionPayload;

        this.homeConfigService
            .setCurrentAppVersions(version.id, payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isUpdatingVersion = false)),
            )
            .subscribe((res) => {
                this.apiHandlerService.handleSuccess(
                    res,
                    () => {
                        this.getAppVersions();
                    },
                    200,
                );
            });
    }

    handleRemoveVersion(version: IAppVersion) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa phiên bản <strong>${version.version}</strong>?`,
            () => {
                this.homeConfigService
                    .removeAppVersions(version.id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.getAppVersions();
                            },
                            200,
                        );
                    });
            },
        );
    }

    handleAddVersion() {
        const ref = this.openDialog(
            'Thêm phiên bản ứng dụng',
            AddAppVersionComponent,
        );
        ref.onClose.subscribe((rs) => {
            if (rs) {
                this.getAppVersions();
                this.toastService.showSuccess(
                    'Thành công',
                    'Thêm phiên bản thành công',
                );
            }
        });
    }
}
