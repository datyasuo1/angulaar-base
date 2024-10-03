import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { SignatureConst } from '../../constant/signature-constant';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrl: './signature.component.scss',
})
export class SignatureComponent extends AppComponentBase {
    private isResizing = false;
    private px: number = 0;
    private py: number = 0;
    public width: number = 0;
    public height: number = 0;
    public onDrag: boolean;
    @Input() signatureProperties: SignatureSettings;
    @Input() itemBounds;
    @Input() containerBounds;
    @Input() signatureDefaultImg: string = '';
    @Output() updatePositionSignature = new EventEmitter();
    @Output() onRemoveSignature = new EventEmitter();
    @ViewChild('signatureContainer', { read: ElementRef })
    signatureContainer: ElementRef;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.width = SignatureConst.DEFAULT_SIGNATURE_WIDTH;
        this.height = SignatureConst.DEFAULT_SIGNATURE_HEIGHT;
        this.px = this.itemBounds.x;
        this.py = this.itemBounds.y;
    }

    ngAfterViewInit(): void {
        this.signatureContainer!.nativeElement.style.left = `${this.signatureProperties.positionX}px`;
        this.signatureContainer.nativeElement.style.top = `${this.signatureProperties.positionY}px`;
    }

    handleDeleteSignature() {
        this.onRemoveSignature.emit(this.signatureProperties);
    }
    public dragEnded(event: CdkDragEnd) {
        this.onDrag = false;
        const initialPosition = {
            x: this.signatureProperties.positionX,
            y: this.signatureProperties.positionY,
        };

        const offset = { ...(<any>event.source._dragRef)._passiveTransform };
        let signaturePosition = {
            ...this.signatureProperties,
            dropPoint: event.dropPoint,
            positionX: initialPosition.x + offset.x,
            positionY: initialPosition.y + offset.y,
        };
        this.updatePositionSignature.emit(signaturePosition);
    }

    @HostListener('document:mousemove', ['$event'])
    onCornerMove(event: MouseEvent) {
        if (!this.isResizing) {
            return;
        }

        let offsetX = event.clientX - this.px;
        let offsetY = event.clientY - this.py;

        this.width += offsetX;
        this.height += offsetY;
        let newPositionX = this.signatureProperties.positionX + offsetX;
        let newPositionY = this.signatureProperties.positionY + offsetY;

        newPositionX = Math.max(
            0,
            Math.min(newPositionX, this.containerBounds.width - this.width),
        );
        newPositionY = Math.max(
            0,
            Math.min(newPositionY, this.containerBounds.height - this.height),
        );

        this.px = event.clientX;
        this.py = event.clientY;

        this.signatureProperties.width = Math.max(
            SignatureConst.DEFAULT_SIGNATURE_WIDTH,
            Math.min(
                this.width,
                this.containerBounds.width - this.signatureProperties.positionX,
            ),
        );
        this.signatureProperties.height = Math.max(
            SignatureConst.DEFAULT_SIGNATURE_HEIGHT,
            Math.min(
                this.height,
                this.containerBounds.height -
                    this.signatureProperties.positionY,
            ),
        );

        this.updatePositionSignature.emit(this.signatureProperties);
    }

    @HostListener('document:mouseup', ['$event'])
    onCornerRelease(event: MouseEvent) {
        this.isResizing = false;
    }

    onResize(event: MouseEvent) {
        this.isResizing = true;

        this.px = event.clientX;
        this.py = event.clientY;

        event.preventDefault();
        event.stopPropagation();
    }
}

export interface SignatureSettings {
    page?: number;
    id: number;
    contractSettingId: number;
    isSigned: boolean;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    isAllowSigning?: boolean;
    valueInput?: string;
    signerName: string;
    fontColor?: string;
    fontFamily?: string;
    fontSize?: number;
    isTemporarySigned?: boolean;
    signatureTypeName?: string;
    heightPage: number;
    loading?: boolean;
}
