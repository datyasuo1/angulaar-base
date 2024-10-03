import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { TableauService } from 'src/app/service/common/tableau.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dashboard-tableau',
    templateUrl: './dashboard-tableau.component.html',
    styleUrl: './dashboard-tableau.component.scss',
})
export class DashboardTableauComponent {
    constructor(
        private tableauService: TableauService,
        private route: ActivatedRoute,
        private apiHandlerService: ApiHandlerService,
    ) {}
    url: string = '';

    tableauUrl: string = environment.tableauURL;

    ngAfterViewInit() {
        this.tableauService.getTickets().subscribe({
            next: (response: any) => {
                this.tableauService
                    .getServiceById(this.route.snapshot.params['id'])
                    .subscribe((res: any) => {
                        const link = res[0]?.link;
                        this.url =
                            `${this.tableauUrl}/trusted/` +
                            response?.data +
                            link.split(this.tableauUrl)[1];
                    });
            },
        });
    }
}
