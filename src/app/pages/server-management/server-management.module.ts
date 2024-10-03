import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerManagementComponent } from './server-management.component';
import { ServerManagementRoutingModule } from './server-management-routing.module';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListServerComponent } from './list-server/list-server.component';
import { CreateEditServerComponent } from './create-edit-server/create-edit-server.component';
import { AddVirtualMachineComponent } from './create-edit-server/add-virtual-machine/add-virtual-machine.component';

@NgModule({
    declarations: [
        ServerManagementComponent,
        ListServerComponent,
        CreateEditServerComponent,
        AddVirtualMachineComponent,
    ],
    imports: [
        CommonModule,
        ServerManagementRoutingModule,
        SharedModule,
        FormsModule,
        ComponentsModule,
        ReactiveFormsModule,
    ],
})
export class ServerManagementModule {}
