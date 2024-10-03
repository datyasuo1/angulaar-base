import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-reactive-select',
    templateUrl: './reactive-select.component.html',
    styleUrl: './reactive-select.component.scss',
})
export class ReactiveSelectComponent {
    @Input() label: string = '';

    @Input() options: any[] = [];

    @Input() selectedOption: any;

    @Input() optionLabel: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() filter: boolean = true;

    @Input() resetFilterOnHide: boolean = true;

    @Input() showClear: boolean = true;

    @Input() filterMatchMode: string = 'contains';

    @Input() emptyFilterMessage: string = 'Không có dữ liệu';

    @Input() emptyMessage: string = 'Không có dữ liệu';
    @Input() control: FormControl;
}
