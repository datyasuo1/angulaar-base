import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() cardImage: string = '';

    @Input() cardTitle: string = '';

    @Input() imageHeight: string = '100px';

    @Input() imageWidth: string = 'auto';
}
