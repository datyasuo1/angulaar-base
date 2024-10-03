import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMonitorComponent } from './app-monitor.component';
import { AppMonitorRoutingModule } from './app-monitor-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DashboardMonitorComponent } from './dashboard-monitor/dashboard-monitor.component';

@NgModule({
    declarations: [AppMonitorComponent, DashboardMonitorComponent],
    imports: [CommonModule, AppMonitorRoutingModule, ComponentsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppMonitorModule {}
