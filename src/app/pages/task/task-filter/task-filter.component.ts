import {
    Component,
    EventEmitter,
    Injector,
    Input,
    Output,
    input,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { IAlarmPriority } from 'src/app/interface/category/alarm-priority.interface';
import { IWorkFlowType } from 'src/app/interface/category/workflow-type.interface';
import {
    ITaskGroup,
    ITaskGroupOptions,
} from 'src/app/interface/system-management/task-group';
import { ITaskFilter } from 'src/app/interface/task/task.interface';
import { IUser } from 'src/app/interface/userGroup/userGroup.interface';
import { User, UserService } from 'src/app/service/api/user.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { convertToDateFormat } from 'src/app/utils/datetime';

@Component({
    selector: 'app-task-filter',
    templateUrl: './task-filter.component.html',
    styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent extends AppComponentBase {
    @Input() listWorkflowType: IWorkFlowType[] = [];
    @Input() listPriority: IAlarmPriority[] = [];
    @Input() listTaskGroup: ITaskGroupOptions[] = [];

    @Output() onFilter = new EventEmitter();

    selectedWorkflowType = {} as IWorkFlowType;
    selectedTaskGroup = {} as ITaskGroupOptions;
    selectedPriority = {} as IAlarmPriority;
    createTimeRangeDates: Date[] | undefined = [];
    doneTimeRangeDates: Date[] | undefined = null;
    listUser: User[] = [];
    selectedAssignUser: User = null;
    optionAll = {
        id: undefined,
        name: 'Tất cả',
    };

    constructor(
        injector: Injector,
        private readonly userService: UserService,
        private readonly userInfoService: UserInfoService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.setDefaultFilter();
        this.getGroupUsers();
    }

    ngOnChanges() {
        if (!this.listPriority.includes(this.optionAll)) {
            this.listPriority = [this.optionAll, ...this.listPriority];
        }
        if (!this.listWorkflowType.includes(this.optionAll)) {
            this.listWorkflowType = [this.optionAll, ...this.listWorkflowType];
        }
        if (!this.listTaskGroup.includes(this.optionAll)) {
            this.listTaskGroup = [this.optionAll, ...this.listTaskGroup];
        }
        this.selectedPriority = this.listPriority.find((x) => x.id === 2);
    }
    handlePriorityChange(data: any) {
        this.selectedPriority = data;
    }

    handleAssignUserChange(data: User) {
        this.selectedAssignUser = data;
    }

    handleClearAssignUser() {
        this.selectedAssignUser = null;
    }

    handleWorkflowTypesChange(data: any) {
        this.selectedWorkflowType = data;
    }
    handleTaskGroupChange(data: ITaskGroup) {
        this.selectedTaskGroup = data;
    }
    handleSelectCreateDate(data: any) {
        if (data && data.length > 0) {
            this.createTimeRangeDates = data;
        } else {
            this.createTimeRangeDates = [];
        }
    }

    handleSelectDoneDate(data: any) {
        this.doneTimeRangeDates = data;
    }
    clearFilter() {
        this.setDefaultFilter();
    }
    handleFilter() {
        const validCreateTime =
            this.createTimeRangeDates && this.createTimeRangeDates.length > 0;
        const validDoneTime =
            this.doneTimeRangeDates && this.doneTimeRangeDates.length > 0;

        const selectedFilter = {
            selectedPriorityId: this.selectedPriority?.id,
            selectedWorkflowTypeId: this.selectedWorkflowType?.id,
            selectedTaskGroupId: this.selectedTaskGroup?.id,
            workflowGroup: this.selectedTaskGroup?.id,
            createFromDate: validCreateTime
                ? this.getValidDate(this.createTimeRangeDates[0])
                : null,
            createToDate: validCreateTime
                ? this.getValidDate(this.createTimeRangeDates[1])
                : null,
            doneFromDate: validDoneTime
                ? this.getValidDate(this.doneTimeRangeDates[0])
                : null,
            doneToDate: validDoneTime
                ? this.getValidDate(this.doneTimeRangeDates[1])
                : null,
            userAssignedId: this.selectedAssignUser?.id,
        } as ITaskFilter;
        this.onFilter.emit(selectedFilter);
    }

    getValidDate(date) {
        if (date instanceof Date) {
            return convertToDateFormat(date);
        }
        return null;
    }

    private setDefaultFilter() {
        this.selectedPriority = this.optionAll;
        this.selectedWorkflowType = this.optionAll;
        this.selectedTaskGroup = this.optionAll;
        this.selectedAssignUser = {} as User;

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        this.createTimeRangeDates = [oneYearAgo, tomorrow];
        this.doneTimeRangeDates = [];
    }

    getGroupUsers() {
        const currentUserAgencyId = this.userInfoService.getUserInfo().agencyId;
        this.userService
            .getComboBoxUserByAgency(currentUserAgencyId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listUser = rs.data;
                console.log('abc', rs.data);
            });
    }
}
