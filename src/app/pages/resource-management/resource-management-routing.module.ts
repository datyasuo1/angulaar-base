import { RouterModule, Routes } from '@angular/router';
import { ListAppResourceComponent } from './list-app-resource/list-app-resource.component';
import { UpdateAppResourceComponent } from './update-app-resource/update-app-resource.component';
import { CreateAppResourceComponent } from './create-app-resource/create-app-resource.component';

const routes: Routes = [
    {
        path: '',
        component: ListAppResourceComponent,
        data: {
            breadcrumb: 'Danh sách',
        },
    },
    {
        path: 'create',
        component: CreateAppResourceComponent,
        data: {
            breadcrumb: 'Thêm mới',
        },
    },
    {
        path: 'update',
        component: CreateAppResourceComponent,
        data: {
            breadcrumb: 'Cập nhật',
        },
    },
];

export const ResourceManagementRoutingModule = RouterModule.forChild(routes);
