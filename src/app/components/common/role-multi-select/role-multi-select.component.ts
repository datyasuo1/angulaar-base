import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Role, RoleService } from 'src/app/service/api/role.service';

@Component({
    selector: 'app-role-multi-select',
    templateUrl: './role-multi-select.component.html',
    styleUrl: './role-multi-select.component.scss',
})
export class RoleMultiSelectComponent {
    constructor(private rS: RoleService) {}
    roles: Role[] = [];

    @Input() role: Role[] = [];

    @Input() label: string = 'Vai trò';

    @Input() placeholder: string = 'Chọn vai trò';

    @Input() showLabel: boolean = true;

    @Input() required: boolean = false;

    @Input() errorRole: string = '';

    @Input() selectedRoleIds: number[] = [];

    @Output() onChange: EventEmitter<Role[]> = new EventEmitter();

    @Output() roleChange: EventEmitter<Role[]> = new EventEmitter();

    async ngOnInit() {
        await this.getRoles();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['selectedRoleIds'] && this.roles.length > 0) {
            this.role = this.getRolesByIds();
            this.roleChange.emit(this.role);
        }
    }

    async getRoles() {
        try {
            const res = await lastValueFrom(this.rS.getComboBoxRoles());
            this.roles = res.data;
            this.role = this.getRolesByIds();
            this.roleChange.emit(this.role);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    getRolesByIds() {
        const role = this.roles.filter((item: Role) =>
            this.selectedRoleIds?.includes(item.id),
        );
        return role;
    }

    handleRoleChange(data: Role[]) {
        this.onChange.emit(data);
    }
}
