import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-reactive-input',
    templateUrl: './reactive-input.component.html',
    styleUrl: './reactive-input.component.scss',
})
export class ReactiveInputComponent {
    @Input() label: string = '';

    @Input() value: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() type: string = 'text';

    @Input() maxLength: string = '255';

    @Input() iconClass: string = '';

    @Input() placeholder: string = '';

    @Input() showClear: boolean = true;

    @Input() control: FormControl;
}
