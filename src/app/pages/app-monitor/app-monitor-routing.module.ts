import { RouterModule, Routes } from '@angular/router';
import { AppMonitorComponent } from './app-monitor.component';
import { DashboardMonitorComponent } from './dashboard-monitor/dashboard-monitor.component';

const routes: Routes = [
    {
        path: 'server-monitor',
        component: AppMonitorComponent,
        data: {
            breadcrumb: 'Thông tin tài nguyên các phần mềm triển khai',
        },
    },
    {
        path: 'dashboard-monitor',
        component: DashboardMonitorComponent,
        data: {
            breadcrumb: 'Chỉ số chuyển đổi số',
        },
    },
];

export const AppMonitorRoutingModule = RouterModule.forChild(routes);
