import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent<T = any> {
    constructor(private elementRef: ElementRef) {}

    @Input() label: string = '';

    @Input() options: T[] = [];

    @Input() selectedOption: T[];

    @Input() optionLabel: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() showClear: boolean = true;

    @Input() disabled: boolean = false;

    @Input() showToggleAll: boolean = true;

    @Input() defaultLabel: string = '';

    @Input() emptyFilterMessage: string = 'Không có dữ liệu';

    @Input() emptyMessage: string = 'Không có dữ liệu';

    @Input() autofocus: boolean = false;

    @Input() appendTo: string = 'body';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onChange = new EventEmitter<T>();

    @Output() onClear = new EventEmitter();

    setPosition() {
        // It's not the best solution, but it currently solved the problem
        const mp = this.elementRef.nativeElement.getElementsByClassName(
            'p-multiselect-panel',
        )[0];

        const m =
            this.elementRef.nativeElement.getElementsByClassName(
                'p-multiselect',
            )[0];

        if (mp && mp.style) {
            mp.style.position = 'absolute';
            setTimeout(() => {
                mp.style.top = m.clientHeight - 34 + 'px';
            }, 0);
        }
    }

    // handleChange(event: MultiSelectChangeEvent) {
    //     this.setPosition();
    //     if (!event) this.onChange.emit(null);
    //     else this.onChange.emit(event.value);
    // }

    handleClear() {
        this.onClear.emit();
    }

    handleNgModelChange(data: T) {
        this.setPosition();
        if (!data) this.onChange.emit(null);
        else this.onChange.emit(data);
    }
}
