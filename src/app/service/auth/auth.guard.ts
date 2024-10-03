import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { UserInfoService } from 'src/app/service/app/user-info.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private router: Router,
        private keycloakService: KeycloakService,
        private userInfoService: UserInfoService,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        let permission: string = route.data['permission'] || '';
        const permissionCode: string = route.data['permissionCode'] || '';

        const specialParams = ['serId', 'screenId'];

        for (let i = 0; i < specialParams.length; i++) {
            const p = specialParams[i];
            if (
                permission.includes(':' + p) &&
                Object.keys(route.params).length > 0 &&
                route.params[p]
            ) {
                permission = permission.replace(
                    ':' + p,
                    route.params[p]?.toString(),
                );
            }
        }

        return this.isLoggedIn(permission, permissionCode);
    }

    async isLoggedIn(permission: string, permissionCode: string): Promise<any> {
        const token = await this.keycloakService.getToken();
        localStorage.setItem('accessToken', token);

        try {
            let userInfo = this.userInfoService.getUserInfo();

            if (!userInfo) {
                userInfo = await this.userInfoService.updateLocalUserInfo();
            }

            if (token) {
                const userPermissions: any[] =
                    this.userInfoService.getUserInfo()?.iocPermissions || [];

                const permissions = userPermissions.filter((p) => {
                    return (
                        p.permissionUIPath == permission &&
                        (p.permissionCode == permissionCode ||
                            permissionCode == '')
                    );
                });

                if (permission.length > 0) {
                    if (permissions.length > 0 && permissions[0]?.isActive) {
                        return true;
                    } else {
                        // Navigate to '/notfound' route
                        await this.router.navigate(['/notfound']);
                        // Return false to indicate permission denied
                        return false;
                    }
                } else {
                    return true;
                }
            }

            return false;
        } catch (err: any) {
            return false;
        }
    }
}
