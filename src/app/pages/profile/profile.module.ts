import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileLayoutComponent } from './profile-layout/profile.layout.component';
import { WebSettingComponent } from './web-setting/web-setting.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
    declarations: [
        ProfileLayoutComponent,
        ProfileUpdateComponent,
        PasswordUpdateComponent,
        WebSettingComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MenuModule,
        RouterModule,
        FormsModule,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        ButtonModule,
        PasswordModule,
        RadioButtonModule,
        InputSwitchModule,
        ComponentsModule,
        SharedModule,
    ],
    exports: [ProfileLayoutComponent],
})
export class ProfileModule {}
