import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DEFAULT_THEME } from 'src/app/constant/theme';

export interface AppConfig {
    colorScheme: string;
    theme: string;
    menu: boolean;
    menuMode: string;
    language: string;
    scale: number;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    config: AppConfig = {
        menu: false,
        menuMode: 'overlay',
        language: 'vi',
        colorScheme: localStorage.getItem('colorScheme') || 'dark',
        theme: localStorage.getItem('theme') || DEFAULT_THEME,
        scale: 14,
    };

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    onMenuToggle() {
        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this.configUpdate.next(this.config);
    }
}
