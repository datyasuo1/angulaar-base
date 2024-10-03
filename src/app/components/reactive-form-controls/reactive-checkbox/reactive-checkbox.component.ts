import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-reactive-checkbox',
    templateUrl: './reactive-checkbox.component.html',
    styleUrl: './reactive-checkbox.component.scss',
})
export class ReactiveCheckboxComponent {
    @Input() label: string = '';

    @Input() value: any;

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() disabled: boolean = false;

    @Input() binary: boolean = false;

    @Input() control: FormControl;
}
