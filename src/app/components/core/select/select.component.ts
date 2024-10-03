import {
    Component,
    Input,
    EventEmitter,
    Output,
    SimpleChanges,
} from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent<T = unknown> {
    @Input() label: string = '';

    @Input() options: T[] = [];

    @Input() selectedOption: T;

    @Input() optionLabel: string = 'name';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() disabled: boolean = false;

    @Input() filter: boolean = true;

    @Input() appendTo: string = 'body';

    @Input() resetFilterOnHide: boolean = true;

    @Input() showClear: boolean = true;

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Input() hasFilter: boolean = false;

    @Input() filterMatchMode:
        | 'endsWith'
        | 'startsWith'
        | 'contains'
        | 'equals'
        | 'notEquals'
        | 'in'
        | 'lt'
        | 'lte'
        | 'gt'
        | 'gte' = 'contains';

    @Input() emptyFilterMessage: string = 'Không có dữ liệu';

    @Input() emptyMessage: string = 'Không có dữ liệu';

    @Input() autofocus: boolean = false;

    @Output() onChange = new EventEmitter<T>();

    @Output() onClear = new EventEmitter<Event>();

    all: string = '-- Tất cả --';

    ngOnInit() {
        if (this.hasFilter && !this.hasAllField()) {
            this.addAllField();
            this.selectedOption = this.options[0];
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            !changes['options']?.firstChange &&
            this.hasFilter &&
            !this.hasAllField()
        ) {
            this.addAllField();
        }
    }

    hasAllField() {
        return (
            this.options.filter((item) => item[this.optionLabel] === this.all)
                .length > 0
        );
    }

    addAllField() {
        const allValue = { [this.optionLabel]: this.all } as any;
        this.options = [allValue, ...this.options];
    }

    handleChange(event: DropdownChangeEvent) {
        this.onChange.emit(event.value);
    }

    handleClear(event: Event) {
        this.selectedOption = null;
        if (this.hasFilter) {
            setTimeout(() => {
                this.selectedOption = this.options[0];
            });
        }
        this.onClear.emit(event);
    }
}
