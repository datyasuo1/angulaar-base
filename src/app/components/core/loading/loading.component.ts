import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export class LoadingComponent {
    @Input() loading: boolean = false;

    @Input() width: string | number = '100%';

    @Input() height: string | number = '100%';
}
