import { Component, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
@Component({
    selector: 'app-contact-popup',
    templateUrl: './contact-popup.component.html',
    styleUrl: './contact-popup.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ContactPopupComponent {
    close: boolean = false;

    clickContact() {
        console.log(this.close);
    }
}
