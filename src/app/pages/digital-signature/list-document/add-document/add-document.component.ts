import { Component, Injector } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, of, switchMap, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { IAddDocumentPayload } from 'src/app/interface/utility/document';
import { DocumentService } from 'src/app/service/api/document.service';
import { ImageService } from 'src/app/service/api/image.service';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
    styleUrl: './add-document.component.scss',
})
export class AddDocumentComponent extends AppComponentBase {
    file: File | undefined = undefined;
    errUploadFile: string = '';
    constructor(
        injector: Injector,
        private documentService: DocumentService,
        private readonly fileService: ImageService,
        public ref: DynamicDialogRef,
    ) {
        super(injector);
    }

    handleFileUpload(file) {
        this.file = file;
        this.errUploadFile = '';
    }

    handleClose() {
        this.ref.close(false);
    }
    handleSave() {
        if (!this.file) {
            this.errUploadFile = 'Vui lòng chọn file';
            return;
        }

        this.isLoading = true;
        const formData = new FormData();
        formData.append('service', 'alarms');
        formData.append('files', this.file);
        this.fileService
            .uploadMultipleFiles(formData)
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                const payload = {
                    path: JSON.stringify(rs.data).slice(1, -1),
                } as IAddDocumentPayload;
                this.documentService
                    .addDocument(payload)
                    .pipe(
                        takeUntil(this.destroy$),
                        finalize(() => (this.isLoading = false)),
                    )
                    .subscribe((rs) => {
                        this.ref.close(true);
                    });
            });
    }
}
