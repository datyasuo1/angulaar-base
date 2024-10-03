import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
    @Input() first = 0;

    @Input() rows = 10;

    @Input() totalRecords = 0;

    @Input() pageLinkSize = 5;

    @Input() rowsPerPageOptions = [5, 10, 15];

    @Output() onPageChange = new EventEmitter();

    handlePageChange(event: PaginatorState) {
        this.onPageChange.emit(event);
    }
}
