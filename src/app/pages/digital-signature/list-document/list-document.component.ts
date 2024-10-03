import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IDocument,
    IGetListDocumentPayload,
} from 'src/app/interface/utility/document';
import { DocumentService } from 'src/app/service/api/document.service';
import { AddDocumentComponent } from './add-document/add-document.component';
import { VerificationService } from 'src/app/service/app/verification.service';

@Component({
    selector: 'app-list-document',
    templateUrl: './list-document.component.html',
    styleUrl: './list-document.component.scss',
})
export class ListDocumentComponent extends AppComponentBase {
    listDocument: IDocument[] = [];
    searchParams = {
        name: '',
    };
    isOpeningPDF: boolean = false;

    constructor(
        injector: Injector,
        private readonly documentService: DocumentService,
        private readonly verificationService: VerificationService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.callListDocument();
    }

    callListDocument() {
        this.isLoading = true;
        const payload = {
            page: this.currentPage,
            size: this.rows,
            name: this.searchParams.name,
            mode: 0,
        } as IGetListDocumentPayload;

        this.documentService
            .getListDocument(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listDocument = rs.data;
                this.totalRecord = rs.totalElement;
            });
    }

    loadTable(event: any) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.callListDocument();
    }

    handleSearch(data: string, field: string) {
        this.searchParams[field] = data;
        this.currentPage = 1;
        this.first = 0;
        this.callListDocument();
    }

    navigateSignDocument(document: IDocument) {
        this.router.navigate(['sign-document'], {
            relativeTo: this.route,
            queryParams: {
                id: document.id,
            },
        });
    }

    handleAddDocument() {
        const ref = this.openDialog(
            'Đăng tải tài liệu',
            AddDocumentComponent,
            {},
        );
        ref.onClose.pipe(takeUntil(this.destroy$)).subscribe((rs) => {
            if (rs) {
                this.callListDocument();
                this.toastService.showSuccess(
                    'Thành công',
                    'Thêm tài liệu thành công',
                );
            }
        });
    }

    handleDeleteDocument(document: IDocument) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa tài liệu <strong>${document.path.fileName}</strong>?`,
            () => {
                this.documentService
                    .deleteDocument(document.id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((rs) => {
                        this.apiHandlerService.handleSuccess(
                            rs,
                            () => {
                                this.callListDocument();
                            },
                            200,
                        );
                    });
            },
        );
    }
    previewPDF(document: IDocument) {
        this.isOpeningPDF = true;
        this.documentService
            .getDocumentById(document.id)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => {
                    this.isOpeningPDF = false;
                }),
            )
            .subscribe((rs) => {
                const base64 = rs.data.data;
                const byteCharacters = atob(base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(blob);

                window.open(blobUrl);
            });
    }
}
