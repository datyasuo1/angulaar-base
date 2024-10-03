import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Injector,
} from '@angular/core';
import {
    Subject,
    distinctUntilChanged,
    finalize,
    forkJoin,
    of,
    skip,
    switchMap,
    takeUntil,
    tap,
    timer,
} from 'rxjs';
import {
    PrioritiesResponse,
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import { TaskService } from 'src/app/service/api/task.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { IAlarmPriority } from 'src/app/interface/category/alarm-priority.interface';
import { AppComponentBase } from 'src/app/app-component-base';
import { IWorkFlowType } from 'src/app/interface/category/workflow-type.interface';
import { TaskFilterService } from './task-filter/task-filter.service';
import {
    IGetTaskPayload,
    ITask,
    ITaskFilter,
} from 'src/app/interface/task/task.interface';
import { IWorkflowStatus } from 'src/app/interface/category/workflow-status.interface';
import {
    IMission,
    ISubWorkflow,
} from 'src/app/interface/task/task-detail.interface';
import { IScreenBuilderInput } from 'src/app/interface/common.interface';
import { environment } from 'src/environments/environment';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { TaskGroupService } from 'src/app/service/api/task-group.service';
import {
    IGetTaskGroupPayload,
    ITaskGroup,
} from 'src/app/interface/system-management/task-group';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent extends AppComponentBase {
    constructor(
        private readonly priorityService: PriorityService,
        private readonly taskService: TaskService,
        private readonly taskFilterService: TaskFilterService,
        private readonly userInfoService: UserInfoService,
        private readonly taskGroupService: TaskGroupService,

        private cdr: ChangeDetectorRef,

        injector: Injector,
    ) {
        super(injector);
    }
    createTimeRangeDates: Date[] | undefined = [];
    doneTimeRangeDates: Date[] | undefined = [];
    searchText: string = '';
    subWorkflow: ISubWorkflow[] = [];
    workflowStatus: number;
    missions: IMission[] = [];
    listWorkflowStatus: IWorkflowStatus[] = [];
    listTaskGroup: ITaskGroup[] = [];
    priorityList: Priority[] = [];
    selectedPriority = {} as IAlarmPriority;
    taskList: ITask[] = [];
    selectedTask = {} as ITask;
    selectedWorkflowType = {} as IWorkFlowType;
    workflowTypes: IWorkFlowType[] = [];
    totalRecords: number = 0;
    isGroup: number = 0;
    filterVisible: boolean = false;
    createTaskVisible: boolean = false;
    selectedFilter = {} as ITaskFilter;
    screenRendererInput = {} as IScreenBuilderInput;
    appId: string = '';
    screenBuilderURL: string = environment.screenBuilderURL || '';
    isLoadingDetail: boolean = false;
    isMonitored: number = 0;
    totalMonitorCount: number = 0;

    parentWorkFlow = {} as ITask;
    isAlreadyInput: boolean = false;

    private eventSubject = new Subject<MessageEvent>();
    private previousEvent: MessageEvent | null = null;
    ngOnInit(): void {
        this.isLoadingDetail = true;

        window.addEventListener('message', this.handleScreenEvent.bind(this));

        const currentLoginUser = this.userInfoService.getUserInfo();
        this.screenRendererInput.userId = currentLoginUser.id;

        this.screenRendererInput.accessToken =
            localStorage.getItem('accessToken') || '';

        forkJoin([
            this.priorityService.getComboBoxPriorities(),
            this.taskService.getComboBoxWorkflowStatus(this.isGroup),
        ])
            .pipe(
                takeUntil(this.destroy$),
                tap(([priorities, listStatusWorkflow]) => {
                    this.priorityList = priorities.data;
                    this.listWorkflowStatus = listStatusWorkflow.data;
                    this.totalMonitorCount =
                        this.listWorkflowStatus.find((x) => x.id == null)
                            ?.count || 0;
                }),
            )
            .subscribe(() => {
                this.callTaskList();
            });

        this.getWorkflowTypes();
        this.subScribeTaskGroupFilter();
        this.getListTaskGroup();

        this.eventSubject
            .pipe(
                distinctUntilChanged(
                    (prev, curr) =>
                        JSON.stringify(prev.data) === JSON.stringify(curr.data),
                ),
                takeUntil(this.destroy$),
            )
            .subscribe((event) => this.processScreenEvent(event));
    }

    override ngOnDestroy(): void {
        window.removeEventListener(
            'message',
            this.handleScreenEvent.bind(this),
        );
    }

    updateCurrentTask(id: string) {
        this.taskService.getTaskDetail(id, this.isGroup).subscribe((rs) => {
            const taskDetail = rs.data;
            this.appId = taskDetail.appId;
            this.isLoadingDetail = true;

            this.taskList.forEach((item) => {
                if (item.id == taskDetail.id) {
                    item.workflowStatusId = taskDetail.workflowStatusId;
                    item.workflowStatusName = taskDetail.workflowStatusName;
                }
            });
        });
    }
    updateWorkflowCount() {
        this.taskService
            .getComboBoxWorkflowStatus(this.isGroup)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listWorkflowStatus = rs.data;
                this.totalMonitorCount =
                    this.listWorkflowStatus.find((x) => x.id == null)?.count ||
                    0;
            });
    }

    handleScreenEvent(event: MessageEvent): void {
        this.eventSubject.next(event);
    }

    private processScreenEvent(event: MessageEvent): void {
        if (event.data.action === 'MessageInvoker') {
            if (event.data?.type === 'loadSuccess') {
                this.isLoadingDetail = false;
            }

            if (event.data?.type === 'changeStatus') {
                const outputData = event.data?.data;
                this.updateWorkflowCount();
                this.updateCurrentTask(outputData.id);
            }

            if (event.data.type === 'notification') {
                if (
                    this.previousEvent &&
                    JSON.stringify(this.previousEvent.data) ===
                        JSON.stringify(event.data)
                ) {
                    return;
                }

                this.previousEvent = event;
                const apiResponse = event.data.response;
                this.apiHandlerService.handleSuccess(
                    event.data.response,
                    () => {},
                    apiResponse.code,
                );
            }

            if (event.data.type === 'createSubWorkflow') {
                const outputData = event.data?.data;

                this.parentWorkFlow = this.taskList.find(
                    (x) => x.id == outputData.parentId,
                );

                this.createTaskVisible = true;
            }

            this.cdr.detectChanges();
        }
    }

    calcHeight() {
        return `calc(100vh - 420px)`;
    }

    onFilterClick() {
        this.filterVisible = true;
    }

    onAddClick() {
        this.createTaskVisible = true;
    }

    private subScribeTaskGroupFilter() {
        this.taskFilterService
            .getTaskGroupFilter()
            .pipe(takeUntil(this.destroy$), distinctUntilChanged(), skip(1))
            .subscribe((rs) => {
                this.isGroup = rs;
                this.callTaskList();
                this.callTaskStatus();
            });
    }

    private getWorkflowTypes() {
        this.taskService
            .getComboBoxWorkflowTypes()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.workflowTypes = res.data;
            });
    }

    getListTaskGroup() {
        const payload = {
            page: -1,
            size: 1,
        } as IGetTaskGroupPayload;

        this.taskGroupService
            .getTaskGroupList(payload)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listTaskGroup = rs.data;
            });
    }

    private callTaskStatus() {
        this.taskService
            .getComboBoxWorkflowStatus(this.isGroup)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.listWorkflowStatus = res.data;
                    this.totalMonitorCount =
                        this.listWorkflowStatus.find((x) => x.id == null)
                            ?.count || 0;
                },
                error: () => {
                    this.listWorkflowStatus = [];
                },
            });
    }

    private callTaskList(paginatorChange: boolean = false) {
        this.isLoading = true;
        const getTaskListPayload = {
            page: this.currentPage,
            size: this.rows,
            isGroup: this.isGroup,
            search: this.searchText,
            workflowStatus: this.workflowStatus,
            workflowType: this.selectedFilter.selectedWorkflowTypeId,
            priorityId: this.selectedFilter.selectedPriorityId,
            startTimeCreate: this.selectedFilter.createFromDate,
            endTimeCreate: this.selectedFilter.createToDate,
            startTimeDone: this.selectedFilter.doneFromDate,
            endTimeDone: this.selectedFilter.doneToDate,
            workflowGroup: this.selectedFilter.workflowGroup,
            userAssignedId: this.selectedFilter.userAssignedId,
            isMonitored: this.isMonitored,
        } as IGetTaskPayload;

        this.taskService
            .getListTasks(getTaskListPayload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe({
                next: (res) => {
                    this.taskList = res.data;
                    this.taskList.forEach((data) => {
                        const iconId = data.priorityId;
                        const levelItem = this.priorityList.find(
                            (level) => level?.id === iconId,
                        );
                        if (
                            levelItem &&
                            levelItem.icon &&
                            levelItem.icon.path
                        ) {
                            data.iconPath =
                                levelItem.imageHost + '/' + levelItem.icon.path;
                        }
                    });

                    if (this.taskList[0]) {
                        this.selectedTask = this.taskList[0];

                        this.handleViewTaskDetail(this.selectedTask);
                    }

                    if (this.taskList.length == 0) {
                        this.selectedTask = null;
                        this.isLoadingDetail = false;
                    }

                    this.totalRecords = res.totalElement;
                },
                error: (err: any) => {
                    this.taskList = [];
                    this.totalRecords = 0;
                    this.selectedTask = null;
                },
                complete: () => {
                    this.isLoading = false;
                },
            });
    }

    handlePageChange(event) {
        if (
            (event.rows !== this.rows || event.first !== this.first) &&
            typeof event.first == 'number' &&
            typeof event.rows == 'number'
        ) {
            this.rows = event.rows;
            this.first = event.first;
            this.currentPage = Math.ceil(event.first / event.rows) + 1;
            this.callTaskList(true);
        }
    }

    handleSearchContentChange(data: string) {
        this.searchText = data;
    }

    handleSearchEnter() {
        this.callTaskList();
    }

    handleSearch() {
        this.callTaskList();
    }
    handleFilter() {
        this.filterVisible = false;
        this.callTaskList();
    }

    onTabIndexChange(index: number) {
        if (index === 0) {
            this.workflowStatus = null;
            this.isMonitored = 0;
        } else if (index > this.listWorkflowStatus.length - 1) {
            this.workflowStatus = null;
            this.isMonitored = 1;
        } else {
            this.workflowStatus = this.listWorkflowStatus[index - 1].id;
            this.isMonitored = 0;
        }

        this.callTaskList();
    }

    getTagServerity(workflowStatusId: number) {
        switch (workflowStatusId) {
            case 1:
                return 'secondary';
            case 2:
                return 'warning';
            case 3:
                return 'info';
            case 4:
                return 'warning';
            case 5:
                return 'warning';
            case 7:
                return 'success';
            case 9:
                return 'warning';
            default:
                return 'secondary';
        }
    }
    handleTaskFilter(event) {
        this.selectedFilter = event;
        this.callTaskList();
        this.filterVisible = false;
    }

    onCloseCreateTask() {
        this.createTaskVisible = false;
        this.parentWorkFlow = {} as ITask;
    }

    onSaveCreateTask() {
        this.parentWorkFlow = {} as ITask;
        this.createTaskVisible = false;
        this.ngOnInit();
    }

    handleViewTaskDetail(data: ITask) {
        this.isLoadingDetail = true;
        this.appId = data?.appId;

        this.screenRendererInput = {
            ...this.screenRendererInput,
            id: data.id,
        };

        this.screenRendererInput.isGroup = this.isGroup;
    }

    public onScreenRendererEvent(event: CustomEvent) {
        if (event.detail === 'reload') {
            this.callTaskList();
        }
    }

    handleSidebarClosed() {
        if (this.isAlreadyInput) {
            this.confirmationService.confirm({
                message: `Bạn đang tạo ${this.parentWorkFlow.id ? 'công việc con' : 'công việc'}. Thông tin sẽ không được lưu nếu bạn đóng màn hình này. Bạn có chắc chắn muốn đóng?`,
                header: 'Xác nhận',
                icon: 'none',
                acceptIcon: 'none',
                rejectIcon: 'none',
                rejectButtonStyleClass: 'p-button-text p-button-outlined mr-2',
                acceptButtonStyleClass: 'p-ripple',
                acceptLabel: 'Có, đóng',
                rejectLabel: 'Hủy',
                accept: () => {
                    this.createTaskVisible = false;
                },
                reject: () => {},
            });
        } else {
            this.createTaskVisible = false;
        }
    }

    onInputValue(event: boolean) {
        this.isAlreadyInput = event;
    }
}
