import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ICreateEditTaskGroupConfig,
    ICreateEditTaskGroupPayload,
    ITaskGroup,
} from 'src/app/interface/system-management/task-group';
import { TaskGroupService } from 'src/app/service/api/task-group.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { ActionEnum } from 'src/app/shared/AppEnum';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-create-edit-task-group',
    templateUrl: './create-edit-task-group.component.html',
    styleUrl: './create-edit-task-group.component.scss',
})
export class CreateEditTaskGroupComponent extends AppComponentBase {
    taskGroup = {} as ITaskGroup;
    taskGroupForm: FormGroup;
    submitted: boolean = false;
    readonly DIALOG_ACTION = ActionEnum;

    constructor(
        injector: Injector,
        public config: DynamicDialogConfig<ICreateEditTaskGroupConfig>,
        public ref: DynamicDialogRef,
        private fb: FormBuilder,
        private taskGroupService: TaskGroupService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.initForm();
        if (this.config.data.action === this.DIALOG_ACTION.UPDATE) {
            const { name, description, sortOrder } = this.config.data.taskGroup;

            this.taskGroupForm.patchValue({
                name,
                description,
                sortOrder,
            });
        }
    }

    initForm() {
        const minValue: number = 1;
        const maxValue: number = 200;

        this.taskGroupForm = this.fb.group({
            name: [
                '',
                [
                    CustomFormValidator.required(
                        'Vui lòng nhập tên nhóm công việc',
                    ),
                ],
            ],
            description: [''],
            sortOrder: [
                null,
                [
                    CustomFormValidator.valueRange(
                        minValue,
                        maxValue,
                        `Giá trị tối thiểu ${minValue} và tối đa ${maxValue}`,
                    ),
                ],
            ],
        });
    }

    handleSave() {
        this.submitted = true;
        if (this.taskGroupForm.valid) {
            this.isLoading = true;
            const payload = this.taskGroupForm
                .value as ICreateEditTaskGroupPayload;

            if (this.config.data.action === ActionEnum.UPDATE) {
                this.taskGroupService
                    .editTaskGroup(this.config.data.taskGroup.id, payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((res) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.ref.close(true);
                            },
                            200,
                        );
                    });
            } else {
                this.taskGroupService
                    .createTaskGroup(payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((res) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.ref.close(true);
                            },
                            201,
                        );
                    });
            }
        }
    }

    handleClose() {
        this.ref.close();
    }
}
