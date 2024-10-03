import {
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAgency,
    IAgencyGroup,
} from 'src/app/interface/category/agency.interface';
import {
    IUser,
    IUserGroup,
} from 'src/app/interface/userGroup/userGroup.interface';
import {
    DepartmentService,
    DepartmentTree,
} from 'src/app/service/api/department.service';
import { UserGroupService } from 'src/app/service/api/user-group.service';
import { AppResouceDialogMode } from '../create-update-resouce.constant';

@Component({
    selector: 'app-create-user-group',
    templateUrl: './create-user-group.component.html',
    styleUrl: './create-user-group.component.scss',
})
export class CreateUserGroupComponent
    extends AppComponentBase
    implements OnInit
{
    @Input() data = {} as IAgencyGroup;
    @Output() onSave = new EventEmitter();
    @Output() onClose = new EventEmitter();
    listAgency: DepartmentTree[] = [];
    listGroup: IAgencyGroup[] = [];
    selectedAgency = {} as DepartmentTree;
    selectedGroup = {} as IAgencyGroup;
    errSelectGroup: string = '';
    errSelectAgency: string = '';

    constructor(
        injector: Injector,
        private readonly userGroupService: UserGroupService,
        private readonly departmentService: DepartmentService,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.callListAgency();
    }

    private callListAgency() {
        this.departmentService
            .getAgencies()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listAgency = rs.data;
                if (this.data.agencyId) {
                    this.selectedAgency = this.listAgency.find(
                        (x) => x.id === this.data?.agencyId,
                    );
                    if (this.selectedAgency?.id) {
                        this.userGroupService
                            .getParentGroups(this.selectedAgency?.id)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe((rs) => {
                                this.listGroup = rs.data;
                                if (this.data?.id) {
                                    this.selectedGroup = this.listGroup.find(
                                        (x) => x.id === this.data?.id,
                                    );
                                }
                            });
                    }
                }
            });
    }

    private callListAgencyGroup(id) {
        this.userGroupService
            .getParentGroups(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listGroup = rs.data;
            });
    }

    onSelectAgency(agency) {
        if (agency?.id) {
            this.selectedAgency = agency;
            this.callListAgencyGroup(this.selectedAgency?.id);
            this.errSelectAgency = '';
        } else {
            this.selectedAgency = {} as DepartmentTree;
        }
    }
    onSelectGroup(group) {
        if (group?.id) {
            this.selectedGroup = group;
            this.errSelectGroup = '';
        } else {
            this.selectedGroup = {} as IAgencyGroup;
        }
    }
    onSaveClick() {
        if (this.validFormData()) {
            if (this.data.agencyId) {
                this.selectedGroup.groupId = this.data.groupId;
            }
            this.onSave.emit(this.selectedGroup);
            this.resetForm();
        }
    }
    onCloseClick() {
        this.resetForm();
        this.onClose.emit();
    }

    resetForm() {
        this.selectedAgency = {} as DepartmentTree;
        this.selectedGroup = {} as IAgencyGroup;
    }
    validFormData() {
        let valid: boolean = true;
        if (!this.selectedGroup?.id) {
            this.errSelectGroup = 'Hãy chọn nhóm người dùng';
            valid = false;
        }
        if (!this.selectedAgency?.id) {
            this.errSelectAgency = 'Hãy chọn phòng ban';
            valid = false;
        }
        return valid;
    }
    onClearAgency() {
        this.resetForm();
    }
}
