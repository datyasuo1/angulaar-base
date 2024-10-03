import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaComponent),
            multi: true,
        },
    ],
})
export class TextAreaComponent implements ControlValueAccessor {
    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() autoResize: boolean = false;

    @Input() rows: number = 1;

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() maxLength: string = '524288';

    @Input() iconClass: string = '';

    @Input() showClear: boolean = true;

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    height: string = '';

    private _value?: string = '';

    public set value(value: string) {
        this.writeValue(value);
    }

    public get value() {
        return this._value;
    }

    private onTouch: (value?: string) => void = (value?: string) => {};

    private onChange: (value?: string) => void = (value?: string) => {};

    public writeValue(value?: string): void {
        this._value = value;
        this.onChange(value);
        this.onTouch(value);
    }

    public registerOnChange(fn: (value?: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: (value?: string) => void): void {
        this.onTouch = fn;
    }

    ngOnInit(): void {
        this.height = this.rows * 35 + 'px';
    }

    handleClear() {
        this.value = '';
    }
}
