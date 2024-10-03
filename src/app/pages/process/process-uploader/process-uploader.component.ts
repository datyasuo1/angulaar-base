import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { ProcessService } from 'src/app/service/api/process.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { CommonResponse } from 'src/app/service/common';
@Component({
    selector: 'app-process-uploader',
    templateUrl: './process-uploader.component.html',
    styleUrls: ['./process-uploader.component.scss'],
})
export class ProcessUploaderComponent {
    constructor(
        private location: Location,
        private processService: ProcessService,
        private apiHandlerService: ApiHandlerService,
    ) {}

    file: File;

    queue: number;

    code: string;

    errorFile: string = '';

    loading: boolean = false;

    handleFileChange(file: File) {
        this.file = file;
        this.errorFile = '';
    }

    handleCancel() {
        this.location.back();
    }

    validateForm() {
        let res = true;
        if (!this.file) {
            this.errorFile = 'Vui lòng chọn file để tải lên!';
            res = false;
        }
        return res;
    }
    handleSave() {
        if (this.validateForm()) {
            this.loading = true;
            this.processService
                .importFile(this.file, this.queue)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe({
                    next: (res: CommonResponse) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.location.back();
                            },
                            201,
                        );
                    },
                });
        }
    }
}
