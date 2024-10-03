import { Component } from '@angular/core';

@Component({
    selector: 'app-form-base',
    standalone: true,
    imports: [],
    templateUrl: './form-base.component.html',
    styleUrl: './form-base.component.scss',
})
export class FormBaseComponent {
    loading: boolean = false;

    protected handleDataChange(data: unknown, variable: string) {
        this[variable] = data;
        const x = variable.charAt(0).toUpperCase() + variable.slice(1);
        const type = typeof this['error' + x];
        if (type === 'string') this['error' + x] = '';
    }
}
