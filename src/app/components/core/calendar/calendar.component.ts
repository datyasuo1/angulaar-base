import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true,
        },
    ],
})
export class CalendarComponent implements ControlValueAccessor {
    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() selectionMode: 'single' | 'multiple' | 'range' | undefined =
        'single';

    @Input() readonlyInput: boolean = false;

    @Input() showOnFocus: boolean = false;

    @Input() showIcon: boolean = true;

    @Input() keepInvalid: boolean = false;

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() dateFormat: string = 'dd/mm/yy';

    @Input() appendTo: string | null = 'body';

    @Input() minDate: Date = null;

    @Input() maxDate: Date = null;

    @Input() disabled: boolean = false;

    @Input() showClear: boolean = true;

    @Input() showTime: boolean = false;

    @Input() hourFormat: number = 12;

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    private _value?: Date[] | Date;

    public set value(value: Date[] | Date | undefined) {
        this.writeValue(value);
    }

    public get value() {
        return this._value;
    }

    private onTouch: (value?: Date[] | Date) => void = (
        value?: Date[] | Date,
    ) => {};

    private onChange: (value?: Date[] | Date) => void = (
        value?: Date[] | Date,
    ) => {};

    public writeValue(value?: Date[] | Date): void {
        this._value = value;
        this.onChange(value);
        this.onTouch(value);
    }

    public registerOnChange(fn: (value?: Date[] | Date) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: (value?: Date[] | Date) => void): void {
        this.onTouch = fn;
    }

    getDate(value: string) {
        return new Date(
            value.slice(4, 8) +
                '/' +
                value.slice(2, 4) +
                '/' +
                value.slice(0, 2),
        );
    }

    handleInput(value: string) {
        if (
            value?.length === 8 &&
            this.selectionMode === 'single' &&
            !value.includes('/')
        ) {
            const date = this.getDate(value);
            if (!isNaN(date.getTime())) {
                this.writeValue(date);
            }
        }
        if (
            value?.length === 16 &&
            this.selectionMode === 'range' &&
            !value.includes('/')
        ) {
            const start = this.getDate(value.slice(0, 8));
            const end = this.getDate(value.slice(8, 16));

            if (!isNaN(end.getTime()) && !isNaN(start.getTime())) {
                this.writeValue([start, end]);
            }
        }
    }
}
