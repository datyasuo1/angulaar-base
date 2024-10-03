import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
    @Input() inputId: string = '';

    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() error: string = '';

    @Input() switchValue: boolean = false;

    @Output() onChange = new EventEmitter<boolean>();

    handleChange(event: InputSwitchChangeEvent) {
        this.onChange.emit(event.checked);
    }
}
