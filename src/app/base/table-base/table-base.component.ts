import { Component, OnInit } from '@angular/core';
import { CustomLazyLoadEvent } from 'src/app/components/core/lazy-table/lazy-table.component';
import { SortObject } from 'src/app/interface';

@Component({
    selector: 'app-table-base',
    standalone: true,
    imports: [],
    templateUrl: './table-base.component.html',
    styleUrl: './table-base.component.scss',
})
export class TableBaseComponent implements OnInit {
    data: unknown[] = [];

    loading: boolean = false;

    rows: number = 10;

    first: number = 0;

    currentPage: number = 1;

    totalRecords: number = 0;

    sortObject: SortObject;

    constructor() {}

    ngOnInit(): void {
        this.getTableData();
    }

    loadTable(event: CustomLazyLoadEvent) {
        this.rows = event.rows;
        this.first = event.first;
        this.currentPage = event.currentPage;
        this.getTableData();
    }

    handleSortTable(data: SortObject) {
        this.sortObject = data;
        this.getTableData();
    }

    protected getTableData() {
        // To be implemented by child classes
    }
}
