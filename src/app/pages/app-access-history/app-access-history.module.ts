import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAccessRoutingModule } from './app-acccess-history-routing.module';
import { ListAppAccessHistoryComponent } from './list-app-access-history/list-app-access-history.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ListAppAccessHistoryComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        AppAccessRoutingModule,
    ],
})
export class AppAccessHistoryModule {}
