import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
    MessagePayload,
    deleteToken,
    getMessaging,
    getToken,
    onMessage,
} from 'firebase/messaging';
import { KeycloakService } from 'keycloak-angular';
import _, { debounce } from 'lodash';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { filter, finalize } from 'rxjs';
import { DEFAULT_THEME } from 'src/app/constant/theme';
import { IUser } from 'src/app/interface/userGroup/userGroup.interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FeatureGroupService } from 'src/app/service/api/feature-group.service';
import { UserService } from 'src/app/service/api/user.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { LanguageService } from 'src/app/service/app/language.service';
import { ToastService } from 'src/app/service/app/toast.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import {
    Notification,
    NotificationService,
    NotificationsResponse,
} from 'src/app/service/common/notification.service';
import { environment } from 'src/environments/environment';
declare let $: any;

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @Input() isHomePage!: boolean;

    @Output() onDone = new EventEmitter<boolean>();

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('menubar') menubar!: Menubar;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    navItems: MenuItem[] = [];

    menuItems: MenuItem[] = [];

    notificationItems: MenuItem[] = [];

    searchText: string = '';

    badgeValue: string = '';

    totalUnreadElements: number = 0;

    totalPages: number = 0;

    currentPage: number = 1;

    first: number = 0;

    private debounceNotiAPI: any;

    featureSearch: any;

    message: MessagePayload;

    show: boolean = false;

    dialogLoading: boolean = false;

    dialogTitle: string = 'Góp ý ứng dụng';

    ratingCounts: any;

    descriptionInfo: string = '';

    errorDescriptionInfo: string = '';

    errorRating: string = '';

    loading: boolean = false;

    searchTextFeatureCode: string = '';

    rows: number = 10;

    totalRecords: number = 0;

    data: any;

    parentFeatureGroups: any[] = [];

    userInfo = {} as IUser;

    constructor(
        public layoutService: LayoutService,
        public l: LanguageService,
        private notificationService: NotificationService,
        private toastService: ToastService,
        private keycloakService: KeycloakService,
        private userInfoService: UserInfoService,
        private apiHandlerService: ApiHandlerService,
        private userService: UserService,
        private featureGroupService: FeatureGroupService,
        private router: Router,
        public renderer: Renderer2,
    ) {
        this.layoutService.configUpdate$.subscribe(() => {
            this.setNavItems();
        });

        this.debounceNotiAPI = debounce((callBack: () => void = () => {}) => {
            this.callNotificationsAPI(callBack);
        }, 300);

        this.debounceNotiAPI();

        router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((params) => {
                this.highlightMenu();
            });
    }

    highlightMenu() {
        const url = this.router.url.substring(1);
        this.navItems.forEach((item: MenuItem) => {
            if (item?.items?.length > 0) {
                const routerLinkList = item.items?.map(
                    (item: MenuItem) => item.routerLink,
                );
                if (!routerLinkList.includes(url)) {
                    item['styleClass'] = '';
                } else {
                    item['styleClass'] = 'p-menuitem-link-active';
                }
            }
        });
    }

    ngAfterViewInit() {
        this.renderer?.listen(
            this.menubar?.el.nativeElement,
            'mouseleave',
            (event) => {
                this.menubar?.hide();
            },
        );
    }

    ngOnInit() {
        this.requestPermission();
        this.listen();
        this.setNavItems();

        this.notificationItems = [
            {
                content: `Thông báo`,
                header: true,
            },
            ...new Array(10).fill(null).map((item, index) => {
                if (index % 2 === 0) {
                    return { separator: true };
                } else {
                    return { loading: true };
                }
            }),
        ];

        this.userInfo = this.userInfoService.getUserInfo();
        const { username } = this.userInfo ?? {};
        this.menuItems = [
            {
                label: username,
                icon: 'ti ti-user',
                visible: !!(username && username?.length > 0),
            },
            {
                separator: true,
                visible: !!(username && username?.length > 0),
            },
            {
                label: 'Thông tin tài khoản',
                icon: 'ti ti-settings',
                routerLink: '/profile',
                visible: !!(username && username?.length > 0),
            },
            {
                label: 'Lịch sử đăng nhập',
                icon: 'ti ti-history',
                routerLink: 'login-history',
                visible: !!(username && username?.length > 0),
            },
            {
                label: 'Lịch sử truy cập ứng dụng',
                icon: 'pi pi-fw pi-clock',
                routerLink: 'app-access-history',
                visible: !!(username && username?.length > 0),
            },
            {
                label: 'Góp ý ứng dụng',
                icon: 'pi pi-fw pi-thumbs-up',
                visible: !!(username && username?.length > 0),
                command: async () => {
                    this.show = true;
                },
            },
            {
                separator: true,
                visible: !!(username && username?.length > 0),
            },
            {
                label: 'Đăng xuất',
                icon: 'ti ti-logout',
                command: async () => {
                    await this.keycloakService.logout();
                    this.toastService.showSuccess(
                        'Thành công!',
                        'Đăng xuất thành công',
                        2000,
                    );
                    const messaging = getMessaging();
                    deleteToken(messaging);
                    localStorage.removeItem('user');
                },
            },
        ];
    }

    handleDescriptionInfoChange(value: any) {
        this.descriptionInfo = value;
    }

    onRatingChange() {
        this.errorRating = '';
    }

    handleInputChange(data: string) {
        this.searchText = data;
        this.currentPage = 1;
        this.first = 0;
        this.callGetFeatureGroupsAPI();
    }

    handleSelectFunction(data: any) {
        console.log(data.value);
        const link = '/' + data.value.routerLink;
        this.router.navigateByUrl(link);
    }

    callGetFeatureGroupsAPI() {
        this.loading = true;
        const parentId = '';
        this.featureGroupService
            .getFeatureGroups(
                false,
                false,
                '',
                this.currentPage,
                this.rows,
                this.featureSearch,
                this.searchTextFeatureCode,
                parentId,
            )
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe({
                next: (res: any) => {
                    this.data = res.data;
                    this.parentFeatureGroups = res.data;
                    this.totalRecords = res?.totalElement;
                },
                error: (err: any) => {
                    this.apiHandlerService.handleError(err);
                },
            });
    }
    focusedTarget: HTMLElement;

    releaseFocus() {
        this.focusedTarget?.blur();
    }

    handleFocus(event: FocusEvent) {
        // Add your code here to automatically release the focus
        // For example, you can use the blur() method to release the focus
        this.focusedTarget = event.target as HTMLElement;
    }

    requestPermission() {
        const messaging = getMessaging();

        getToken(messaging, { vapidKey: environment.firebase.vapidKey })
            .then((currentToken) => {
                if (currentToken) {
                    this.notificationService
                        .saveRegistrationTokens(currentToken)
                        .subscribe();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    listen() {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            this.message = payload;
            this.toastService.showInfo(
                this.message.notification.title,
                this.message.notification.body,
                5000,
            );
            this.notificationItems = [
                {
                    content: `Thông báo`,
                    header: true,
                },
                ...new Array(10).fill(null).map((item, index) => {
                    if (index % 2 === 0) {
                        return { separator: true };
                    } else {
                        return { loading: true };
                    }
                }),
            ];
            this.currentPage = 1;
            this.debounceNotiAPI();
        });
    }

    handleReadAll(e: PointerEvent) {
        e.stopPropagation();
        this.notificationService.readAll().subscribe({
            next: () => {
                this.currentPage = 1;
                this.notificationItems = [
                    {
                        content: `Thông báo`,
                        header: true,
                    },
                    ...new Array(10).fill(null).map((item, index) => {
                        if (index % 2 === 0) {
                            return { separator: true };
                        } else {
                            return { loading: true };
                        }
                    }),
                ];
                this.debounceNotiAPI();
            },
        });
    }

    setNavItems(): void {
        this.userInfoService.updateUserMenu$.subscribe({
            next: (res: any) => {
                this.navItems = res;
                this.highlightMenu();
            },
        });
    }

    changeTheme(theme: string, colorScheme: string) {
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
    }

    createFeedback() {
        if (this.validateForm()) {
            this.dialogLoading = true;
            const data = {
                satisfactionLevel: this.ratingCounts,
                description: this.descriptionInfo,
            };
            this.userService
                .createFeedback(data)
                .pipe(
                    finalize(() => {
                        this.dialogLoading = false;
                        this.show = false;
                    }),
                )
                .subscribe({
                    next: (res: any) => {
                        this.apiHandlerService.handleSuccess(
                            res,
                            () => {
                                this.onDone.emit(true);
                            },
                            201,
                        );
                    },
                    error: (err: any) => {
                        this.apiHandlerService.handleError(err);
                    },
                });
        }
    }

    handleSearchParentFeatureGroupChange(data: any) {
        this.featureSearch = data;
        this.currentPage = 1;
        this.first = 0;
        this.callGetFeatureGroupsAPI();
    }

    validateForm() {
        let res = true;

        if (this.ratingCounts == null) {
            res = false;
            this.errorRating = 'Vui lòng nhập mức độ';
        }
        return res;
    }

    resetDialog() {
        this.ratingCounts = null;
        this.descriptionInfo = null;
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
    ngOnChanges(changes: SimpleChanges) {
        if (changes['isHomePage']) {
            if (this.isHomePage) {
                (
                    document.getElementsByClassName('layout-topbar') as any
                )[0].style.opacity = '0.9';
                this.changeTheme(DEFAULT_THEME, 'dark');
            } else {
                (
                    document.getElementsByClassName('layout-topbar') as any
                )[0].style.opacity = '1';
                const theme = localStorage.getItem('theme') || DEFAULT_THEME;
                const colorScheme =
                    localStorage.getItem('colorScheme') || 'dark';
                this.changeTheme(theme, colorScheme);
            }
        }
    }

    handleShowNotifications() {
        const e = document.getElementsByClassName('custom-menu-item')[0];
        e?.addEventListener('scroll', (event: Event) => {
            const myDiv = event.target as HTMLDivElement;
            const x = myDiv.offsetHeight + myDiv.scrollTop;
            const y = myDiv.scrollHeight;
            const z = x - y;
            if (z >= 0) {
                this.currentPage += 1;
                if (this.currentPage <= this.totalPages) {
                    const temp = _.cloneDeep(this.notificationItems);
                    this.notificationItems = [
                        {
                            content: `Thông báo`,
                            header: true,
                        },
                        ...new Array(this.notificationItems.length * 2)
                            .fill(null)
                            .map((item, index) => {
                                if (index % 2 === 0) {
                                    return { separator: true };
                                } else {
                                    return { loading: true };
                                }
                            }),
                    ];
                    this.debounceNotiAPI(() => {
                        this.notificationItems = temp;
                    });
                }
            }
        });
    }

    handleHideNotifications() {
        // this.notificationItems = [
        //     {
        //         content: `Thông báo`,
        //         header: true,
        //     },
        //     ...new Array(10).fill(null).map((item, index) => {
        //         if (index % 2 === 0) {
        //             return { separator: true };
        //         } else {
        //             return { loading: true };
        //         }
        //     }),
        // ];
        // this.currentPage = 1;
    }

    calBadgeValue() {
        if (this.totalUnreadElements == 0) {
            this.badgeValue = '';
        } else if (this.totalUnreadElements >= 100) {
            this.badgeValue = '99+';
        } else {
            this.badgeValue = this.totalUnreadElements.toString();
        }
        return this.badgeValue;
    }

    perPage = 10;

    callNotificationsAPI(callBack: () => void) {
        this.notificationService
            .getNotifications(this.currentPage, this.perPage)
            .subscribe({
                next: (res: NotificationsResponse) => {
                    callBack();
                    this.totalUnreadElements = res.totalUnreadElement;
                    this.calBadgeValue();
                    this.totalPages = res.totalPage;

                    if (
                        this.notificationItems.filter(
                            (item) => 'loading' in item,
                        ).length > 0
                    ) {
                        const filteredItems = this.notificationItems.filter(
                            (item) =>
                                !('separator' in item || 'loading' in item),
                        );
                        this.notificationItems = [...filteredItems];
                    }

                    res.data?.map((item: Notification) => {
                        this.notificationItems = [
                            ...this.notificationItems,
                            { separator: true },
                            {
                                id: item.id.toString(),
                                content: item.content,
                                createdAt: item.createdAt,
                                icon: 'ti ti-bell',
                                body: true,
                                read: item.isRead,
                            },
                        ];
                    });
                },
            });
    }

    enterTime = {};

    endTime = {};

    onMouseEnter(data: MenuItem): void {
        const id = data.id;
        if (id) {
            this.enterTime[id] = new Date().getTime();
        }
    }

    onMouseLeave(data: any): void {
        const id = data.id;

        if (id && !data.read) {
            this.endTime[id] = new Date().getTime();
            if (this.endTime[id] - this.enterTime[id] > 1000) {
                this.notificationService.updateNotification(id).subscribe({
                    next: () => {
                        const temp = _.cloneDeep(this.notificationItems);
                        for (let i = 0; i < temp.length; i++) {
                            if (temp[i].id === id) {
                                (temp[i] as any).read = true;
                            }
                        }
                        delete this.endTime[id];
                        delete this.enterTime[id];
                        this.notificationItems = [...temp];
                    },
                });
            }
        }
    }

    handleNotiItemClick(event: any, data: any) {
        event.stopPropagation();
        const id = data.id;
        if (id && !data.read) {
            this.notificationService.updateNotification(id).subscribe({
                next: () => {
                    const temp = _.cloneDeep(this.notificationItems);
                    for (let i = 0; i < temp.length; i++) {
                        if (temp[i].id === id) {
                            (temp[i] as any).read = true;
                        }
                    }
                    delete this.endTime[id];
                    delete this.enterTime[id];
                    this.notificationItems = [...temp];
                    this.totalUnreadElements -= 1;
                    this.calBadgeValue();
                },
            });
        }
    }
}
