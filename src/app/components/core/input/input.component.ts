import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() label: string = '';

    @Input() value: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() type: string = 'text';

    @Input() maxLength: string = '524288';

    @Input() iconClass: string = '';

    @Input() placeholder: string = '';

    @Input() disabled: boolean = false;

    @Input() showClear: boolean = true;

    @Input() autofocus: boolean = false;

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Input() autoTrim: boolean = false;

    @Output() onChange = new EventEmitter<string>();
    @Output() onEnter = new EventEmitter();
    @Output() onInput = new EventEmitter();

    handleChange(event: Event) {
        this.onChange.emit((event.target as HTMLInputElement).value);
    }

    handleEnter() {
        this.onEnter.emit();
    }
    handleInput(event) {
        this.onInput.emit(event.target.value);
    }
    handleBlur(event: Event) {
        if (this.autoTrim) {
            this.onChange.emit((event.target as HTMLInputElement).value.trim());
        }
    }

    handleClear() {
        this.value = '';
        this.onChange.emit('');
    }
}
