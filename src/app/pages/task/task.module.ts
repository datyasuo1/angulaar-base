import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { TaskTypePipe } from 'src/app/pipes/task-type.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskReportComponent } from './task-report/task-report.component';

@NgModule({
    declarations: [
        TaskComponent,
        TaskFilterComponent,
        CreateTaskComponent,
        TaskReportComponent,
    ],
    imports: [CommonModule, FormsModule, ComponentsModule, SharedModule],
    providers: [TaskTypePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskModule {}
