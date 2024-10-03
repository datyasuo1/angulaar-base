import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeployedSystemRoutingModule } from './deployed-system-routing.module';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDeployedSystemComponent } from './list-deployed-system/list-deployed-system.component';
import { CreateEditDeployedSystemComponent } from './create-edit-deployed-system/create-edit-deployed-system.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [
        ListDeployedSystemComponent,
        CreateEditDeployedSystemComponent,
    ],
    imports: [CommonModule, DeployedSystemRoutingModule, ComponentsModule],
})
export class DeployedSystemModule {}
