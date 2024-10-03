import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
export function dialogFactory(wrapper: DialogComponent) {
    return wrapper.dialog;
}

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    providers: [
        {
            provide: Dialog,
            useFactory: dialogFactory,
            deps: [DialogComponent],
        },
    ],
})
export class DialogComponent {
    @ContentChild('header', { static: false }) header: TemplateRef<any>;

    @ContentChild('content', { static: false }) content: TemplateRef<any>;

    @ContentChild('footer', { static: false }) footer: TemplateRef<any>;

    @ViewChild('dialog', { static: true }) dialog: Dialog;

    @Input() modal: boolean = true;

    @Input() visible: boolean = true;

    @Input() styleClass: string = 'md:w-8 lg:w-7 xl:w-6 xxl:w-5';

    @Output() onHide = new EventEmitter();

    @Output() visibleChange = new EventEmitter<boolean>();

    handleHide() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.onHide.emit();
    }
}
