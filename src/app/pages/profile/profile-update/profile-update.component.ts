import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { Gentle } from 'src/app/interface';
import { UserService } from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-profile-update',
    templateUrl: './profile-update.component.html',
    styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent extends FormBaseComponent {
    constructor(
        private userInfoService: UserInfoService,
        private userService: UserService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    ngOnInit() {
        this.setUpData();
    }

    setUpData() {
        this.userInfo = this.userInfoService.getUserInfo();
        const {
            username,
            email,
            fullName,
            mainPhone,
            address,
            citizenId,
            sex,
            birthday,
        } = this.userInfo ?? {};

        this.username = username ?? '';
        this.email = email ?? '';
        this.fullName = fullName ?? '';
        this.phoneNumber = mainPhone ?? '';
        this.address = address ?? '';
        this.cccd = citizenId ?? '';
        this.gentle = this.gentles.find(
            (item: { label: string; code: string }) =>
                item.code === sex.toString(),
        );

        this.date = birthday ? new Date(birthday) : null;
    }

    username: string = '';

    fullName: string = '';

    errorFullName: string = '';

    phoneNumber: string = '';

    errorPhoneNumber: string = '';

    email: string = '';

    errorEmail: string = '';

    cccd: string = '';

    errorCccd: string = '';

    date: Date = new Date();

    gentles: Gentle[] = [
        { label: 'Nam', code: '1' },
        { label: 'Nữ', code: '2' },
        { label: 'Chưa xác định', code: '3' },
    ];

    gentle: Gentle;

    address: string = '';

    errorAddress: string = '';

    userInfo: any;

    disabled: boolean = true;

    getSex(code: string) {
        return this.gentles.filter((item: Gentle) => item.code === code)[0]
            ?.label;
    }

    handlePhoneNumberChange(data: string) {
        this.phoneNumber = data;
    }

    handleEmailChange(data: string) {
        this.email = data;
    }

    handleAddressChange(data: string) {
        this.address = data;
    }

    handleEdit() {
        this.disabled = false;
    }

    handleCancel() {
        this.disabled = true;
        this.errorPhoneNumber = '';
        this.errorCccd = '';
        this.errorFullName = '';
        this.errorEmail = '';
        this.setUpData();
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.fullName)) {
            res = false;
            this.errorFullName = 'Vui lòng nhập Họ và tên!';
        }
        if (!validator.isStringInputValid(this.phoneNumber)) {
            res = false;
            this.errorPhoneNumber = 'Vui lòng nhập số điện thoại!';
        }
        if (
            validator.isStringInputValid(this.phoneNumber) &&
            !validator.isPhoneNumberValid(this.phoneNumber)
        ) {
            res = false;
            this.errorPhoneNumber =
                'Số điện thoại không đúng định dạng: 0xx (10-11 ký tự)!';
        }
        if (!validator.isMinLengthValid(this.cccd, 9)) {
            res = false;
            this.errorCccd = 'Căn cước công dân phải chứa ít nhất 9 ký tự!';
        }
        if (!validator.isStringInputValid(this.cccd)) {
            res = false;
            this.errorCccd = 'Vui lòng nhập căn cước công dân!';
        }
        if (
            !validator.isEmailValid(this.email) ||
            !validator.isVietnameseValid(this.email)
        ) {
            res = false;
            this.errorEmail = 'Email không đúng định dạng!';
        }
        if (!validator.isStringInputValid(this.email)) {
            res = false;
            this.errorEmail = 'Vui lòng nhập Email!';
        }

        return res;
    }

    handleSave() {
        if (this.validateForm()) {
            this.loading = true;
            const body = {
                fullName: this.fullName,
                email: this.email,
                mainPhone: this.phoneNumber,
                citizenId: this.cccd,
                birthday: this.date,
                sex: this.gentle?.code,
                address: this.address,
            };

            this.userService
                .updateUser(body, this.userInfo.id)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.disabled = true;
                            },
                            200,
                        );
                    },
                });
        }
    }
}
