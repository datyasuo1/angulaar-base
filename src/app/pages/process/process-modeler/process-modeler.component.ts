import { decryptLong } from 'src/app/utils/encrypt';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastService } from 'src/app/service/app/toast.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-process-modeler',
    templateUrl: './process-modeler.component.html',
    styleUrls: ['./process-modeler.component.scss'],
})
export class ProcessModelerComponent {
    constructor(
        private route: ActivatedRoute,
        private keycloakService: KeycloakService,
        private router: Router,
        private toastService: ToastService,
    ) {}

    url = environment.modelerURL || '';

    tenant = environment.tenant;

    eventHandler: any;

    ngOnInit(): void {
        this.ih = window.innerHeight - 74;

        this.keycloakService.getToken().then((token: string) => {
            this.route.params.subscribe((params: Params) => {
                this.eventHandler = (event: any) => {
                    if (event.origin !== this.url) return;
                    const { code, response } = JSON.parse(event.data) ?? {};
                    switch (code) {
                        case 'ACCESS_TOKEN_REQUIRED':
                            document
                                .querySelector('iframe')
                                ?.contentWindow?.postMessage(
                                    JSON.stringify({
                                        code: 'APP_INIT',
                                        accessToken: token,
                                        tenant: this.tenant,
                                        processId: parseInt(
                                            decryptLong(params['id']),
                                        ),
                                        screenEditorLink:
                                            location.protocol +
                                            '//' +
                                            location.host +
                                            '/process-management/screen/screen-builder/',
                                    }),
                                    this.url,
                                );
                            break;
                        case 'NO_PROCESS_ID':
                            this.router.navigate([
                                '/process-management/process',
                            ]);
                            break;
                        case 'SAVE_BPMN_SUCCESSFULLY':
                            this.toastService.showSuccess(
                                'Thành công!',
                                'Lưu dữ liệu BPMN thành công.',
                                2000,
                            );
                            break;
                        case 'SAVE_BPMN_UNSUCCESSFULLY':
                            this.toastService.showSuccess(
                                'Thành công!',
                                'Lưu dữ liệu BPMN không thành công.',
                                2000,
                            );
                            break;
                    }
                };
                window.addEventListener('message', this.eventHandler);
            });
        });
    }

    ngOnDestroy(): void {
        window.removeEventListener('message', this.eventHandler);
    }

    ih: number = 0;
}
