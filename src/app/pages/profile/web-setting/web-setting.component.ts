import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_THEME, darkTheme, lightTheme } from 'src/app/constant/theme';
import { ThemeList } from 'src/app/interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MenuService } from 'src/app/layout/sidebar/app.menu.service';

@Component({
    selector: 'app-web-setting',
    templateUrl: './web-setting.component.html',
    styleUrls: ['./web-setting.component.scss'],
})
export class WebSettingComponent implements OnInit {
    scales: number[] = [12, 13, 14, 15, 16];

    themeList: ThemeList[] = [...lightTheme, ...darkTheme];

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService,
        public translate: TranslateService,
    ) {}

    ngOnInit(): void {
        this.getTheme();
    }

    getTheme() {
        this.themeList = this.themeList.map((item: ThemeList) => {
            return {
                ...item,
                active:
                    item.theme ===
                    (localStorage.getItem('theme') || DEFAULT_THEME),
            };
        });
    }

    updateTheme() {
        const oldActiveItemIndex = this.themeList.findIndex(
            (item: ThemeList) => item.active === true,
        );
        this.themeList[oldActiveItemIndex].active = false;
        const newActiveItemIndex = this.themeList.findIndex(
            (item: ThemeList) =>
                item.theme === (localStorage.getItem('theme') || DEFAULT_THEME),
        );
        this.themeList[newActiveItemIndex].active = true;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }

    get language(): string {
        return this.layoutService.config.language;
    }

    set language(_val: string) {
        this.translate.use(_val);
        this.layoutService.config.language = _val;
        this.layoutService.onConfigUpdate();
    }

    get colorScheme(): boolean {
        return this.layoutService.config.colorScheme == 'dark' ? true : false;
    }

    set colorScheme(_val: boolean) {
        this.layoutService.config.colorScheme = _val ? 'dark' : 'light';
        localStorage.setItem(
            'colorScheme',
            this.layoutService.config.colorScheme,
        );
    }

    get menu(): boolean {
        return this.layoutService.config.menu;
    }

    set menu(_val: boolean) {
        this.layoutService.config.menu = _val;
        this.layoutService.onMenuToggle();
    }

    changeTheme(theme: string, colorScheme: string) {
        localStorage.setItem('theme', theme);
        localStorage.setItem('colorScheme', colorScheme);
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink
            .getAttribute('href')!
            .replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme;
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
        this.updateTheme();
    }

    replaceThemeLink(href: string, onComplete: () => void) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling,
        );

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
