import { Component, Injector } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ICreateEditTaskGroupConfig,
    IGetTaskGroupPayload,
    ITaskGroup,
} from 'src/app/interface/system-management/task-group';
import { TaskGroupService } from 'src/app/service/api/task-group.service';
import { CreateEditTaskGroupComponent } from '../create-edit-task-group/create-edit-task-group.component';
import { ActionEnum } from 'src/app/shared/AppEnum';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-list-task-group',
    templateUrl: './list-task-group.component.html',
    styleUrl: './list-task-group.component.scss',
})
export class ListTaskGroupComponent extends AppComponentBase {
    listTakGroup: ITaskGroup[] = [];
    searchParams = {
        name: '',
        description: '',
    };
    readonly DIALOG_ACTION = ActionEnum;

    constructor(
        injector: Injector,
        private taskGroupService: TaskGroupService,
        private verificationService: VerificationService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.callListTaskGroup();
    }

    callListTaskGroup() {
        this.isLoading = true;

        const payload = {
            page: this.currentPage,
            size: this.rows,
            name: this.searchParams.name,
            description: this.searchParams.description,
        } as IGetTaskGroupPayload;

        this.taskGroupService
            .getTaskGroupList(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listTakGroup = rs.data;
                this.totalRecord = rs.totalElement;
            });
    }

    handleCreateUpdate(taskGroup: ITaskGroup, dialogAction: ActionEnum) {
        const dialogConfig: ICreateEditTaskGroupConfig = {
            taskGroup: taskGroup,
            action: dialogAction,
        };
        const ref = this.openDialog(
            `${dialogConfig.action} nhóm công việc`,
            CreateEditTaskGroupComponent,
            dialogConfig,
        );

        ref.onClose.subscribe((rs) => {
            if (rs) {
                this.callListTaskGroup();
            }
        });
    }

    loadTable(event: any) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.callListTaskGroup();
    }

    handleDeleteGroup(taskGroup: ITaskGroup) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa nhóm công việc <strong>${taskGroup.name}</strong>?`,
            () => {
                this.taskGroupService
                    .deleteTaskGroup(taskGroup.id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.callListTaskGroup();
                            },
                            200,
                        );
                    });
            },
        );
    }

    handleSearch(data: string, field: string) {
        this.searchParams[field] = data;
        this.currentPage = 1;
        this.first = 0;
        this.callListTaskGroup();
    }
}
