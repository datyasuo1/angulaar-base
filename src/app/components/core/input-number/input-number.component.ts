import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent {
    @Input() label: string = '';

    @Input() value: number | null = null;

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() maxLength: number;

    @Input() min: number;

    @Input() max: number;

    @Input() placeholder: string = '';

    @Input() useGrouping: boolean = false;

    @Input() iconClass: string = '';

    @Input() showClear: boolean = true;

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onChange = new EventEmitter<string | null>();

    handleChange(event: InputNumberInputEvent) {
        if (event.value != null) {
            const value = event.value.toString().slice(0, this.maxLength);
            this.onChange.emit(value);
        } else {
            this.onChange.emit(null);
        }
    }

    handleClear() {
        this.value = null;
        this.onChange.emit(null);
    }
}
