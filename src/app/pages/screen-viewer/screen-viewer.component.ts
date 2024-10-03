import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-screen-viewer',
    templateUrl: './screen-viewer.component.html',
    styleUrls: ['./screen-viewer.component.scss'],
})
export class ScreenViewerComponent {
    constructor(private route: ActivatedRoute) {}

    screenBuilderURL = environment.screenBuilderURL;

    accessToken = localStorage.getItem('accessToken') || '';

    screenRendererInput: any = {};

    appId = '';

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.appId = params['screenId'];
            this.screenRendererInput = {
                accessToken: this.accessToken,
            };
        });
    }
}
