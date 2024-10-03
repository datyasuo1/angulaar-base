import {
    LoginHistoryResponse,
    LoginHistoryService,
} from 'src/app/service/api/login-history.service';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrl: './log.component.scss',
})
export class LogComponent extends TableBaseComponent {
    constructor(private loginHistoryService: LoginHistoryService) {
        super();
    }

    override ngOnInit() {
        super.ngOnInit();
    }

    override getTableData() {
        this.loading = true;
        this.loginHistoryService
            .getLogRequests(this.currentPage, this.rows)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: LoginHistoryResponse) => {
                    this.data = res.data;
                    this.totalRecords = res.totalElement;
                },
            });
    }
}
