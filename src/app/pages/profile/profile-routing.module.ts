import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { WebSettingComponent } from './web-setting/web-setting.component';

const routes: Routes = [
    {
        path: 'profile-update',
        component: ProfileUpdateComponent,
        data: {
            breadcrumb: 'Cập nhật thông tin',
        },
    },
    {
        path: 'password-update',
        component: PasswordUpdateComponent,
        data: {
            breadcrumb: 'Đổi mật khẩu',
        },
    },
    {
        path: 'web-setting',
        component: WebSettingComponent,
        data: {
            breadcrumb: 'Cài đặt giao diện',
        },
    },
    {
        path: '',
        data: {
            breadcrumb: null,
        },
        redirectTo: '/profile/profile-update',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
