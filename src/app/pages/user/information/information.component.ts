import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { Gentle } from 'src/app/interface';
import { DepartmentTree } from 'src/app/service/api/department.service';
import { Role } from 'src/app/service/api/role.service';
import {
    IOCRole,
    UserResponse,
    UserService,
} from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrl: './information.component.scss',
})
export class InformationComponent extends FormBaseComponent {
    department: DepartmentTree;

    username: string = '';

    errorDepartment: string = '';

    phoneNumber: string = '';

    errorPhoneNumber: string = '';

    fullName: string = '';

    errorFullName: string = '';

    email: string = '';

    errorEmail: string = '';

    role: Role[] = [];

    errorRole: string = '';

    userId: string = '';

    cccd: string = '';

    errorCccd: string = '';

    date: Date;

    address: string = '';

    errorAddress: string = '';

    gentles: Gentle[] = [
        { label: 'Nam', code: '1' },
        { label: 'Nữ', code: '2' },
        { label: 'Chưa xác định', code: '3' },
    ];

    gentle: Gentle;

    selectedDepartmentId: number;

    roleIds: number[];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private apiHandlerService: ApiHandlerService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit() {
        this.userId = decryptLong(this.route.snapshot.params?.['id']);
        this.userService.getUserById(this.userId).subscribe({
            next: async (res: UserResponse) => {
                const {
                    username,
                    email,
                    fullName,
                    mainPhone,
                    agencyId,
                    iocRoles,
                    address,
                    citizenId,
                    sex,
                    birthday,
                } = res.data ?? {};

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

                this.selectedDepartmentId = agencyId;

                this.roleIds = iocRoles.map((role: IOCRole) => role.roleId);

                this.cdr.detectChanges();
            },
        });
    }

    validateForm() {
        const validator = new CustomFormValidator();

        let res = true;

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
        if (!validator.isObjectInputValid(this.department)) {
            res = false;
            this.errorDepartment = 'Vui lòng chọn Phòng ban!';
        }
        if (!validator.isObjectInputValid(this.role)) {
            res = false;
            this.errorRole = 'Vui lòng chọn Vai trò!';
        }

        return res;
    }

    handleUpdate() {
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
                agencyId: this.department?.id,
                iocRoles: this.role?.map((item: Role) => item?.id),
            };

            this.userService
                .updateUser(body, this.userId)
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
                            200,
                        );
                    },
                });
        }
    }

    handleClose() {
        this.router.navigate(['user-permission', 'user']);
    }
}
