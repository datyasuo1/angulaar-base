import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { registerMicroApps, runAfterFirstMounted, start } from 'qiankun';
import { decryptLong } from 'src/app/utils/encrypt';
import { environment } from 'src/environments/environment';
declare global {
    interface Window {
        qiankunStarted: boolean;
    }
}
declare let window: Window;
@Component({
    selector: 'app-modeler',
    templateUrl: './modeler.component.html',
    styleUrls: ['./modeler.component.scss'],
})
export class ModelerComponent {
    constructor(
        private route: ActivatedRoute,
        private keycloakService: KeycloakService,
    ) {}
    tenant = environment.tenant;

    ngOnInit() {
        this.keycloakService.getToken().then((token: string) => {
            this.route.params.subscribe((params: Params) => {
                registerMicroApps([
                    {
                        name: '@processmaker/modeler',
                        entry: 'http://localhost:8081',
                        container: '#root',
                        activeRule:
                            'process-management/process/process-modeler/:id',
                        props: {
                            accessToken: token,
                            tenant: this.tenant,
                            processId: decryptLong(params['id']),
                            screenEditorLink:
                                location.protocol +
                                '//' +
                                location.host +
                                '/process-management/screen/screen-builder/',
                        },
                    },
                ]);
            });
        });
    }
    ngAfterViewInit(): void {
        if (!window.qiankunStarted) {
            window.qiankunStarted = true;
            start({
                sandbox: {
                    experimentalStyleIsolation: true,
                },
                singular: true,
            });
            runAfterFirstMounted(() => {
                const element = document.getElementById(
                    '__qiankun_microapp_wrapper_for_processmaker_modeler__',
                );

                if (element) {
                    element.style.position = 'relative';
                    element.style.top = '70px';
                    element.style.height = window.innerHeight - 74 + 'px';
                }
            });
        }
    }
}
