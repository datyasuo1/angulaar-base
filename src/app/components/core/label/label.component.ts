import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
    @Input() inputId: string = '';

    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;
}
