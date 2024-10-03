import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    DashboardConfig,
    DashboardConfigResponse,
    DashboardConfigService,
} from 'src/app/service/api/dashboard-config.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-watch-dashboard-config',
    templateUrl: './watch-dashboard-config.component.html',
    styleUrls: ['./watch-dashboard-config.component.scss'],
})
export class WatchDashboardConfigComponent {
    data: DashboardConfig;

    constructor(
        private dashboardConfigService: DashboardConfigService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        const id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
        this.dashboardConfigService.getDashboardConfigById(id).subscribe({
            next: (res: DashboardConfigResponse) => {
                this.data = res.data;
            },
        });
    }

    handleCloseOnePublicInfo() {
        this.router.navigate(['system-management', 'service-config']);
    }
}
