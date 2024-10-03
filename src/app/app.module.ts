import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
} from '@angular/common/http';
import {
    APP_INITIALIZER,
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
} from '@angular/core';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { initializeApp } from 'firebase/app';
import {
    KeycloakAngularModule,
    KeycloakEventType,
    KeycloakService,
} from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppLayoutModule } from './layout/app.layout.module';
import { UserInfoService } from './service/app/user-info.service';
import { CommonModule } from '@angular/common';

initializeApp(environment.firebase);

function initializeKeycloak(keycloak: KeycloakService) {
    keycloak.keycloakEvents$.subscribe({
        next(event) {
            if (event.type == KeycloakEventType.OnTokenExpired) {
                keycloak.updateToken(20);
            }
        },
    });
    return () =>
        keycloak
            .init({
                config: {
                    url: environment.ssoURL,
                    realm: environment.ssoRealm,
                    clientId: environment.ssoClientId,
                },
                initOptions: {
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri:
                        window.location.origin +
                        '/assets/silent-check-sso.html',
                },
                shouldAddToken(request) {
                    const { url } = request;
                    return true;
                },
            })
            .then((statusKeycloak) => {
                const publicRoutes = ['/privacy', '/notfound'];
                if (publicRoutes.includes(window.location.pathname)) {
                    return null;
                }
                if (!statusKeycloak) return keycloak.login();
                return null;
            });
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        ToastModule,
        ConfirmDialogModule,
        KeycloakAngularModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
        CommonModule,
        ComponentsModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            deps: [KeycloakService],
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        UserInfoService,
        MessageService,
        ConfirmationService,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService) {
    return () => {
        translate.setDefaultLang('vi');
        translate.setDefaultLang('en');
        return translate.use('vi');
    };
}
