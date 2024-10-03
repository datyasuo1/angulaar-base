import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { finalize } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import {
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse, Image } from 'src/app/service/common';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-add-priority',
    templateUrl: './add-priority.component.html',
    styleUrls: ['./add-priority.component.scss'],
})
export class AddPriorityComponent
    extends FormBaseComponent
    implements OnChanges
{
    constructor(
        private priorityService: PriorityService,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['dialogData'] &&
            !changes['dialogData']?.firstChange &&
            this.dialogData
        ) {
            const data = changes['dialogData'].currentValue;
            this.value = data.value;
            this.priorityName = data.name || '';
            this.color = data.colorCode || '';

            if (data.icon && Object.keys(data.icon).length > 0) {
                const icon = data.icon;
                icon.name = icon.fileName;
                this.file = icon;
            }
        }
    }

    @Input() show: boolean = false;

    @Output() onDone = new EventEmitter<boolean>();

    @Input() dialogTitle: string = '';

    @Input() dialogData: Priority;

    dialogLoading = false;

    value: number | null = null;

    errorValue = '';

    errorPriorityName: string = '';

    priorityName: string = '';

    file: Image;

    color: string = '';

    errorColor: string = '';

    handleFileChange(file: Image) {
        this.file = file;
    }

    handleClose() {
        this.onDone.emit(false);
    }

    resetDialog() {
        this.value = null;
        this.errorValue = '';
        this.priorityName = '';
        this.errorPriorityName = '';
        this.color = '';
        this.errorColor = '';
        this.file = undefined;
        this.onDone.emit(false);
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.priorityName)) {
            res = false;
            this.errorPriorityName = 'Vui lòng nhập tên độ ưu tiên';
        }
        if (this.value == null) {
            res = false;
            this.errorValue = 'Vui lòng nhập giá trị';
        }
        if (!validator.isStringInputValid(this.color)) {
            res = false;
            this.errorColor = 'Vui lòng chọn màu đại diện';
        }
        return res;
    }

    handlePriorityForm() {
        const isAdd = this.dialogTitle === 'Thêm mới độ ưu tiên';
        if (this.validateForm()) {
            this.dialogLoading = true;

            ((isAdd: boolean) => {
                const data = {
                    name: this.priorityName?.trim(),
                    value: this.value?.toString()?.trim() ?? '',
                    colorCode: this.color?.trim(),
                    icon: JSON.stringify(this.file ?? {}),
                };
                if (isAdd) {
                    return this.priorityService.addPriority(data);
                } else {
                    return this.priorityService.updatePriority(
                        this.dialogData?.id,
                        data,
                    );
                }
            })(isAdd)
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        if (isAdd) {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.onDone.emit(true);
                                },
                                201,
                            );
                        } else {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.onDone.emit(true);
                                },
                                200,
                            );
                        }
                    },
                });
        }
    }
}
