import {
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { EMPTY, catchError, finalize, of, switchMap, takeUntil } from 'rxjs';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { UserGroupService } from 'src/app/service/api/user-group.service';
import { IWorkFlowType } from 'src/app/interface/category/workflow-type.interface';
import { IAlarmPriority } from 'src/app/interface/category/alarm-priority.interface';
import {
    IUser,
    IUserGroup,
} from 'src/app/interface/userGroup/userGroup.interface';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ICreateTaskPayload,
    ITask,
} from 'src/app/interface/task/task.interface';
import { convertToDateTimeFormat } from 'src/app/utils/datetime';
import { TaskService } from 'src/app/service/api/task.service';
import { ImageService } from 'src/app/service/api/image.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { UserService } from 'src/app/service/api/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    IGetTaskGroupPayload,
    ITaskGroup,
} from 'src/app/interface/system-management/task-group';
import { TaskGroupService } from 'src/app/service/api/task-group.service';

@Component({
    selector: 'app-add-workflow',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss'],
    providers: [ConfirmationService],
})
export class CreateTaskComponent extends AppComponentBase implements OnChanges {
    @Output() onSave = new EventEmitter<boolean>();
    @Output() alreadyInput = new EventEmitter<boolean>();

    @Input() dialogData: any = {};

    @Input() workflowTypes: IWorkFlowType[];

    @Input() parentWorkFlow = {} as ITask;
    @Input() levelList: IAlarmPriority[] = [];
    @Output() onClose = new EventEmitter();
    value: number | null = null;

    erorDescription: string = '';

    errorTaskName: string = '';

    taskName: string = '';

    listGroup: IUserGroup[] = [];

    listMonitorGroup: IUserGroup[] = [];

    file: File | undefined = undefined;

    filename: string = '';

    icon: any = {};

    errorFile: string = '';

    errorLevel: string = '';

    descriptionInfo: string = '';
    errorSelectGroup: string = '';
    errorTimeDone: string = '';

    errorDescriptionInfo: string = '';

    selectedWorkflowType = {} as IWorkFlowType;

    errorWorkflowTypes: string = '';

    listTaskGroup: ITaskGroup[] = [];

    selectedTaskGroup = {} as ITaskGroup;

    errorTaskGroup: string = '';

    timeDoneExpect: Date = new Date();
    timeDoneMinDate: Date = new Date();

    selectedPriority = {} as IAlarmPriority;
    DEFAULT_PRIORITY = {} as IAlarmPriority;

    isReport: boolean = true;

    selectedGroup: IUserGroup = null;

    selectedUser: IUser = null;
    errorSelectUser: string = '';
    selectedMonitoringGroup = {} as IUserGroup;
    selectedMonitoringUser: IUser = null;

    listUser: IUser[] = [];
    listUserMonitoring: IUser[] = [];
    visibleConfirmDialog: boolean = false;
    isCreatingTask: boolean = false;
    isAssigningTask: boolean = false;
    isUploadFileError: boolean = false;

    constructor(
        private readonly userGroupService: UserGroupService,
        private readonly taskService: TaskService,
        private readonly fileService: ImageService,
        private readonly userInfoService: UserInfoService,
        private readonly userService: UserService,
        private readonly taskGroupService: TaskGroupService,
        private readonly confirmService: ConfirmationService,
        injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.timeDoneExpect.setHours(this.timeDoneExpect.getHours() + 1);
        this.getListGroups();
        this.getListTaskGroup();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['levelList']) {
            this.DEFAULT_PRIORITY =
                this.levelList.find((x) => x.id === 2) ||
                ({} as IAlarmPriority);
            this.selectedPriority = this.DEFAULT_PRIORITY;
        }
    }

    handleFileChange(fileResponse) {
        if (fileResponse.error) {
            this.isUploadFileError = true;
            return;
        }

        this.file = fileResponse.file;
        this.filename = this.file?.name ?? '';
        this.alreadyInput.emit(true);
        this.isUploadFileError = false;
    }

    handleSelectTimeDone(event) {
        this.timeDoneExpect = event;

        if (this.timeDoneExpect) {
            this.errorTimeDone = '';
            // this.alreadyInput.emit(true);
        }
    }

    handleSelectPriority(event: IAlarmPriority) {
        this.selectedPriority = event;
        this.errorLevel = '';
        this.alreadyInput.emit(true);
    }

    handleSelectGroup(event) {
        this.selectedGroup = event;
        if (this.selectedGroup?.id && !this.selectedUser?.userId) {
            this.getGroupUsers(this.selectedGroup?.id);
            this.errorSelectGroup = '';
            this.alreadyInput.emit(true);
        }
    }

    handleClearGroup() {
        this.selectedUser = null;
        this.selectedGroup = null;
        this.listUser = [];
        this.getListGroups();
    }

    handleSelectUser(event) {
        this.selectedUser = event;
        this.errorSelectUser = '';
        this.alreadyInput.emit(true);
    }

    handleClearUser() {
        // this.selectedGroup = null

        if (!this.selectedGroup) {
            this.listUser = [];
        }

        this.selectedUser = null;
        this.getListGroups();
    }

    handleSelectMonitorGroup(event) {
        this.selectedMonitoringGroup = event;
        if (this.selectedMonitoringGroup?.id) {
            this.getGroupUserMonitoring(this.selectedMonitoringGroup?.id);
            this.alreadyInput.emit(true);
        }
    }

    handleClearMonitorGroup() {
        this.selectedMonitoringUser = null;
        this.listUserMonitoring = [];
    }

    handleSelectMonitorUser(event) {
        this.selectedMonitoringUser = event;
        this.alreadyInput.emit(true);
    }

    getListGroups() {
        this.userGroupService
            .getComboBoxUserGroups()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.listGroup = res.data;
                    if (this.listMonitorGroup.length === 0) {
                        this.listMonitorGroup = res.data;
                    }
                },
                error: (err) => {
                    this.apiHandlerService.handleError(err);
                },
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

    handleTaskGroupChange(event: ITaskGroup) {
        this.selectedTaskGroup = event;
        this.errorTaskGroup = '';
        this.alreadyInput.emit(true);
    }

    getGroupUsers(id: number) {
        this.userGroupService
            .getComboBoxGroupUsers(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listUser = rs.data;
            });
    }

    getGroupUserMonitoring(id: number) {
        this.userGroupService
            .getComboBoxGroupUsers(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.listUserMonitoring = res.data;
                },
                error: (err) => {
                    this.apiHandlerService.handleError(err);
                },
            });
    }

    handleDescriptionInfoChange() {
        this.errorDescriptionInfo = '';
        this.alreadyInput.emit(true);
    }

    handleWorkflowTypesChange(event: IWorkFlowType) {
        this.selectedWorkflowType = event;
        this.errorWorkflowTypes = '';
        this.alreadyInput.emit(true);
    }

    handleTaskNameChange(event: string) {
        this.taskName = event;
        this.errorTaskName = '';
        this.alreadyInput.emit(true);
    }

    validateForm() {
        let valid = true;
        if (!this.taskName) {
            this.errorTaskName = 'Vui lòng nhập tên công việc';
            valid = false;
        }
        if (!this.descriptionInfo) {
            this.errorDescriptionInfo = 'Vui lòng nhập nội dung công việc';
            valid = false;
        }
        if (!this.selectedGroup?.id) {
            this.errorSelectGroup = 'Vui lòng chọn đơn vị xử lí';
            valid = false;
        }
        if (!this.selectedWorkflowType?.id) {
            this.errorWorkflowTypes = 'Vui lòng chọn loại công việc';
            valid = false;
        }
        if (!this.selectedTaskGroup?.id) {
            this.errorTaskGroup = 'Vui lòng chọn nhóm công việc';
            valid = false;
        }
        if (!this.selectedUser?.userId) {
            this.errorSelectUser = 'Vui lòng chọn người xử lý';
            valid = false;
        }
        if (!this.timeDoneExpect) {
            this.errorTimeDone = 'Vui lòng chọn thời hạn hoàn thành';
            valid = false;
        }
        if (this.isUploadFileError) {
            valid = false;
        }
        return valid;
    }

    handleClose() {
        if (
            this.selectedGroup?.id ||
            this.selectedTaskGroup?.id ||
            this.selectedMonitoringGroup?.id ||
            this.selectedMonitoringUser?.userId ||
            this.selectedUser?.userId ||
            this.selectedWorkflowType?.id ||
            this.taskName ||
            this.descriptionInfo
        ) {
            this.confirmService.confirm({
                message:
                    'Bạn đang tạo công việc. Thông tin sẽ không được lưu nếu bạn đóng màn hình này. Bạn có chắc chắn muốn đóng?',
                header: 'Xác nhận',
                icon: 'pi pi-exclamation-triangle',
                acceptIcon: 'none',
                rejectIcon: 'none',
                rejectButtonStyleClass: 'p-button-text p-button-outlined mr-2',
                acceptButtonStyleClass: 'p-ripple',
                acceptLabel: 'Có, đóng',
                rejectLabel: 'Hủy',
                accept: () => {
                    this.setDefaultForm();
                    this.onClose.emit();
                },
                reject: () => {},
            });
        } else {
            this.onClose.emit();
            this.setDefaultForm();
        }
    }

    onCreateTask() {
        if (!this.validateForm()) {
            return;
        }
        this.isCreatingTask = true;
        this.handleSaveTask();
    }

    onAssignTask() {
        if (!this.validateForm()) {
            return;
        }
        this.isAssigningTask = true;
        this.handleSaveTask(this.isAssigningTask);
    }

    handleSaveTask(isAssignTask?: boolean) {
        this.isLoading = true;

        const payload = {
            workflowTypeId: '130', //update BE
            content: {
                name: this.taskName,
                content: this.descriptionInfo,
                workflowType: this.selectedWorkflowType?.id,
                priorityId: this.selectedPriority?.id,
                groupAssignedId: this.selectedGroup?.id,
                userAssignedId: this.selectedUser?.userId,
                isSubWorkflow: 0,
                isReport: this.convertBooleanToInt(this.isReport),
                dueAt: convertToDateTimeFormat(this.timeDoneExpect.toString()),
                monitoringGroupId: this.selectedMonitoringGroup?.id,
                monitoringUserId: this.selectedMonitoringUser?.userId,
                type: 'TASK',
                workflowStatus: 1,
                workflowGroup: this.selectedTaskGroup.id,
            },
        } as ICreateTaskPayload;

        if (this.parentWorkFlow) {
            (payload.content.parentId = this.parentWorkFlow.id),
                (payload.content.isSubWorkflow = 1);
        }

        of(this.file)
            .pipe(
                switchMap((file) => {
                    if (file) {
                        const formData = new FormData();
                        formData.append('service', 'alarms');
                        formData.append('files', file);
                        return this.fileService
                            .uploadMultipleFiles(formData)
                            .pipe(
                                switchMap((rs) => {
                                    if (rs && rs.data) {
                                        payload.content.mediaFile =
                                            JSON.stringify(rs.data);
                                    }
                                    return this.taskService.createNewTask(
                                        payload,
                                    );
                                }),
                            );
                    } else {
                        return this.taskService.createNewTask(payload);
                    }
                }),
                catchError(() => {
                    this.isAssigningTask = false;
                    return EMPTY;
                }),
            )
            .pipe(
                takeUntil(this.destroy$),
                finalize(
                    () => (
                        (this.isLoading = false), (this.isCreatingTask = false)
                    ),
                ),
            )
            .subscribe({
                next: (rs) => {
                    const taskId = rs.data.id;
                    if (taskId && isAssignTask) {
                        this.callAssignTask(taskId);
                    } else {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.setDefaultForm();
                                this.onSave.emit();
                            },
                            201,
                        );
                    }
                },
            });
    }

    callAssignTask(taskId: string) {
        this.taskService
            .assignTask(taskId)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isAssigningTask = false)),
            )
            .subscribe((rs) => {
                this.apiHandlerService.handleSuccess(
                    rs,
                    () => {
                        this.setDefaultForm();
                        this.onSave.emit();
                    },
                    201,
                );
            });
    }

    handleAutoFill() {
        const currentLoginUser = this.userInfoService.getUserInfo();
        const mapUserIno = {
            email: currentLoginUser.email,
            firstName: currentLoginUser.firstName,
            lastName: currentLoginUser.lastName,
            userId: currentLoginUser.id,
            fullName: currentLoginUser.fullName,
        } as IUser;

        this.listUser = [mapUserIno];
        this.selectedUser = mapUserIno;

        this.userService
            .getComboBoxGroupsOfUser(currentLoginUser.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                this.listGroup = rs.data;

                this.listGroup.forEach((x) => (x.id = x.groupId));

                if (this.listGroup.length === 1) {
                    this.selectedGroup = this.listGroup[0];
                }
                this.alreadyInput.emit(true);
            });
    }

    convertBooleanToInt(value) {
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        return value;
    }

    setDefaultForm() {
        this.selectedGroup = {} as IUserGroup;
        this.selectedUser = {} as IUser;
        this.selectedMonitoringGroup = {} as IUserGroup;
        this.selectedMonitoringUser = {} as IUser;
        this.selectedPriority = this.DEFAULT_PRIORITY;
        this.selectedWorkflowType = {} as IWorkFlowType;
        this.selectedTaskGroup = {} as ITaskGroup;
        this.timeDoneExpect = new Date();
        this.isReport = true;
        this.taskName = '';
        this.descriptionInfo = '';
        this.file = undefined;

        this.errorDescriptionInfo = '';
        this.errorSelectGroup = '';
        this.errorTaskName = '';
        this.errorWorkflowTypes = '';

        this.isLoading = false;
    }
}
