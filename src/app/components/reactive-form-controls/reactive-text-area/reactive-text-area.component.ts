import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-reactive-text-area',
    templateUrl: './reactive-text-area.component.html',
    styleUrl: './reactive-text-area.component.scss',
})
export class ReactiveTextAreaComponent {
    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() rows: string = '';

    @Input() cols: string = '';

    @Input() placeholder: string = '';

    @Input() autoResize: boolean = false;
    @Input() maxLength: string = '255';
    @Input() control: FormControl;
}
