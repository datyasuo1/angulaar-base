import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { TaskClassificationService } from 'src/app/service/api/task-classification.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';

@Component({
    selector: 'app-add-task-classification',
    templateUrl: './add-task-classification.component.html',
    styleUrls: ['./add-task-classification.component.scss'],
})
export class AddTaskClassificationComponent implements OnChanges {
    constructor(
        private taskClassificationService: TaskClassificationService,
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
            this.sortOrder = data.sortOrder || null;
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

    errorTaskClassificationName: string = '';

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
            this.errorTaskName = 'Vui lòng nhập tên loại công việc';
        }
        return res;
    }

    handleAddTaskClassification() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                name: this.taskName,
                sortOrder: this.sortOrder,
                description: this.description,
            };
            this.taskClassificationService
                .createTaskClassification(data)
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

    handleUpdateTaskClassification() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                ...this.dialogData,
                name: this.taskName,
                sortOrder: this.sortOrder,
                description: this.description,
            };
            this.taskClassificationService
                .updateTaskClassification(data, this.dialogData.id)
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
                    error: (err: any) => {
                        this.apiHandlerService.handleError(err);
                    },
                });
        }
    }
}
