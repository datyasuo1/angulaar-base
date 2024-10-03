import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { decryptLong } from 'src/app/utils/encrypt';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-screen-builder',
    templateUrl: './screen-builder.component.html',
    styleUrls: ['./screen-builder.component.scss'],
})
export class ScreenBuilderComponent implements AfterViewInit, OnInit {
    constructor(
        private route: ActivatedRoute,
        private keycloakService: KeycloakService,
    ) {}

    url = environment.screenBuilderURL || '';

    ih: number = 0;

    ngOnInit(): void {
        this.ih = window.innerHeight - 74;
    }

    ngAfterViewInit(): void {
        this.keycloakService.getToken().then((token: string) => {
            this.route.params.subscribe((params: Params) => {
                this.url =
                    this.url + '/apps/' + decryptLong(params['id']) + '/edit';
            });
        });
    }
}
