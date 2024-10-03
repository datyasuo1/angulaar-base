import { RouterModule, Routes } from '@angular/router';
import { ListServerComponent } from './list-server/list-server.component';
import { CreateEditServerComponent } from './create-edit-server/create-edit-server.component';

const routes: Routes = [
    {
        path: '',
        component: ListServerComponent,
        data: {
            breadcrumb: 'Danh sách',
        },
    },
    {
        path: 'create',
        component: CreateEditServerComponent,
        data: {
            breadcrumb: 'Thêm mới',
        },
    },
    {
        path: 'update',
        component: CreateEditServerComponent,
        data: {
            breadcrumb: 'Cập nhật',
        },
    },
];

export const ServerManagementRoutingModule = RouterModule.forChild(routes);
