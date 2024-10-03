import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ICreateAppVersionPayload } from 'src/app/interface/system-management/home-config';
import { HomeConfigService } from 'src/app/service/api/home-config.service';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-add-app-version',
    templateUrl: './add-app-version.component.html',
    styleUrl: './add-app-version.component.scss',
})
export class AddAppVersionComponent extends AppComponentBase {
    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private homeConfigService: HomeConfigService,
        public ref: DynamicDialogRef,
    ) {
        super(injector);
    }
    appVersionForm: FormGroup;
    isSubmitted: boolean = false;
    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.appVersionForm = this.fb.group({
            version: [
                '',
                [
                    CustomFormValidator.required('Vui lòng nhập tên phiên bản'),
                    CustomFormValidator.maxLength(),
                ],
            ],
            description: [''],
            isCurrent: [false],
        });
    }

    handleSave() {
        this.isSubmitted = true;
        if (this.appVersionForm.valid) {
            this.isLoading = true;

            const payload = this.appVersionForm
                .value as ICreateAppVersionPayload;
            this.homeConfigService
                .addAppVersions(payload)
                .pipe(
                    takeUntil(this.destroy$),
                    finalize(() => (this.isLoading = false)),
                )
                .subscribe(() => {
                    this.ref.close(true);
                });
        }
    }

    handleClose() {
        this.ref.close();
    }
}
