import { Component, OnInit } from '@angular/core';
import './js/chat/chatapp.umd.js';
import { ScreenService } from './service/api/screen.service';
import { from } from 'rxjs';
import { DEFAULT_THEME } from './constant/theme';
import { AuthService } from './service/auth/auth.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private screenService: ScreenService,
        private authService: AuthService,
        private keycloakService: KeycloakService,
    ) {}

    isPublicPage: boolean = false;

    ngOnInit(): void {
        const publicRoutes = ['/privacy', '/notfound'];
        if (publicRoutes.includes(window.location.pathname)) {
            this.isPublicPage = true;
        }
        this.getCSSTheme();

        if (!this.isPublicPage) {
            this.loginScreenBuilder();
            this.loginAppChat();
        }
    }

    loginScreenBuilder() {
        from(this.screenService.loginScreenBuilder()).subscribe();
    }

    loginAppChat() {
        this.keycloakService.getToken().then((token) => {
            this.authService.loginAppChat(token).subscribe((rs) => {
                localStorage.setItem('resumeToken', rs.data.authToken);
            });
        });
    }

    getCSSTheme() {
        const el = document.createElement('link');
        let theme = localStorage.getItem('theme');
        const colorScheme = localStorage.getItem('colorScheme');
        if (!theme) {
            theme = DEFAULT_THEME;
            localStorage.setItem('theme', theme);
        }
        if (!colorScheme) {
            localStorage.setItem('colorScheme', 'dark');
        }
        const href = `assets/layout/styles/theme/${theme}/theme.css`;
        el.setAttribute('href', href);
        el.setAttribute('id', 'theme-css');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('type', 'text/css');
        document.head.appendChild(el);
    }
}
