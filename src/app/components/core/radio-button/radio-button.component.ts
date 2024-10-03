import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonClickEvent } from 'primeng/radiobutton';

@Component({
    selector: 'app-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true,
        },
    ],
})
export class RadioButtonComponent<T = any> implements ControlValueAccessor {
    @Input() value: T;

    @Input() inputId: string = '';

    @Input() name: string = '';

    @Input() label: string = '';

    @Output() onClick = new EventEmitter();

    handleClick(event: RadioButtonClickEvent) {
        this.onClick.emit(event);
    }

    private _selectedValue: string = '';

    public set selectedValue(value: string) {
        this.writeValue(value);
    }
    public get selectedValue() {
        return this._selectedValue;
    }

    private onTouch: (value: string) => void = (value: string) => {};

    private onChange: (value: string) => void = (value: string) => {};

    public writeValue(value: string): void {
        this._selectedValue = value;
        this.onChange(value);
        this.onTouch(value);
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: (value: string) => void): void {
        this.onTouch = fn;
    }
}
