import {
    Component,
    ElementRef,
    Injector,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { SignatureConst } from '../constant/signature-constant';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { AppComponentBase } from 'src/app/app-component-base';
import { DocumentService } from '../../../service/api/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import {
    IPdfProperties,
    ISignDocumentPayload,
    ISignatureProperties,
} from '../../../interface/utility/document';
import { ConfirmSigningComponent } from './confirm-signing/confirm-signing.component';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
@Component({
    selector: 'app-sign-document',
    templateUrl: './sign-document.component.html',
    styleUrl: './sign-document.component.scss',
})
export class SignDocumentComponent extends AppComponentBase {
    @ViewChild('page', { read: ElementRef }) containers: ElementRef;
    @ViewChildren('dropZone') dropZone: QueryList<any>;
    @ViewChild('signatureOptions') signatureOptions: CdkDropList;
    private DEFAULT_SIGNATURE_OPTION = {
        id: 1,
        label: 'chữ ký số',
    };
    private DOCUMENT_SCALE_VALUE = 1.45;
    listSignature = [this.DEFAULT_SIGNATURE_OPTION];
    listDocument: IPdfProperties[] = [];
    currentDocumentPage: number = 1;
    dropList: CdkDropList[] = [];
    documentId: number = 0;
    draggedToContainer: boolean = false;
    defaultSignaturePath: string = '';
    signatureToSign = {} as ISignatureProperties;
    documentName: string = '';
    itemBounds: any;
    containerBounds: any;
    isSigning: boolean = false;
    hasSignature: boolean = false;
    constructor(
        injector: Injector,
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super(injector);
        this.documentId = Number(route.snapshot.queryParamMap.get('id'));
    }

    ngOnInit() {
        this.getDefaultSignature();
        this.getPDfById();
    }

    ngAfterViewInit(): void {
        this.dropZone.changes.subscribe((dropZone) =>
            dropZone.forEach((dropItem) => this.dropList.push(dropItem)),
        );
    }

    getPDfById() {
        const scale = this.DOCUMENT_SCALE_VALUE;
        this.isLoading = true;
        this.documentService
            .getDocumentById(this.documentId)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe(async (rs) => {
                this.listDocument =
                    await this.generateImageStringsFromBase64PDF(
                        rs.data.data,
                        scale,
                    );
                this.documentName = rs.data.fileName;
            });
    }

    getDefaultSignature() {
        this.documentService
            .getAllSignature()
            .pipe(takeUntil(this.destroy$))
            .subscribe((rs) => {
                const defaultSignature = rs.data.find((x) => x.isDefault);
                this.defaultSignaturePath =
                    defaultSignature.imageHost + defaultSignature.path.path;
            });
    }

    drop(event: any) {
        const element = event.container.element.nativeElement;
        this.containerBounds = element.getBoundingClientRect();
        this.itemBounds = event.dropPoint;
        const indexPage = event.container.element.nativeElement.id;
        const signatureTypeId = event.item.element.nativeElement.data;

        const positionInContainer = {
            x: this.itemBounds.x - this.containerBounds.left,
            y: this.itemBounds.y - this.containerBounds.top,
        };

        const signature = {
            isSigned: false,
            positionX: positionInContainer.x,
            positionY: positionInContainer.y,
            signatureType: signatureTypeId,
            page: +indexPage,
            width: SignatureConst.DEFAULT_SIGNATURE_WIDTH,
            height: SignatureConst.DEFAULT_SIGNATURE_HEIGHT,
        } as ISignatureProperties;

        if (this.itemBounds.x > this.containerBounds.right - signature.width) {
            signature.positionX = positionInContainer.x - signature.width;
            signature.positionY = positionInContainer.y;
        }

        if (
            this.itemBounds.y >
            this.containerBounds.bottom - signature.height
        ) {
            signature.positionX = positionInContainer.x - signature.width;
            signature.positionY = positionInContainer.y - signature.height;
        }

        if (
            this.itemBounds.x < this.containerBounds.left + signature.width &&
            this.itemBounds.y > this.containerBounds.bottom - signature.height
        ) {
            signature.positionX = positionInContainer.x;
            signature.positionY = positionInContainer.y - signature.height;
        }

        if (
            this.itemBounds.x >= this.containerBounds.left &&
            this.itemBounds.x <= this.containerBounds.right &&
            this.itemBounds.y >= this.containerBounds.top &&
            this.itemBounds.y <= this.containerBounds.bottom
        ) {
            this.listDocument[signature.page - 1].signatureSettings.push(
                signature,
            );
            this.listSignature = [];
            this.signatureToSign = signature;
            this.hasSignature = true;
        }
    }

    generateImageStringsFromBase64PDF = async (base64PDF, scale: number) => {
        const arrayBuffer = Uint8Array.from(atob(base64PDF), (c) =>
            c.charCodeAt(0),
        ).buffer;
        const base64Images = [];
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        const totalPages = pdf.numPages;

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvasContext.imageSmoothingEnabled = true;
            canvasContext.imageSmoothingQuality = 'high';

            await page.render({ canvasContext, viewport }).promise;

            const base64Image = canvas
                .toDataURL('image/jpeg')
                .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            base64Images.push({
                page: pageNumber,
                fileBase64: 'data:image/jpeg;base64,' + base64Image,
                width: canvas.width,
                height: canvas.height,
                signatureSettings: [],
            });
        }

        return base64Images;
    };

    handleUpdateSignature($event) {
        const signature = {
            ...$event,
            positionX: $event.positionX,
            positionY: $event.positionY,
        };
        this.signatureToSign = signature;
    }

    handleRemoveSignature(event, page) {
        const documentPage = this.listDocument.find((x) => x.page === page);
        documentPage.signatureSettings = [];
        this.listSignature = [this.DEFAULT_SIGNATURE_OPTION];
        this.draggedToContainer = false;
        this.hasSignature = false;
    }

    handleScrollPage(idPage) {
        this.currentDocumentPage = idPage;
        document
            .getElementById(`${idPage}`)
            .scrollIntoView({ behavior: 'smooth' });
    }

    getCoordinates(x: number, y: number, height: number, page: number) {
        const coordinateY =
            this.listDocument[page - 1].height / this.DOCUMENT_SCALE_VALUE - y;

        return {
            x: Math.round(x),
            y: Math.round(coordinateY - height),
        };
    }

    handleSignDocument() {
        this.isSigning = true;

        const { positionX, positionY, width, height, page } =
            this.signatureToSign;

        const signatureProps = {
            width: width / this.DOCUMENT_SCALE_VALUE,
            height: height / this.DOCUMENT_SCALE_VALUE,
            x: positionX / this.DOCUMENT_SCALE_VALUE,
            y: positionY / this.DOCUMENT_SCALE_VALUE,
        };

        const coordinates = this.getCoordinates(
            signatureProps.x,
            signatureProps.y,
            signatureProps.height,
            page,
        );

        const payload = {
            documentId: this.documentId,
            options: {
                width: signatureProps.width,
                height: signatureProps.height,
                x: coordinates.x,
                y: coordinates.y,
                signPage: page,
            },
        } as ISignDocumentPayload;

        this.documentService
            .signDocument(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isSigning = false)),
            )
            .subscribe((res) => {
                const dialogConfig = {
                    signResult: res.data,
                    documentName: this.documentName,
                };

                const ref = this.openDialog(
                    'Xác thực',
                    ConfirmSigningComponent,
                    dialogConfig,
                );
                ref.onClose.subscribe((rs) => {
                    if (rs) {
                        this.navigateToListDocument();
                    }
                });
            });
    }

    handleClose() {
        this.navigateToListDocument();
    }

    navigateToListDocument() {
        this.router.navigate(['utility/digital-signature']);
    }
}
