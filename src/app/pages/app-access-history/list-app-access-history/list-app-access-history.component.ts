import { Component, Injector } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    IAppAccessHistory,
    IGetAppAccessHistoryPayload,
} from 'src/app/interface/account/app-access-history';
import { AppAccessHistoryService } from '../../../service/api/app-access-history.service';
import { finalize, takeUntil } from 'rxjs';
import { convertToDateFormat } from 'src/app/utils/datetime';

@Component({
    selector: 'app-list-app-access-history',
    templateUrl: './list-app-access-history.component.html',
    styleUrl: './list-app-access-history.component.scss',
})
export class ListAppAccessHistoryComponent extends AppComponentBase {
    listWebAppAccessLog: IAppAccessHistory[] = [];
    listMobileAppAccessLog: IAppAccessHistory[] = [];
    totalWebRecord: number = 0;
    totalMobileRecord: number = 0;
    filterWebDateRange: Date[] = [];
    filterMobileDateRange: Date[] = [];
    webTableRows: number = 10;
    webCurrentPage: number = 1;
    webFirst: number = 0;
    mobileTableRows: number = 10;
    mobileCurrentPage: number = 1;
    mobileFirst: number = 0;

    constructor(
        injector: Injector,
        private appAccessHistoryService: AppAccessHistoryService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.filterWebDateRange = this.getDateRange3Month();
        this.filterMobileDateRange = this.getDateRange3Month();
        this.callListWebAppAccessLog();
        this.callListMobileAppAccessLog();
    }

    getDateRange3Month() {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        return [threeMonthsAgo, tomorrow];
    }

    callListWebAppAccessLog() {
        const payload = {
            page: this.webCurrentPage,
            size: this.webTableRows,
            systemCode: 'WEB',
            startTime: this.getValidDate(this.filterWebDateRange[0]),
            endTime: this.getValidDate(this.filterWebDateRange[1]),
        } as IGetAppAccessHistoryPayload;
        this.isLoading = true;
        this.appAccessHistoryService
            .getListAppAccessLogWeb(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listWebAppAccessLog = rs.data;
                this.totalWebRecord = rs.totalElement;
            });
    }
    callListMobileAppAccessLog() {
        const payload = {
            page: this.mobileCurrentPage,
            size: this.mobileTableRows,
            systemCode: 'MOBILE',
            startTime: this.getValidDate(this.filterMobileDateRange[0]),
            endTime: this.getValidDate(this.filterMobileDateRange[1]),
        } as IGetAppAccessHistoryPayload;
        this.isLoading = true;
        this.appAccessHistoryService
            .getListAppAccessLogWeb(payload)
            .pipe(
                takeUntil(this.destroy$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe((rs) => {
                this.listMobileAppAccessLog = rs.data;
                this.totalMobileRecord = rs.totalElement;
            });
    }

    handleSelectWebDate(data: any) {
        this.filterWebDateRange = data;
        this.callListWebAppAccessLog();
    }

    handleSelectMobileDate(data: any) {
        this.filterMobileDateRange = data;
        this.callListMobileAppAccessLog();
    }
    getValidDate(date) {
        if (date instanceof Date) {
            return convertToDateFormat(date, '-', true);
        }
        return null;
    }

    loadTableWeb(event: any) {
        this.webTableRows = event.rows;
        this.webCurrentPage = event.currentPage;
        this.webFirst = event.first;
        this.callListWebAppAccessLog();
    }

    loadTableMobile(event: any) {
        this.mobileTableRows = event.rows;
        this.first = event.first;
        this.mobileCurrentPage = event.currentPage;
        this.callListMobileAppAccessLog();
    }
}
