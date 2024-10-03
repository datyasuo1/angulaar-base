import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTaskGroupComponent } from './list-task-group/list-task-group.component';
import { CreateEditTaskGroupComponent } from './create-edit-task-group/create-edit-task-group.component';
import { SharedModule } from 'primeng/api';
import { TaskGroupRoutingModule } from './task-group-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [ListTaskGroupComponent, CreateEditTaskGroupComponent],
    imports: [CommonModule, ComponentsModule, TaskGroupRoutingModule],
})
export class TaskGroupModule {}
