import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table, TableService } from 'primeng/table';

export interface CustomLazyLoadEvent {
    rows: number;
    first: number;
    currentPage: number;
}

export interface HeaderSchema {
    label: string;
    sortableColumn?: string;
    minWidth?: string | number;
    maxWidth?: string | number;
    align?: 'left' | 'center' | 'right';
    show?: boolean;
}

// NEW Factory Function
export function tableFactory(wrapper: LazyTableComponent) {
    return wrapper.table;
}

@Component({
    selector: 'app-lazy-table',
    templateUrl: './lazy-table.component.html',
    styleUrls: ['./lazy-table.component.scss'],
    providers: [
        TableService,
        {
            provide: Table, // providing table class
            useFactory: tableFactory, // using new function
            deps: [LazyTableComponent], // new function depends on your wrapper
        },
    ],
})
export class LazyTableComponent {
    @ContentChild('caption', { static: false }) caption: TemplateRef<any>;

    @ContentChild('header', { static: false }) header: TemplateRef<any>;

    @ContentChild('groupheader', { static: false })
    groupheader: TemplateRef<any>;

    @ContentChild('body', { static: false }) body: TemplateRef<any>;

    @ContentChild('buttons', { static: false }) buttons: TemplateRef<any>;

    @ContentChild('container', { static: false }) container: TemplateRef<any>;

    @ViewChild('table', { static: true }) table: Table;

    @Input() tableTitle: string = '';

    @Input() tableData: any[] = [];

    @Input() lazy: boolean = true;

    @Input() dataKey: string = '';

    @Input() loading: boolean = false;

    @Input() rowGroupMode: 'subheader' | 'rowspan' = null;

    @Input() groupRowsBy: string = '';

    @Input() rows: number = 0;

    @Input() columns: number = 0;

    @Input() first: number = 0;

    @Input() totalRecords: number = 0;

    @Input() currentPage: number = 1;

    @Input() showJumpToPageDropdown: boolean = false;

    @Input() showJumpToPageInput: boolean = true;

    @Input() useTrapFocus: boolean = true;

    @Input() headerSchema: HeaderSchema[] = [];

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    loadTable(event: LazyLoadEvent) {
        if (
            (event.rows !== this.rows || event.first !== this.first) &&
            typeof event.first == 'number' &&
            typeof event.rows == 'number'
        ) {
            this.rows = event.rows;
            this.first = event.first;
            this.currentPage = Math.ceil(event.first / event.rows) + 1;
            this.onLazyLoad.emit({
                rows: this.rows,
                first: this.first,
                currentPage: this.currentPage,
            });
        }
    }

    // if field is clicked three times, reset sort
    fieldCount: { field: string; clickedCount: number } = {
        field: '',
        clickedCount: 0,
    };

    resetSort() {
        this.table.sortOrder = 0;
        this.table.sortField = '';
        this.table.reset();
    }

    handleSort(event: any) {
        const value = {
            orderBy: event.field,
            orderDirection: event.order === 1 ? 'asc' : 'desc',
        };
        if (event.field === this.fieldCount.field) {
            this.fieldCount = {
                ...this.fieldCount,
                clickedCount: this.fieldCount.clickedCount + 1,
            };
            if (this.fieldCount.clickedCount === 3) {
                this.resetSort();
                this.fieldCount.clickedCount = 0;
                this.onSort.emit({ orderBy: '', orderDirection: '' });
            } else {
                this.onSort.emit(value);
            }
        } else {
            this.fieldCount = {
                field: event.field,
                clickedCount: 1,
            };
            this.onSort.emit(value);
        }
    }
}
