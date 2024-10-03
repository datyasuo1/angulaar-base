import { Component } from '@angular/core';
import { IScreenBuilderInput } from 'src/app/interface/common.interface';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-task-report',
    templateUrl: './task-report.component.html',
    styleUrl: './task-report.component.scss',
})
export class TaskReportComponent {
    screenRendererInput = {
        accessToken: localStorage.getItem('accessToken'),
    } as IScreenBuilderInput;

    screenBuilderURL: string = environment.screenBuilderURL || '';
}
