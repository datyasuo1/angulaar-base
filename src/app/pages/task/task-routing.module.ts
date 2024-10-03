import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';

const routes: Routes = [
    {
        path: '',
        component: TaskComponent,
        data: {
            breadcrumb: 'Công việc, nhiệm vụ',
        },
    },
];

export const TaskRoutingModule = RouterModule.forChild(routes);
