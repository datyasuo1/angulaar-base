import { RouterModule, Routes } from '@angular/router';
import { ListAppAccessHistoryComponent } from './list-app-access-history/list-app-access-history.component';

const routes: Routes = [
    {
        path: '',
        component: ListAppAccessHistoryComponent,
        data: {
            breadcrumb: 'Lịch sử truy cập ứng dụng',
        },
    },
];

export const AppAccessRoutingModule = RouterModule.forChild(routes);
