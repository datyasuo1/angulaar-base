import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent),
            multi: true,
        },
    ],
})
export class ColorPickerComponent implements ControlValueAccessor {
    @Input() label: string = '';

    @Input() format: string = 'hex';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onColorChange = new EventEmitter<string>();

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

    handleChange(data: string) {
        this.onColorChange.emit(data);
    }
}
