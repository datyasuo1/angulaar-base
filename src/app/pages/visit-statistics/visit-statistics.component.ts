import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { VisitStatisticsService } from 'src/app/service/api/visit-statistics.service';
import { convertToDateFormat } from 'src/app/utils/datetime';
import { TableBaseComponent } from 'src/app/base/table-base/table-base.component';

@Component({
    selector: 'app-visit-statistics',
    templateUrl: './visit-statistics.component.html',
    styleUrls: ['./visit-statistics.component.scss'],
})
export class VisitStatisticsComponent
    extends TableBaseComponent
    implements OnInit
{
    constructor(private visitStatisticsService: VisitStatisticsService) {
        super();
    }

    rangeDates: Date[] | undefined = [
        new Date(Date.now() - 30 * 86400 * 1000),
        new Date(Date.now()),
    ];

    override ngOnInit() {
        super.ngOnInit();
    }

    handleCalendarChange() {
        this.currentPage = 1;
        this.first = 0;
        this.getTableData();
    }

    override getTableData() {
        const s = (this.rangeDates as any)[0];
        const e = (this.rangeDates as any)[1];
        if (s && e) {
            this.loading = true;
            const startTime = convertToDateFormat(s, '-', true);
            const endTime = convertToDateFormat(e, '-', true);
            this.visitStatisticsService
                .getVisitStatistics(
                    startTime,
                    endTime,
                    this.currentPage,
                    this.rows,
                )
                .pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        this.data = res.data;
                        this.totalRecords = res?.meta?.total;
                    },
                });
        }
    }
}
