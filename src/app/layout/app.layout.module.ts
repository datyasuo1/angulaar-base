import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RatingModule } from 'primeng/rating';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { AppLayoutComponent } from './app.layout.component';
import { AppConfigModule } from './config/config.module';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuitemComponent } from './sidebar/app.menuitem.component';
import { AppSidebarComponent } from './sidebar/app.sidebar.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RouterModule,
        AppConfigModule,
        MenubarModule,
        MenuModule,
        TooltipModule,
        BreadcrumbModule,
        CardModule,
        ButtonModule,
        SkeletonModule,
        ComponentsModule,
        SharedModule,
        DialogModule,
        RatingModule,
        AutoCompleteModule,
    ],
    exports: [AppLayoutComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppLayoutModule {}
