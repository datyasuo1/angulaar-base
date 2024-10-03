import { Component } from '@angular/core';
import { KtxhSupersetService } from 'src/app/service/api/ktxh-superset.service';

@Component({
    selector: 'app-dashboard-superset',
    templateUrl: './dashboard-superset.component.html',
    styleUrl: './dashboard-superset.component.scss',
})
export class DashboardSupersetComponent {
    constructor(private ktxhSupersetService: KtxhSupersetService) {}

    // supersetUrl: string = environment.supersetURL;
    ngOnInit() {
        // superset;
        // this.getFinalToken().then(() => {
        //     const mountPoint = document.getElementById('superset-container');
        //     if (mountPoint) {
        //         embedDashboard({
        //             id: '954d6e0e-6262-439b-9f59-9066310c5b6f',
        //             supersetDomain: this.supersetUrl,
        //             mountPoint: mountPoint,
        //             fetchGuestToken: () => this.fetchGuestTokenFromBackend(),
        //             dashboardUiConfig: {
        //                 hideTitle: true,
        //                 filters: {
        //                     expanded: true,
        //                 },
        //             },
        //         });
        //     }
        //     const container = document.getElementById('superset-container');
        //     if (container?.children[0]) {
        //         (container.children[0] as any).width = '100%';
        //         (container.children[0] as any).height = '100%';
        //     }
        // });
    }

    // superset
    // token: string;

    // getFinalToken() {
    //     return new Promise((resolve, reject) => {
    //         this.ktxhSupersetService
    //             .createSecurityLogin('admin', 'admin', 'db', true)
    //             .subscribe({
    //                 next: (result1: any) => {
    //                     this.ktxhSupersetService
    //                         .getSecurityCSRF(result1?.access_token)
    //                         .subscribe({
    //                             next: (result2: any) => {
    //                                 this.ktxhSupersetService
    //                                     .createGuestToken(
    //                                         result1?.access_token,
    //                                         result2?.result,
    //                                     )
    //                                     .subscribe({
    //                                         next: (result3: any) => {
    //                                             this.token = result3?.token;
    //                                             resolve(null);
    //                                         },
    //                                         error: (error: any) => {
    //                                             reject(error);
    //                                         },
    //                                     });
    //                             },
    //                             error: (error: any) => {
    //                                 reject(error);
    //                             },
    //                         });
    //                 },
    //                 error: (error: any) => {
    //                     reject(error);
    //                 },
    //             });
    //     });
    // }

    // fetchGuestTokenFromBackend(): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve(this.token);
    //         }, 2000);
    //     });
    // }
}
