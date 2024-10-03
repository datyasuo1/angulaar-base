import { Component, Injector } from '@angular/core';
import { extend } from 'lodash';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/app-component-base';
import { DocumentService } from '../../../../service/api/document.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import {
    ISignConfirmPayload,
    ISignDocumentResult,
} from 'src/app/interface/utility/document';
import { finalize, takeUntil } from 'rxjs';

@Component({
    selector: 'app-confirm-signing',
    templateUrl: './confirm-signing.component.html',
    styleUrl: './confirm-signing.component.scss',
})
export class ConfirmSigningComponent extends AppComponentBase {
    confirmSigningForm: FormGroup;
    submitted: boolean = false;
    signResult: ISignDocumentResult;
    title: string = '';
    label: string = '';

    constructor(
        injector: Injector,
        private ref: DynamicDialogRef,
        private documentService: DocumentService,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.signResult = this.config.data.signResult;

        switch (this.signResult.authMode) {
            case 0: {
                this.title = `<p>Bạn đang thực hiện yêu cầu ký số tài liệu <strong>${this.config.data.documentName}</strong>.<br/> 
Vui lòng nhập mật khẩu để tiếp tục.</p>`;
                this.label = `Mật khẩu`;
                break;
            }

            case 1: {
                this.title = `<p>Bạn đang thực hiện yêu cầu ký số tài liệu <strong>${this.config.data.documentName}</strong>.<br/>
Vui lòng nhập mã xác thực OTP được gửi qua mail để tiếp tục.</p>`;
                this.label = `Mã OTP`;
                break;
            }
            case 2: {
                this.title = `<p>Bạn đang thực hiện yêu cầu ký số tài liệu <strong>${this.config.data.documentName}</strong>.<br/>
Vui lòng nhập mã xác thực OTP được gửi qua số điện thoại để tiếp tục.</p>`;
                this.label = `Mã OTP`;
                break;
            }
            case 3: {
                this.title = `<p>Bạn đang thực hiện yêu cầu ký số tài liệu <strong>${this.config.data.documentName}</strong>. <br/>
Vui lòng nhập mã xác thực OTP trong ứng dụng Authenticator để tiếp tục.</p>`;
                this.label = `Mã OTP`;
                break;
            }
        }

        this.confirmSigningForm = this.fb.group({
            otp: [
                '',
                [
                    CustomFormValidator.required('Vui lòng nhập OTP'),
                    CustomFormValidator.maxLength(),
                ],
            ],
        });
    }

    handleConfirm() {
        this.submitted = true;
        if (!this.confirmSigningForm.valid) {
            return;
        }

        const payload = {
            authMode: this.signResult.authMode,
            tranId: this.signResult.tranId,
        } as ISignConfirmPayload;

        switch (this.signResult.authMode) {
            case 0: {
                payload.password = this.confirmSigningForm.value.otp;
                break;
            }
            case 1:
            case 2:
            case 3: {
                payload.otp = Number(this.confirmSigningForm.value.otp);
                break;
            }
        }

        this.isLoading = true;
        this.documentService
            .confirmSignDocument(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.apiHandlerService.handleSuccess(
                    rs,
                    () => {
                        this.ref.close(true);
                    },
                    200,
                );
            });
    }

    handleClose() {
        this.ref.close();
    }
}
