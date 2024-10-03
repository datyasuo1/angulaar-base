import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordComponent),
            multi: true,
        },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class PasswordComponent implements ControlValueAccessor {
    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() autofocus: boolean = false;

    @Input() toggleMask: boolean = true;

    @Input() showClear: boolean = true;

    @Input() maxLength: string = '524288';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    private _value: string = '';

    public set value(value: string) {
        this.writeValue(value);
    }

    public get value() {
        return this._value;
    }

    private onTouch: (value: string) => void = (value: string) => {};

    private onChange: (value: string) => void = (value: string) => {};

    public writeValue(value: string): void {
        this._value = value;
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
