import { Component } from '@angular/core';
import { IScreenBuilderInput } from 'src/app/interface/common.interface';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dashboard-monitor',
    templateUrl: './dashboard-monitor.component.html',
    styleUrl: './dashboard-monitor.component.scss',
})
export class DashboardMonitorComponent {
    screenRendererInput = {
        accessToken: localStorage.getItem('accessToken'),
    } as IScreenBuilderInput;

    screenBuilderURL: string = environment.screenBuilderURL || '';
}
