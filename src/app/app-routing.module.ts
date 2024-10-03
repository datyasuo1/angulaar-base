import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './service/auth/auth.guard';
import { PolicyComponent } from './pages/policy/policy.component';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./pages/auth/auth.module').then(
                            (m) => m.AuthModule,
                        ),
                },
                {
                    path: 'privacy',
                    component: PolicyComponent,
                    loadChildren: () =>
                        import('./pages/policy/policy.module').then(
                            (m) => m.PolicyModule,
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import('./pages/pages.module').then(
                                    (m) => m.PagesModule,
                                ),
                            data: {
                                breadcrumb: null,
                            },
                        },
                    ],
                    canActivate: [AuthGuard],
                },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            },
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
