import { Location } from '@angular/common';
import {
    Component,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isNullOrUndefined } from 'is-what';
import { MenuItem } from 'primeng/api';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { LayoutService } from './service/app.layout.service';
import { AppSidebarComponent } from './sidebar/app.sidebar.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { TaskFilterService } from '../pages/task/task-filter/task-filter.service';
import '../js/chat/chatapp.umd.js';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html',
    styleUrls: ['./app.layout.component.scss'],
})
export class AppLayoutComponent implements OnDestroy, OnInit {
    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    breadcrumbItems: MenuItem[] = [];

    menuOpen = true;

    useLayout = false;

    isHomePage = false;
    showTaskFilter: boolean = false;

    taskGroupOptions: any[] = [
        { label: 'Cá nhân', value: 0 },
        { label: 'Cơ quan đơn vị', value: 1 },
    ];
    currentTaskGroupFilter: any = {};

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private readonly taskFilterService: TaskFilterService,
    ) {
        this.overlayMenuOpenSubscription =
            this.layoutService.overlayOpen$.subscribe(() => {
                if (!this.menuOutsideClickListener) {
                    this.menuOutsideClickListener = this.renderer.listen(
                        'document',
                        'click',
                        (event) => {
                            const isOutsideClicked = !(
                                this.appSidebar.el.nativeElement.isSameNode(
                                    event.target,
                                ) ||
                                this.appSidebar.el.nativeElement.contains(
                                    event.target,
                                ) ||
                                this.appTopbar.menuButton.nativeElement.isSameNode(
                                    event.target,
                                ) ||
                                this.appTopbar.menuButton.nativeElement.contains(
                                    event.target,
                                )
                            );

                            if (isOutsideClicked) {
                                this.hideMenu();
                            }
                        },
                    );
                }

                if (!this.profileMenuOutsideClickListener) {
                    this.profileMenuOutsideClickListener = this.renderer.listen(
                        'document',
                        'click',
                        (event) => {
                            const isOutsideClicked = !(
                                this.appTopbar.menu.nativeElement.isSameNode(
                                    event.target,
                                ) ||
                                this.appTopbar.menu.nativeElement.contains(
                                    event.target,
                                ) ||
                                this.appTopbar.topbarMenuButton.nativeElement.isSameNode(
                                    event.target,
                                ) ||
                                this.appTopbar.topbarMenuButton.nativeElement.contains(
                                    event.target,
                                )
                            );

                            if (isOutsideClicked) {
                                this.hideProfileMenu();
                            }
                        },
                    );
                }

                if (this.layoutService.state.staticMenuMobileActive) {
                    this.blockBodyScroll();
                }
            });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                distinctUntilChanged(),
            )
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
                const currentUrl = this.location.path();

                this.isHomePage =
                    currentUrl.split('/')[currentUrl.split('/').length - 1] ==
                    'home';
                this.showTaskFilter =
                    this.router.url.includes('task/list-task');
            });
    }

    ngOnInit(): void {
        this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root);
        this.currentTaskGroupFilter =
            this.taskFilterService.currentTaskGroupFilter;
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.breadcrumbItems = this.createBreadcrumbs(
                    this.activatedRoute.root,
                );
                const currentUrl = this.location.path();

                this.isHomePage =
                    currentUrl.split('/')[currentUrl.split('/').length - 1] ==
                    'home';
            });
    }

    ngAfterViewInit() {
        this.appTopbar.releaseFocus();
    }

    private createBreadcrumbs(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: MenuItem[] = [],
    ): MenuItem[] | any {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL: string = child.snapshot.url
                .map((segment) => segment.path)
                .join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const label = child.snapshot.data['breadcrumb'];

            const useLayout = child.snapshot.data['useLayout'];

            if (useLayout !== undefined) {
                this.useLayout = useLayout;
            } else {
                this.useLayout = true;
            }

            if (!isNullOrUndefined(label)) {
                breadcrumbs.push({ label, url, target: '_self' });
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
    }

    hideMenu() {
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    '(^|\\b)' +
                        'blocked-scroll'.split(' ').join('|') +
                        '(\\b|$)',
                    'gi',
                ),
                ' ',
            );
        }
    }

    get containerClass() {
        return {
            'layout-theme-light':
                this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark':
                this.layoutService.config.colorScheme === 'dark',
            'layout-overlay':
                this.layoutService.config.menuMode === 'overlay' &&
                this.layoutService.config.menu,
            'layout-overlay-active': this.layoutService.config.menu,
            'layout-mobile-active':
                this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': false,
            'p-ripple-disabled': true,
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    handleVisibleChange(event: boolean) {
        this.menuOpen = event;
    }

    handleOpenSidebar() {
        this.menuOpen = true;
    }

    handleGroupFilterChange(event) {
        this.taskFilterService.setTaskGroupFilter(event.value);
    }
}
