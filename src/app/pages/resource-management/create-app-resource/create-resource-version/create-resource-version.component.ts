import {
    Component,
    EventEmitter,
    Injector,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAppResourceCategory,
    IAppResourceStatus,
    ICreateResouceVersionPayload,
    IResourcesVersion,
} from 'src/app/interface/system-management/resource-management.interface';
import { ResourceManagementService } from 'src/app/service/api/resource-management.service';
import { AppResourcesVersion } from '../create-update-resouce.constant';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-create-resource-version',
    templateUrl: './create-resource-version.component.html',
    styleUrl: './create-resource-version.component.scss',
})
export class CreateResourceVersionComponent
    extends AppComponentBase
    implements OnInit
{
    @Output() onSave = new EventEmitter();
    @Output() onClose = new EventEmitter();
    @Input() versionType = AppResourcesVersion.WEB;
    @Input() versionToUpdate = {} as IResourcesVersion;
    versionName: string = '';
    errVersionName: string = '';
    description: string = '';
    appUrl: string = '';
    errAppUrl: string = '';
    listResourceCategory: IAppResourceCategory[] = [];
    selectedResourceCategory = {} as IAppResourceCategory;
    errCategory: string = '';
    listResourceStatus: IAppResourceStatus[] = [];
    selectedResourceStatus = {} as IAppResourceStatus;
    errStatus: string = '';
    isCurrentVersion: number | boolean = false;
    title: string = '';
    showMobileOption: boolean = false;
    androidPackageName: string = '';
    iosUrl: string = '';
    linkAppStore: string = '';
    listParam: string[] = [];
    paramFormControls: FormArray;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private readonly resourceManagementService: ResourceManagementService,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.paramFormControls = this.fb.array([this.createParamControl()]);

        if (this.versionToUpdate.id) {
            this.versionName = this.versionToUpdate.name;
            this.description = this.versionToUpdate.description;
            this.appUrl = this.versionToUpdate.url;
            this.isCurrentVersion = this.versionToUpdate.isNowVersion;

            const listParam = JSON.parse(this.versionToUpdate.parameters);
            while (
                this.paramFormControls?.controls?.length < listParam?.length
            ) {
                this.addControl();
            }

            this.paramFormControls.patchValue(listParam);
        }
        this.callResourceCategory();
        this.callResourceStatus();
    }

    createParamControl(): FormControl {
        return new FormControl('');
    }

    addControl() {
        this.paramFormControls.push(this.createParamControl());
    }

    removeControl(index: number) {
        this.paramFormControls.removeAt(index);
    }

    callResourceCategory() {
        this.resourceManagementService
            .getAppResourceCategory()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                if (this.versionType === AppResourcesVersion.WEB) {
                    this.listResourceCategory = rs.data.filter(
                        (x) => x.isWebCategory,
                    );
                } else {
                    this.listResourceCategory = rs.data.filter(
                        (x) => !x.isWebCategory,
                    );
                }
                if (this.versionToUpdate) {
                    this.selectedResourceCategory =
                        this.listResourceCategory.find(
                            (x) => x.id === this.versionToUpdate.appCategoryId,
                        );

                    if (this.selectedResourceCategory.name === 'Deeplink') {
                        this.showMobileOption = true;
                        this.androidPackageName =
                            this.versionToUpdate.androidPackageName;
                        this.iosUrl = this.versionToUpdate.iosUrl;
                        this.linkAppStore = this.versionToUpdate.appstoreLink;
                    }
                }
            });
    }

    callResourceStatus() {
        this.resourceManagementService
            .getAppResourceStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listResourceStatus = rs.data;
                if (this.versionToUpdate) {
                    this.selectedResourceStatus = this.listResourceStatus.find(
                        (x) => x.id === this.versionToUpdate.appStatusId,
                    );
                }
            });
    }
    handleCreateUpdateVersion() {
        if (!this.validForm()) {
            return;
        }

        const payload = {
            name: this.versionName,
            description: this.description,
            url: this.appUrl,
            appCategoryId: this.selectedResourceCategory.id,
            categoryName: this.selectedResourceCategory.name,
            appStatusId: this.selectedResourceStatus.id,
            statusName: this.selectedResourceStatus.name,
            isNowVersion: this.isCurrentVersion ? 1 : 0,
            isWebVersion: this.versionType === AppResourcesVersion.WEB ? 1 : 0,
            androidPackageName: this.androidPackageName,
            appstoreLink: this.linkAppStore,
            iosUrl: this.iosUrl,
            parameters: this.paramFormControls.value,
        } as IResourcesVersion;
        this.onResetForm();
        this.onSave.emit(payload);
    }
    handleClose() {
        this.onResetForm();
        this.onClose.emit();
    }

    handleCheckCurrentVer(data) {
        this.isCurrentVersion = data.checked;
    }

    onInputName(name) {
        this.versionName = name;
        this.errVersionName = '';
    }

    onInputUrl(url) {
        this.appUrl = url;
        this.errAppUrl = '';
    }

    onInputPackage(data: string) {
        this.androidPackageName = data;
    }
    onInputIosUrl(data: string) {
        this.iosUrl = data;
    }
    onInputLinkAppStore(data: string) {
        this.linkAppStore = data;
    }

    onAddParam(data: string) {
        this.listParam.push(data);
    }

    onSelectCategory(category: IAppResourceCategory) {
        this.selectedResourceCategory = category;
        if (category.name === 'Deeplink') {
            this.showMobileOption = true;
        } else {
            this.showMobileOption = false;
        }
        this.errCategory = '';
    }
    onSelectStatus(status) {
        this.selectedResourceStatus = status;
        this.errStatus = '';
    }
    onResetForm() {
        this.appUrl = '';
        this.versionName = '';
        this.description = '';
        this.isCurrentVersion = 0;
        this.selectedResourceCategory = {} as IAppResourceCategory;
        this.selectedResourceStatus = {} as IAppResourceStatus;
    }

    handleClearResourceCategory() {
        this.showMobileOption = false;
        this.androidPackageName = '';
        this.iosUrl = '';
        this.linkAppStore = '';
    }

    validForm() {
        let valid: boolean = true;
        if (!this.versionName) {
            this.errVersionName = 'Vui lòng nhập tên phiên bản';
            valid = false;
        }
        if (!this.selectedResourceCategory?.id) {
            this.errCategory = 'Vui lòng chọn loại ứng dụng';
            valid = false;
        }
        if (!this.selectedResourceStatus?.id) {
            this.errStatus = 'Vui lòng chọn trạng thái ứng dụng';
            valid = false;
        }
        if (!this.appUrl && !this.showMobileOption) {
            this.errAppUrl = 'Vui lòng nhập url';
            valid = false;
        }
        return valid;
    }
}
