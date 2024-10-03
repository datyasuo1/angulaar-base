import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { AppConfigComponent } from './app.config.component';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SidebarModule,
        RadioButtonModule,
        ComponentsModule,
        InputSwitchModule,
        TooltipModule,
    ],
    declarations: [AppConfigComponent],
    exports: [AppConfigComponent],
})
export class AppConfigModule {}
