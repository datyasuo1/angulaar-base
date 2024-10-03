import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-reactive-input-number',
    templateUrl: './reactive-input-number.component.html',
    styleUrl: './reactive-input-number.component.scss',
})
export class ReactiveInputNumberComponent {
    @Input() label: string = '';

    @Input() placeholder: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() maxLength: number;

    @Input() min: number;

    @Input() max: number;

    @Input() useGrouping: boolean = false;

    @Input() control: FormControl;
}
