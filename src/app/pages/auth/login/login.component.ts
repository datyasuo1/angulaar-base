import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ToastService } from 'src/app/service/app/toast.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    password: string = '';

    errorPassword: string = '';

    email: string = '';

    errorEmail: string = '';

    loading: boolean = false;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        private router: Router,
        private toastService: ToastService,
    ) {}

    isInputValid() {
        let isValid = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.email)) {
            this.errorEmail = 'Vui lòng nhập tên đăng nhập!';
        }
        if (!validator.isStringInputValid(this.password)) {
            this.errorPassword = 'Vui lòng nhập mật khẩu!';
        }
        if (this.errorEmail.length > 0 || this.errorPassword.length > 0) {
            isValid = false;
        }
        return isValid;
    }

    handleLogin() {
        if (this.isInputValid()) {
            this.loading = true;
            this.authService
                .login(this.email, this.password, 'VIETTELGROUP')
                .pipe(
                    finalize(() => {
                        this.loading = false;
                        setTimeout(() => {
                            this.router.navigate(['/home']);
                        }, 300);
                    }),
                )
                .subscribe({
                    next: () => {
                        this.toastService.showSuccess(
                            'Thành công!',
                            'Đăng nhập thành công',
                            2000,
                        );
                    },
                });
        }
    }
}
