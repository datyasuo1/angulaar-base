import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { TaskStatusService } from 'src/app/service/api/task-status.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';

@Component({
    selector: 'app-add-task-status',
    templateUrl: './add-task-status.component.html',
    styleUrls: ['./add-task-status.component.scss'],
})
export class AddTaskStatusComponent implements OnChanges {
    constructor(
        private taskStatusService: TaskStatusService,
        private apiHandlerService: ApiHandlerService,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['dialogData'] &&
            !changes['dialogData'].firstChange &&
            this.dialogData
        ) {
            const data = changes['dialogData'].currentValue;
            this.taskName = data.name || '';
            this.description = data.description || '';
            this.sortOrder = data.sortOrder || 0;
        }
    }

    @Input() show: boolean = false;

    @Output() onDone = new EventEmitter<boolean>();

    @Input() dialogTitle: string = '';

    @Input() dialogButtonText: string = '';

    @Input() dialogData: any = {};

    dialogLoading = false;

    value: number | null = null;

    errorValue = '';

    errorTaskStatusName: string = '';

    errorTaskName: string = '';

    taskName: string = '';

    sortOrder: number = null;

    description: string = '';

    file: File | undefined = undefined;

    filename: string = '';

    icon: any = {};

    color: string = '';

    errorColor: string = '';

    errorFile: string = '';

    handleFileChange(data: any) {
        const { file, error } = data ?? {};
        this.file = file;
        this.filename = file?.name ?? '';
        this.errorFile = error;
    }

    resetDialog() {
        this.taskName = '';
        this.errorTaskName = '';
        this.description = '';
        this.sortOrder = null;
        this.onDone.emit(false);
    }

    handleTaskNameChange(data: any) {
        this.taskName = data;
        this.errorTaskName = '';
    }

    handleValueChange(data: any) {
        this.value = data;
        this.errorValue = '';
    }

    handleColorChange(data: any) {
        this.color = data;
        this.errorColor = '';
    }

    handleSortOrderChange(data: any) {
        this.sortOrder = data;
    }

    validateForm() {
        let res = true;
        if (this.taskName.trim().length == 0) {
            res = false;
            this.errorTaskName = 'Vui lòng nhập tên trạng thái công việc';
        }
        return res;
    }

    handleAddTaskStatus() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                name: this.taskName,
                sortOrder: Number(this.sortOrder),
                description: this.description,
            };
            this.taskStatusService
                .createTaskStatus(data)
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.onDone.emit(true);
                            },
                            201,
                        );
                    },
                });
        }
    }

    handleUpdateTaskStatus() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                ...this.dialogData,
                name: this.taskName,
                sortOrder: Number(this.sortOrder),
                description: this.description,
            };
            this.taskStatusService
                .updateTaskStatus(data, this.dialogData.id)
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.onDone.emit(true);
                            },
                            200,
                        );
                    },
                });
        }
    }
}
