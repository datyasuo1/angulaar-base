import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/service/app/user-info.service';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    constructor(private userInfoService: UserInfoService) {}

    ngOnInit() {
        if (this.permissionCode.length > 0) {
            const userInfo = this.userInfoService.getUserInfo();
            const permissions = userInfo?.iocPermissions || [];
            const filterPermissions = permissions.filter(
                (p: any) => p.permissionCode == this.permissionCode,
            );
            if (filterPermissions.length > 0) {
                this.hasPermission = filterPermissions[0]?.isActive;
            }
        }

        this.setIOCButton();
    }

    setIOCButton() {
        switch (this.iocVariant) {
            case 'create':
                this.label = 'Thêm mới';
                this.icon = 'ti ti-plus';
                break;
            case 'update':
                this.label = 'Cập nhật';
                this.icon = 'ti ti-check';
                break;
            case 'close':
                this.label = 'Đóng';
                this.icon = 'ti ti-x';
                this.styleClass = 'p-button-outlined';
                break;
            case 'icon':
                this.styleClass =
                    'w-2rem h-2rem bg-transparent border-transparent text-color-secondary';
                break;
            case 'iview':
                this.icon = 'ti ti-eye';
                this.tooltip = 'Xem chi tiết';
                this.styleClass =
                    'w-2rem h-2rem bg-transparent border-transparent text-color-secondary';
                break;
            case 'iupdate':
                this.icon = 'ti ti-edit';
                this.tooltip = 'Cập nhật';
                this.styleClass =
                    'w-2rem h-2rem bg-transparent border-transparent text-color-secondary';
                break;
            case 'iconfig':
                this.icon = 'ti ti-settings';
                this.tooltip = 'Cấu hình';
                this.styleClass =
                    'w-2rem h-2rem bg-transparent border-transparent text-color-secondary';
                break;
            case 'idelete':
                this.icon = 'ti ti-trash';
                this.tooltip = 'Xoá';
                this.styleClass =
                    'w-2rem h-2rem bg-transparent border-transparent text-red-700';
                break;
        }
    }

    hasPermission: boolean = true;

    @Input() icon: string = '';

    @Input() size: 'small' | 'large' | null = null;

    @Input() iocVariant:
        | 'create'
        | 'update'
        | 'close'
        | 'icon'
        | 'iview'
        | 'iupdate'
        | 'iconfig'
        | 'idelete'
        | '' = '';

    @Input() loading: boolean = false;

    @Input() disabled: boolean = false;

    @Input() severity:
        | 'success'
        | 'info'
        | 'warning'
        | 'primary'
        | 'help'
        | 'danger'
        | 'secondary'
        | 'contrast'
        | null = null;

    @Input() styleClass: string = '';

    @Input() label: string = '';

    @Input() tooltip: string = '';

    @Input() tooltipPosition: string = 'top';

    @Input() permissionCode: string = '';

    @Input() link: boolean = false;

    @Input() outlined: boolean = false;

    @Input() style: Object = {};

    @Input() autofocus: boolean = false;

    @Output() onClick = new EventEmitter<MouseEvent>();

    handleClick(event: MouseEvent) {
        // event.stopPropagation();
        // event.preventDefault();
        this.onClick.emit(event);
    }
}
