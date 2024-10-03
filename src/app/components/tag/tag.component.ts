import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
    @Input() label: string = '';

    @Input() severity: string = '';

    @Input() value: string = '';

    @Input() number: number = 0;

    @Input() rounded: boolean = false;
}
