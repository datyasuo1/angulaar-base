import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import _ from 'lodash';
import { finalize } from 'rxjs';
import { ImageService } from 'src/app/service/api/image.service';
import { CommonResponseData, Image } from 'src/app/service/common';
@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
})
export class FileComponent {
    constructor(private imageService: ImageService) {}

    @ViewChild('buttonFileInput', { static: false })
    myButtonFileInput: ElementRef;

    @ViewChild('fileInput', { static: false }) myFileInput: ElementRef;

    @Input() inputId: string = '';

    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() accept: string = '';

    @Input() files: (File | Image)[] = [];

    @Input() file: any = undefined;

    @Input() size: number = 10;

    @Input() error: string = '';

    @Input() multiple: boolean = false;

    @Input() autofocus: boolean = false;

    @Input() autoUpload: boolean = false;

    @Input() service: string = '';

    @Input() getInternalError: boolean = false;

    @Output() onChange = new EventEmitter<any>();

    internalError: string = '';

    loading: boolean = false;

    validateFile(file: File) {
        let error = '';
        const { name, size } = file ?? {};
        const fileExtension = name
            ?.substring(name.lastIndexOf('.'))
            ?.toLowerCase();
        if (!this.accept.includes(fileExtension)) {
            error = 'File không đúng định dạng';
        } else if (size > this.size * 1024 * 1024) {
            error = `File không được phép vượt quá ${this.size}MB`;
        }

        return error;
    }

    emitDataOnChange(data: (File | Image) | (File | Image)[]) {
        if (this.getInternalError) {
            if (this.multiple) {
                this.onChange.emit({ files: data, error: this.internalError });
            } else {
                this.onChange.emit({ file: data, error: this.internalError });
            }
        } else {
            this.onChange.emit(data);
        }
    }

    uploadFile(file: File) {
        if (file instanceof File) {
            this.loading = true;
            const formData = new FormData();
            formData.append('service', this.service);
            formData.append('file', file);
            this.imageService
                .uploadImage(formData)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe((res: CommonResponseData<Image>) => {
                    this.file = res?.data;
                    this.emitDataOnChange(this.file);
                });
        }
    }

    uploadFiles(files: (File | Image)[]) {
        const uploadFiles = files.filter(
            (item) => item instanceof File,
        ) as File[];
        const noUploadFiles = files.filter(
            (item) => !(item instanceof File),
        ) as Image[];
        if (uploadFiles.length > 0) {
            this.loading = true;
            const formData = new FormData();

            formData.append('service', this.service);

            for (let i = 0; i < uploadFiles.length; i++) {
                formData.append('files', uploadFiles[i]);
            }

            this.imageService
                .uploadMultipleFiles(formData)
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe((res: CommonResponseData<Image[]>) => {
                    this.files = [...noUploadFiles, ...res?.data];
                    this.emitDataOnChange(this.files);
                });
        }
    }

    handleChangeAutoUpload(filesTemp: any) {
        this.internalError = '';
        if (!this.multiple) {
            const file = filesTemp[0];
            this.internalError = this.validateFile(file);
            if (this.internalError.length > 0) {
                // this.file = undefined;
                this.emitDataOnChange(this.file);
            } else {
                this.uploadFile(file);
            }
        } else {
            const files = [...this.files, ...filesTemp];
            let sizeTotal = 0;
            for (let i = 0; i < files.length; i++) {
                this.internalError = this.validateFile(files[i]);
                sizeTotal += files[i].size;
                if (this.internalError.length > 0) break;
            }
            if (sizeTotal > this.size * 1024 * 1024) {
                this.internalError = `Tổng kích thước các file không được phép vượt quá ${this.size}MB`;
            }
            if (this.internalError.length > 0) {
                this.emitDataOnChange(this.files);
            } else {
                this.uploadFiles(files);
            }
        }
        this.myFileInput.nativeElement.value = '';
    }

    handleChangeNoAutoUpload(filesTemp: any) {
        this.internalError = '';
        if (!this.multiple) {
            const file = filesTemp[0];
            this.internalError = this.validateFile(file);

            if (this.internalError.length > 0) {
                // this.file = undefined;
                this.emitDataOnChange(this.file);
            } else {
                this.emitDataOnChange(file);
            }
        } else {
            const files = [...this.files, ...filesTemp];
            let sizeTotal = 0;
            for (let i = 0; i < files.length; i++) {
                this.internalError = this.validateFile(files[i]);
                sizeTotal += files[i].size;
                if (this.internalError.length > 0) break;
            }

            if (sizeTotal > this.size * 1024 * 1024) {
                this.internalError = `Tổng kích thước các file không được phép vượt quá ${this.size}MB`;
            }

            if (this.internalError.length > 0) {
                this.emitDataOnChange(this.files);
            } else {
                this.emitDataOnChange(files);
            }
        }
        this.myFileInput.nativeElement.value = '';
    }

    handleChange(event: any, type: string = 'INPUT') {
        event.preventDefault();
        const filesTemp =
            type === 'INPUT' ? event.target.files : event.dataTransfer.files;
        if (this.autoUpload) {
            this.handleChangeAutoUpload(filesTemp);
        } else {
            this.handleChangeNoAutoUpload(filesTemp);
        }
    }

    handleDeleteFile(file: any = null) {
        if (!this.multiple) {
            this.file = undefined;
            this.emitDataOnChange(this.file);
        } else {
            const files = Array.from(this.files).filter(
                (item: File) => !_.isEqual(item, file),
            );
            this.emitDataOnChange(files);
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.myButtonFileInput.nativeElement.style.borderColor =
            'var(--primary-color)';
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.myButtonFileInput.nativeElement.style.borderColor = '';
    }
}
