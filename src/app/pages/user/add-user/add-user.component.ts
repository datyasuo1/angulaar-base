import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { DepartmentTree } from 'src/app/service/api/department.service';
import { UserService } from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss',
})
export class AddUserComponent extends FormBaseComponent {
    constructor(
        private router: Router,
        private userService: UserService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    username: string = '';

    errorUsername: string = '';

    fullname: string = '';

    errorFullname: string = '';

    phoneNumber: string = '';

    errorPhoneNumber: string = '';

    email: string = '';

    errorEmail: string = '';

    cccd: string = '';

    errorCccd: string = '';

    date: Date = null;

    address: string = '';

    errorAddress: string = '';

    department: DepartmentTree;

    errorDepartment: string = '';

    role: any;

    errorRole: string = '';

    password: string = '';

    errorPassword: string = '';

    cPassword: string = '';

    errorCPassword: string = '';

    gentles: any[] = [
        { label: 'Nam', code: '1' },
        { label: 'Nữ', code: '2' },
        { label: 'Chưa xác định', code: '3' },
    ];

    gentle: any = null;

    handleClose() {
        this.router.navigate(['user-permission', 'user']);
    }

    validateForm() {
        const validator = new CustomFormValidator();

        let res = true;

        if (!validator.isVietnameseValid(this.username)) {
            res = false;
            this.errorUsername = 'Tên đăng nhập không chứa các kí tự đặc biệt!';
        }
        if (!validator.isMinLengthValid(this.username, 3)) {
            res = false;
            this.errorUsername = 'Tên đăng nhập phải chứa ít nhất 3 kí tự!';
        }
        if (!validator.isStringInputValid(this.username)) {
            res = false;
            this.errorUsername = 'Vui lòng nhập Tên đăng nhập!';
        }
        if (validator.containsSpace(this.username)) {
            res = false;
            this.errorUsername = 'Tên đăng nhập không chứa kí tự khoảng trống!';
        }
        if (!validator.isStringInputValid(this.fullname)) {
            res = false;
            this.errorFullname = 'Vui lòng nhập Họ và tên!';
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
        if (!validator.isObjectInputValid(this.department)) {
            res = false;
            this.errorDepartment = 'Vui lòng chọn Phòng ban!';
        }
        if (!validator.isObjectInputValid(this.role)) {
            res = false;
            this.errorRole = 'Vui lòng chọn Vai trò!';
        }
        if (!validator.isPasswordValid(this.password)) {
            res = false;
            this.errorPassword =
                'Mật khẩu phải từ 8-20 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
        }
        if (!validator.isStringInputValid(this.password)) {
            res = false;
            this.errorPassword = 'Vui lòng nhập Mật khẩu!';
        }
        if (!validator.isStringInputValid(this.cPassword)) {
            res = false;
            this.errorCPassword = 'Vui lòng nhập Xác nhận mật khẩu!';
        }
        if (!validator.areTwoStringEqual(this.password, this.cPassword)) {
            res = false;
            this.errorCPassword = 'Mật khẩu và xác nhận mật khẩu không khớp!';
        }
        return res;
    }

    handleCreateUser() {
        if (this.validateForm()) {
            this.loading = true;
            const data: any = {
                username: this.username,
                email: this.email,
                fullName: this.fullname,
                phoneNumber: this.phoneNumber,
                citizenId: this.cccd,
                birthday: this.date,
                sex: this.gentle?.code,
                address: this.address,
                agencyId: this.department?.id,
                iocRoles: this.role?.map((item: any) => item?.id),
                password: this.password,
            };

            this.userService
                .createSSOUser(data)
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
                                this.router.navigate([
                                    'user-permission',
                                    'user',
                                ]);
                            },
                            201,
                        );
                    },
                });
        }
    }
}
