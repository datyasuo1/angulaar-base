import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditorTextChangeEvent } from 'primeng/editor';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
    @Input() label: string = '';

    @Input() required: boolean = false;

    @Input() text: string = '';

    @Input() error: string = '';

    @Input() caption: string = '';

    @Input() showCaption: boolean = false;

    @Output() onTextChange = new EventEmitter<string>();

    handleTextChange(data: EditorTextChangeEvent) {
        this.onTextChange.emit(data.htmlValue);
    }
}
