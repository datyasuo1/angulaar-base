import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-password-update',
    templateUrl: './password-update.component.html',
    styleUrls: ['./password-update.component.scss'],
})
export class PasswordUpdateComponent {
    constructor(
        private userService: UserService,
        private apiHandlerService: ApiHandlerService,
    ) {}
    currentPassword: string = '';

    errorCurrentPassword: string = '';

    newPassword: string = '';

    errorNewPassword: string = '';

    confirmNewPassword: string = '';

    errorConfirmNewPassword: string = '';

    loading = false;

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();

        if (!validator.isStringInputValid(this.currentPassword)) {
            res = false;
            this.errorCurrentPassword = 'Vui lòng nhập mật khẩu hiện tại!';
        }

        if (this.newPassword != this.confirmNewPassword) {
            res = false;
            this.errorConfirmNewPassword = 'Xác nhận mật khẩu không khớp!';
        }

        if (!validator.isPasswordValid(this.newPassword)) {
            res = false;
            this.errorNewPassword =
                'Mật khẩu phải từ 8-20 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
        }

        if (!validator.isPasswordValid(this.confirmNewPassword)) {
            res = false;
            this.errorConfirmNewPassword =
                'Mật khẩu phải từ 8-20 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
        }

        if (!validator.isStringInputValid(this.newPassword)) {
            res = false;
            this.errorNewPassword = 'Vui lòng nhập mật khẩu mới!';
        }

        if (!validator.isStringInputValid(this.confirmNewPassword)) {
            res = false;
            this.errorConfirmNewPassword =
                'Vui lòng nhập xác nhận mật khẩu mới!';
        }

        return res;
    }

    handleUpdatePassword() {
        if (this.validateForm()) {
            this.loading = true;
            const body = {
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
                confirmNewPassword: this.confirmNewPassword,
            };
            this.userService
                .updatePassword(body)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(res);
                    },
                });
        }
    }

    handleCurrentPasswordChange() {
        this.errorCurrentPassword = '';
    }
    handleConfPasswordChange() {
        this.errorConfirmNewPassword = '';
    }
    handleNewPasswordChange() {
        this.errorNewPassword = '';
    }
}
