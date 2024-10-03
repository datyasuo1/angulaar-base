import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceManagementRoutingModule } from './resource-management-routing.module';
import { ListAppResourceComponent } from './list-app-resource/list-app-resource.component';
import { SharedModule } from 'primeng/api';
import { ComponentsModule } from 'src/app/components/components.module';
import { UpdateAppResourceComponent } from './update-app-resource/update-app-resource.component';
import { ResourceManagementComponent } from './resource-management.component';
import { CreateAppResourceComponent } from './create-app-resource/create-app-resource.component';
import { CreateResourceVersionComponent } from './create-app-resource/create-resource-version/create-resource-version.component';
import { CreateUserGroupComponent } from './create-app-resource/create-user-group/create-user-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [
        ListAppResourceComponent,
        CreateAppResourceComponent,
        UpdateAppResourceComponent,
        ResourceManagementComponent,
        CreateResourceVersionComponent,
        CreateUserGroupComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ResourceManagementRoutingModule,
        SharedModule,
        ComponentsModule,
        ReactiveFormsModule,
        InputTextModule,
    ],
})
export class ResourceManagementModule {}
