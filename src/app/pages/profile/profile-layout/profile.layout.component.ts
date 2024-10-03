import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.layout.component.html',
    styleUrls: ['./profile.layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit {
    models: MenuItem[] = [];

    constructor() {}

    ngOnInit() {
        this.models = [
            {
                label: 'Thông tin tài khoản',
                icon: 'ti ti-info-circle',
                routerLink: 'profile-update',
            },
            {
                label: 'Đổi mật khẩu',
                icon: 'ti ti-lock',
                routerLink: 'password-update',
            },
            {
                label: 'Cài đặt giao diện',
                icon: 'ti ti-settings',
                routerLink: 'web-setting',
            },
        ];
    }
}
