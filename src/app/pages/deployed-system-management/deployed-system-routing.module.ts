import { RouterModule, Routes } from '@angular/router';
import { ListDeployedSystemComponent } from './list-deployed-system/list-deployed-system.component';
import { CreateEditDeployedSystemComponent } from './create-edit-deployed-system/create-edit-deployed-system.component';

const routes: Routes = [
    {
        path: '',
        component: ListDeployedSystemComponent,
        data: {
            breadcrumb: 'Danh sách',
        },
    },
    {
        path: 'create',
        component: CreateEditDeployedSystemComponent,
        data: {
            breadcrumb: 'Thêm mới',
        },
    },
    {
        path: 'update',
        component: CreateEditDeployedSystemComponent,
        data: {
            breadcrumb: 'Cập nhật',
        },
    },
];

export const DeployedSystemRoutingModule = RouterModule.forChild(routes);
