import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from 'src/app/service/api/department.service';
import { NoteControllerService } from 'src/app/service/api/note-controller.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { ConfirmationService } from 'primeng/api';
import { convertToDateFormat } from 'src/app/utils/datetime';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
@Component({
    selector: 'app-note-controller',
    templateUrl: './note-controller.component.html',
    styleUrls: ['./note-controller.component.scss'],
    providers: [DatePipe],
})
export class NoteControllerComponent {
    constructor(
        private noteControllerService: NoteControllerService,
        private verificationService: VerificationService,
        private apiHandlerService: ApiHandlerService,
        private confirmService: ConfirmationService,
        private datePipe: DatePipe,
    ) {}

    ngOnInit() {
        this.getListNote();
    }

    getCurrentDate(): string {
        const date = new Date();
        return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
    }

    isEditing: boolean = false;

    data: any;

    loading: boolean = false;

    selectedNote: any;

    newNoteTitle: string = '';

    isloading: boolean = false;

    currentPage: number = 1;

    first: number = 0;

    rows: number = 10;

    newNoteContext: any;

    noteList: any[] = [];

    searchText: string = '';

    totalRecords: number = 0;

    dialogTitle: string = '';

    dialogButtonText: string = '';

    dialogData: any = undefined;

    showDialog: boolean = false;

    updatingNote = {} as any;
    errTitle: string = '';
    errContext: string = '';

    handleSearchContentChange(data: any) {
        this.searchText = data;
    }

    handleSearchEnter() {
        this.getListNote();
        this.isEditing = false;
    }

    handleSearch() {
        this.getListNote();
        this.isEditing = false;
    }

    onAddClick() {
        this.isEditing = true;
    }

    onChange(note) {
        this.selectedNote = note.value;
        this.isEditing = false;
    }

    handleDeleteNote() {
        this.verificationService.delVerification(
            `Bạn có chắc chắn muốn xóa ghi chú <strong>${this.selectedNote.title}</strong>?`,
            () => {
                this.noteControllerService
                    .deleteNote(this.selectedNote.id)
                    .subscribe({
                        next: (res: any) => {
                            this.apiHandlerService.handleSuccess(res, () => {
                                this.getListNote();
                            });
                        },
                    });
            },
        );
    }

    handleEditNote() {
        this.updatingNote = { ...this.selectedNote };
        this.isEditing = true;
    }

    calcHeight() {
        return `calc(68vh)`;
    }

    handleTitleChange(data: string) {
        this.updatingNote.title = data;
        this.errTitle = '';
    }

    handleContextChange(data: string) {
        this.updatingNote.context = data;
        this.errContext = '';
    }

    handleSave() {
        if (!this.validSave()) {
            return;
        }

        const data = {
            context: this.updatingNote.context,
            title: this.updatingNote.title,
        };
        this.isloading = true;
        if (!this.updatingNote.id) {
            this.noteControllerService
                .createNote(data)
                .pipe(
                    finalize(() => {
                        this.isloading = false;
                        this.isEditing = false;
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        this.apiHandlerService.handleSuccess(res, () => {
                            this.getListNote();
                        });
                    },
                });
        } else {
            this.noteControllerService
                .updateNote(this.updatingNote.id, data)
                .pipe(
                    finalize(() => {
                        this.isloading = false;
                        this.isEditing = false;
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        this.apiHandlerService.handleSuccess(res, () => {
                            this.getListNote();
                        });
                    },
                });
        }
    }

    private validSave() {
        let isValid: boolean = true;
        if (!this.updatingNote.title) {
            this.errTitle = 'Vui lòng nhập tiêu đề';
            isValid = false;
        }
        if (!this.updatingNote.context) {
            this.errContext = 'Vui lòng nhập nội dung';
            isValid = false;
        }
        console.log('this.updatingNote', this.updatingNote);
        return isValid;
    }

    handleCancel() {
        this.isEditing = false;
        this.updatingNote = {};
    }

    handleEdit(data: any) {
        this.dialogTitle = 'Cập nhật loại công việc';
        this.dialogButtonText = 'Cập nhật';
        this.showDialog = true;
        this.dialogData = data;
    }

    getListNote() {
        this.loading = true;
        this.noteControllerService
            .getNoteList(this.searchText)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    this.noteList = res.data;
                    this.selectedNote = res.data[0]?.items[0];
                    this.updatingNote = {};
                },
            });
    }
}
