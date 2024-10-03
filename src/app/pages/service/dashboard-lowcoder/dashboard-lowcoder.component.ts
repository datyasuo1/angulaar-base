import { Component, Input } from '@angular/core';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { environment } from 'src/environments/environment';
interface ScreenRendererInput {
    agencyId: number;
    accessToken: string;
    userId: number;
}
@Component({
    selector: 'app-dashboard-lowcoder',
    templateUrl: './dashboard-lowcoder.component.html',
    styleUrl: './dashboard-lowcoder.component.scss',
})
export class DashboardLowcoderComponent {
    @Input() appId: string = '';

    constructor(private userInfoService: UserInfoService) {}
    screenBuilderURL: string = environment.screenBuilderURL || '';

    screenRendererInput: ScreenRendererInput;

    accessToken: string = localStorage.getItem('accessToken') || '';

    ngOnInit() {
        const { id, agencyId } = this.userInfoService.getUserInfo();
        this.screenRendererInput = {
            agencyId,
            accessToken: this.accessToken,
            userId: id,
        };
    }

    public onScreenRendererEvent(event: CustomEvent) {}
}
