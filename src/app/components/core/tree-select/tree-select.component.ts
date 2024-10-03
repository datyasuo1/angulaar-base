import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss'],
})
export class TreeSelectComponent {
    @Input() options: any[] = [];

    @Input() label: string = '';

    @Input() selectedOption: any;

    @Input() disabled: boolean = false;

    @Input() appendTo: string = 'body';

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() required: boolean = false;

    @Input() filter: boolean = true;

    @Input() resetFilterOnHide: boolean = true;

    @Input() showClear: boolean = true;

    @Input() filterMode: string = 'lenient';

    @Input() emptyMessage: string = 'Không có dữ liệu';

    @Input() optionLabel: string = 'name';

    @Input() autofocus: boolean = false;

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onChange = new EventEmitter();

    @Output() onClear = new EventEmitter();

    @Input() hasFilter: boolean = false;

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

    addLabel(obj: any) {
        if (obj && obj[this.optionLabel]) {
            obj.label = obj[this.optionLabel];
            if (obj.children && obj.children?.length > 0) {
                obj.children.forEach((child: any) => {
                    this.addLabel(child);
                });
            }
        }
    }

    get convertedOptions(): any[] {
        if (this.options && this.options.length > 0) {
            this.options.forEach((obj: any) => {
                this.addLabel(obj);
            });
        }

        return this.options;
    }

    handleChange(data: any) {
        this.onChange.emit(data);
    }

    handleClear() {
        this.selectedOption = null;
        if (this.hasFilter) {
            setTimeout(() => {
                this.selectedOption = this.options[0];
            });
        }
        this.onClear.emit();
    }
}
