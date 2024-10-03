import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CascadeSelectChangeEvent } from 'primeng/cascadeselect';

@Component({
    selector: 'app-cascade-select',
    templateUrl: './cascade-select.component.html',
    styleUrls: ['./cascade-select.component.scss'],
})
export class CascadeSelectComponent<T = any> {
    @Input() options: T[] = [];

    @Input() selectedOption: T;

    @Input() label: string = '';

    @Input() optionLabel: string = '';

    @Input() optionGroupLabel: string = '';

    @Input() optionGroupChildren: string[] = [];

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() placeholder: string = '';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onChange = new EventEmitter<T>();

    handleChange(event: CascadeSelectChangeEvent) {
        this.onChange.emit(event.value);
    }
}
