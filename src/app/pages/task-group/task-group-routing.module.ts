import { RouterModule, Routes } from '@angular/router';
import { ListTaskGroupComponent } from './list-task-group/list-task-group.component';

const routes: Routes = [
    {
        path: '',
        component: ListTaskGroupComponent,
        data: {
            breadcrumb: 'Danh sách',
        },
    },
];

export const TaskGroupRoutingModule = RouterModule.forChild(routes);
