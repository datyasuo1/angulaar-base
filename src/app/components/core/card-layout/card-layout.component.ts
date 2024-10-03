import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-card-layout',
    templateUrl: './card-layout.component.html',
    styleUrls: ['./card-layout.component.scss'],
})
export class CardLayoutComponent {
    @ContentChild('body', { static: false }) body: TemplateRef<any>;

    @ContentChild('footer', { static: false }) footer: TemplateRef<any>;

    @Input() cardTitle: string = '';
    @Input() styleClass: string = '';
}
