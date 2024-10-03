import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
    ReplaySubject,
    catchError,
    forkJoin,
    lastValueFrom,
    of,
    switchMap,
} from 'rxjs';
import { UserService } from 'src/app/service/api/user.service';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    private userInfo: any;

    private userMenu: MenuItem[];

    private userMenuTemp: MenuItem[];

    private updateUserMenu = new ReplaySubject<any>();

    updateUserMenu$ = this.updateUserMenu.asObservable();

    constructor(
        public l: LanguageService,
        private userService: UserService,
    ) {
        // Backup menu
        this.userMenuTemp = [
            {
                label: this.l.t('Home'),
                icon: 'ti ti-home',
                routerLink: '/home',
            },
        ];
    }

    async updateLocalUserInfo() {
        const finalResponse = await lastValueFrom(
            forkJoin({
                userInfo: this.userService.getUserInfo(),
                permissions: this.userService.getUserPermissions(),
                menus: this.userService.getUserMenus(),
            }).pipe(
                switchMap(({ userInfo, permissions, menus }) => {
                    const updatedUserInfo = {
                        ...userInfo?.data,
                        iocPermissions: permissions?.data,
                        iocMenus: menus?.data,
                    };

                    this.setUserInfo(updatedUserInfo);
                    return of(updatedUserInfo);
                }),
                catchError((err) => {
                    if (err && err.error && err.error.status == 1) {
                        return this.userService.getSSOUserInfo().pipe(
                            switchMap((ssoRes: any) => {
                                const {
                                    userId,
                                    firstName,
                                    lastName,
                                    email,
                                    agencyId,
                                    username,
                                    realmRoles,
                                    additionalProperties,
                                } = ssoRes.data ?? {};

                                const {
                                    address,
                                    birthday,
                                    districtId,
                                    districtName,
                                    phoneNumber,
                                    provinceId,
                                    provinceName,
                                    sex,
                                    wardId,
                                    wardName,
                                } = additionalProperties;

                                const data = {
                                    ssoId: userId,
                                    firstName,
                                    lastName,
                                    email,
                                    agencyId,
                                    username,
                                    address,
                                    birthday,
                                    districtId,
                                    districtName,
                                    provinceId,
                                    provinceName,
                                    sex,
                                    wardId,
                                    wardName,
                                    mainPhone: phoneNumber,
                                    subPhone: phoneNumber,
                                    cityosRoles: realmRoles?.map(
                                        (item: any) => item?.name,
                                    ),
                                };

                                return this.userService.createIOCUser(data);
                            }),
                            switchMap((userCreateRes: any) => {
                                if (
                                    userCreateRes?.code === 200 &&
                                    userCreateRes?.data?.id
                                ) {
                                    return this.updateLocalUserInfo();
                                }
                                return of(null);
                            }),
                        );
                    }
                    return of(null);
                }),
            ),
        );
        return finalResponse;
    }

    setUserInfo(userInfo: any): void {
        this.userInfo = userInfo;
        this.setUserMenu(this.userInfo.iocMenus);
    }

    getUserInfo(): any | null {
        return this.userInfo;
    }

    setUserMenu(userMenu: any[]): void {
        this.userMenu = [...this.userMenuTemp, ...userMenu];
        // const permissionTabs = {
        //     label: 'Phân quyền',
        //     icon: 'ti ti-key',
        //     items: [
        //         {
        //             label: this.l.t('User'),
        //             routerLink: '/user-permission/user',
        //         },
        //         {
        //             label: this.l.t('User group'),
        //             routerLink: '/user-permission/user-group',
        //         },
        //         {
        //             label: 'Chức năng',
        //             routerLink: '/user-permission/feature',
        //         },
        //         {
        //             label: 'Nhóm chức năng',
        //             routerLink: '/user-permission/feature-group',
        //         },
        //         {
        //             label: 'Vai trò',
        //             routerLink: '/user-permission/role',
        //         },
        //     ],
        // };
        const separator = { separator: true };
        // this.userMenu.push(permissionTabs);
        this.userMenu.push(separator);
        this.removeRouterLink(this.userMenu);
        this.updateUserMenu.next(this.userMenu);
    }
    getUserMenu(): any[] {
        return this.userMenu;
    }

    removeRouterLink(userMenu: any[]) {
        userMenu.forEach((item) => {
            if (!item.routerLink || item.routerLink?.length == 0) {
                delete item.routerLink;
            }
            if (item.items && item.items.length == 0) {
                delete item.items;
            }
            if (item.items && item.items.length > 0) {
                this.removeRouterLink(item.items);
            }
        });
    }
}

// Backup menu
// {
//     label: this.l.t('Service'),
//     icon: 'ti ti-chart-pie',
//     items: [
//         {
//             label: this.l.t('Video wall'),
//             routerLink: '/monitor/video-wall',
//         },
//         {
//             label: this.l.t('Scene reflection'),
//             routerLink: '/monitor/scene-reflection',
//         },
//         {
//             label: this.l.t('Medical'),
//             routerLink: '/monitor/medical',
//         },
//         {
//             label: this.l.t('Public service'),
//             routerLink: '/monitor/public-service',
//         },
//         {
//             label: this.l.t('Socio economic'),
//             routerLink: '/monitor/socio-economic',
//         },
//         {
//             label: this.l.t('Info communication'),
//             routerLink: '/monitor/info-communication',
//         },
//         {
//             label: this.l.t('Info business'),
//             routerLink: '/monitor/info-business',
//         },
//         {
//             label: this.l.t('Education training'),
//             routerLink: '/monitor/education-training',
//         },
//         {
//             label: this.l.t('Env monitoring'),
//             routerLink: '/monitor/env-monitoring',
//         },
//         {
//             label: this.l.t('Flooding rain'),
//             routerLink: '/monitor/flooding-rain',
//         },
//         {
//             label: this.l.t('Letters citizen'),
//             routerLink: '/monitor/letters-citizen',
//         },
//         {
//             label: this.l.t('KTXH Superset'),
//             routerLink: '/monitor/ktxh-superset',
//         },
//     ],
// },
// {
//     label: this.l.t('Quản trị hệ thống'),
//     icon: 'ti ti-users',
//     items: [
//         {
//             label: this.l.t('Resources'),
//             routerLink: '/system-management/resources',
//         },
//         {
//             label: this.l.t('Public info'),
//             routerLink: '/system-management/public-info',
//         },
//         {
//             label: this.l.t('VMS management'),
//             routerLink: '/system-management/vms-management',
//         },
//         {
//             label: this.l.t('KPI configuration'),
//             routerLink: '/system-management/kpi-configuration',
//         },
//         {
//             label: this.l.t('Home configuration'),
//             routerLink: '/system-management/home-config',
//         },
//         {
//             label: this.l.t('Service configuration'),
//             routerLink: '/system-management/service-config',
//         },
//         {
//             label: this.l.t('Affiliated service list'),
//             routerLink:
//                 '/system-management/affiliated-service-list',
//         },
//         {
//             label: this.l.t('Web traffic statistics'),
//             routerLink: '/system-management/visit-statistics',
//         },
//     ],
// },
// {
//     label: this.l.t('Process management'),
//     icon: 'ti ti-settings',
//     items: [
//         {
//             label: this.l.t('Process'),
//             routerLink: '/process-management/process',
//         },
//         {
//             label: this.l.t('Process group'),
//             routerLink: '/process-management/process-group',
//         },
//         {
//             label: this.l.t('Screen'),
//             routerLink: '/process-management/screen',
//         },
//         {
//             label: this.l.t('Auto configuration'),
//             routerLink: '/process-management/auto-configuration',
//         },
//     ],
// },
// {
//     label: this.l.t('Category'),
//     icon: 'ti ti-list',
//     items: [
//         {
//             label: this.l.t('Service Type'),
//             routerLink: '/category/service-type',
//         },
//         {
//             label: this.l.t('Resources type'),
//             routerLink: '/category/resources-type',
//         },
//         {
//             label: this.l.t('Administrative unit'),
//             routerLink: '/category/administrative-unit',
//         },
//         {
//             label: this.l.t('Priority'),
//             routerLink: '/category/priority',
//         },
//         {
//             label: this.l.t('Department'),
//             routerLink: '/category/department',
//         },
//         {
//             label: this.l.t('Category configuration'),
//             routerLink: '/category/category-config',
//         },
//         // ...this.dynamicMenuItems,
//     ],
// },
// {
//     label: 'Phân quyền',
//     icon: 'ti ti-key',
//     items: [
//         {
//             label: this.l.t('User'),
//             routerLink: '/user-permission/user',
//         },
//         {
//             label: this.l.t('User group'),
//             routerLink: '/user-permission/user-group',
//         },
//         {
//             label: 'Chức năng',
//             routerLink: '/user-permission/feature',
//         },
//         {
//             label: 'Nhóm chức năng',
//             routerLink: '/user-permission/feature-group',
//         },
//         {
//             label: 'Vai trò',
//             routerLink: '/user-permission/role',
//         },
//     ],
// },
// { separator: true },
