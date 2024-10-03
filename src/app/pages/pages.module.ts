import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrativeUnitComponent } from './administrative-unit/administrative-unit.component';
import { AffiliatedServiceListComponent } from './affiliated-service-list/affiliated-service-list.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AutoConfigurationComponent } from './auto-configuration/auto-configuration.component';
import { DashboardConfigComponent } from './dashboard-config/dashboard-config.component';
import { NewDashboardConfigComponent } from './dashboard-config/new-dashboard-config/new-dashboard-config.component';

import { WatchDashboardConfigComponent } from './dashboard-config/watch-dashboard-config/watch-dashboard-config.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { DepartmentComponent } from './department/department.component';
import { FeatureGroupComponent } from './feature-group/feature-group.component';
import { FeatureComponent } from './feature/feature.component';
import { CreateFieldComponent } from './field/create-field/create-field.component';
import { FieldComponent } from './field/field.component';
import { UpdateFieldComponent } from './field/update-field/update-field.component';
import { HomeConfigComponent } from './home-config/home-config.component';
import { HomeComponent } from './home/home.component';
import { ListAppComponent } from './home/list-app/list-app.component';
import { AlertComponent } from './kpi-configuration/alert/alert.component';
import { CreateKpiConfigurationComponent } from './kpi-configuration/create-kpi-configuration/create-kpi-configuration.component';
import { KpiConfigurationComponent } from './kpi-configuration/kpi-configuration.component';
import { ThresholdComponent } from './kpi-configuration/threshold/threshold.component';
import { DeviceActivityComponent } from './login-history/device-activity/device-activity.component';
import { LogComponent } from './login-history/log/log.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AddPriorityComponent } from './priority/add-priority/add-priority.component';
import { PriorityComponent } from './priority/priority.component';
import { ProcessGroupComponent } from './process-group/process-group.component';
import { ModelerComponent } from './process/modeler/modeler.component';
import { ProcessModelerComponent } from './process/process-modeler/process-modeler.component';
import { ProcessUploaderComponent } from './process/process-uploader/process-uploader.component';
import { ProcessComponent } from './process/process.component';
import { ProfileModule } from './profile/profile.module';
import { CreatePublicInfoComponent } from './public-info/create-public-info/create-public-info.component';
import { PublicInfoComponent } from './public-info/public-info.component';
import { WatchPublicInfoComponent } from './public-info/watch-public-info/watch-public-info.component';
import { CreateResourceTypeComponent } from './resources-type/create-resource-type/create-resource-type.component';
import { ResourcesTypeComponent } from './resources-type/resources-type.component';
import { WatchResourceTypeComponent } from './resources-type/watch-resource-type/watch-resource-type.component';
import { CreateResourceComponent } from './resources/create-resource/create-resource.component';
import { ResourcesComponent } from './resources/resources.component';
import { WatchResourceComponent } from './resources/watch-resource/watch-resource.component';
import { RoleComponent } from './role/role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { ScreenViewerComponent } from './screen-viewer/screen-viewer.component';
import { ScreenBuilderComponent } from './screen/screen-builder/screen-builder.component';
import { ScreenComponent } from './screen/screen.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { DashboardLowcoderComponent } from './service/dashboard-lowcoder/dashboard-lowcoder.component';
import { DashboardSupersetComponent } from './service/dashboard-superset/dashboard-superset.component';
import { DashboardTableauComponent } from './service/dashboard-tableau/dashboard-tableau.component';
import { ServiceComponent } from './service/service.component';
import { AddUserGroupComponent } from './user-group/add-user-group/add-user-group.component';

import { A11yModule } from '@angular/cdk/a11y';
import { CarouselModule } from 'primeng/carousel';
import { AppAccessHistoryModule } from './app-access-history/app-access-history.module';
import { AppMonitorModule } from './app-monitor/app-monitor.module';
import { DeployedSystemModule } from './deployed-system-management/deployed-system.module';
import { DigitalSignatureModule } from './digital-signature/digital-signature.module';
import { AddAppVersionComponent } from './home-config/add-app-version/add-app-version.component';
import { NoteControllerComponent } from './note-controller/note-controller.component';
import { ResourceManagementModule } from './resource-management/resource-management.module';
import { ServerManagementModule } from './server-management/server-management.module';
import { AddTaskClassificationComponent } from './task-classification/add-task-classification/add-task-classification.component';
import { TaskClassificationComponent } from './task-classification/task-classification.component';
import { TaskGroupModule } from './task-group/task-group.module';
import { AddTaskStatusComponent } from './task-status/add-task-status/add-task-status.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TaskModule } from './task/task.module';
import { DetailUserGroupComponent } from './user-group/detail-user-group/detail-user-group.component';
import { GroupGroupComponent } from './user-group/group-group/group-group.component';
import { UpdateUserGroupComponent } from './user-group/update-user-group/update-user-group.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DecentralizationComponent } from './user/decentralization/decentralization.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import { GroupComponent } from './user/group/group.component';
import { HistoryComponent } from './user/history/history.component';
import { InformationComponent } from './user/information/information.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user.component';
import { VideoWallComponent } from './video-wall/video-wall.component';
import { VisitStatisticsComponent } from './visit-statistics/visit-statistics.component';
import { VmsManagementComponent } from './vms-management/vms-management.component';
import { WatchVmsManagementComponent } from './vms-management/watch-vms-management/watch-vms-management.component';
import { WarningMapComponent } from './warning-map/warning-map.component';
@NgModule({
    declarations: [
        HomeComponent,
        NotfoundComponent,
        WarningMapComponent,
        ScreenViewerComponent,
        VideoWallComponent,
        ScreenComponent,
        ProcessComponent,
        ProcessGroupComponent,
        AutoConfigurationComponent,
        AuthLayoutComponent,
        AffiliatedServiceListComponent,
        VisitStatisticsComponent,
        UserComponent,
        UserGroupComponent,
        AddUserGroupComponent,
        FieldComponent,
        PriorityComponent,
        AddPriorityComponent,
        ListAppComponent,
        KpiConfigurationComponent,
        ResourcesComponent,
        ResourcesTypeComponent,
        AdministrativeUnitComponent,
        HomeConfigComponent,
        DashboardConfigComponent,
        DepartmentComponent,
        VmsManagementComponent,
        PublicInfoComponent,
        FeatureComponent,
        FeatureGroupComponent,
        RoleComponent,
        CreateResourceComponent,
        WatchResourceComponent,
        CreateKpiConfigurationComponent,
        ThresholdComponent,
        AlertComponent,
        TaskClassificationComponent,
        NoteControllerComponent,
        AddTaskClassificationComponent,
        AddTaskStatusComponent,
        TaskStatusComponent,
        CreatePublicInfoComponent,
        WatchPublicInfoComponent,
        NewDashboardConfigComponent,
        WatchDashboardConfigComponent,
        WatchVmsManagementComponent,
        ScreenBuilderComponent,
        ProcessModelerComponent,
        ProcessUploaderComponent,
        CreateFieldComponent,
        UpdateFieldComponent,
        WatchResourceTypeComponent,
        CreateResourceTypeComponent,
        CreateDepartmentComponent,
        UpdateRoleComponent,
        UpdateUserComponent,
        ServiceComponent,
        AddServiceComponent,
        ModelerComponent,
        LoginHistoryComponent,
        LogComponent,
        DeviceActivityComponent,
        InformationComponent,
        GroupComponent,
        DecentralizationComponent,
        DashboardLowcoderComponent,
        DashboardSupersetComponent,
        DashboardTableauComponent,
        AddUserComponent,
        DetailUserComponent,
        HistoryComponent,
        AddAppVersionComponent,
        DetailUserGroupComponent,
        GroupGroupComponent,
        UpdateUserGroupComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ComponentsModule,
        DataViewModule,
        DropdownModule,
        ButtonModule,
        PickListModule,
        OrderListModule,
        RatingModule,
        FormsModule,
        InputTextModule,
        ProfileModule,
        SkeletonModule,
        CheckboxModule,
        ScrollPanelModule,
        PanelModule,
        SidebarModule,
        ReactiveFormsModule,
        InputSwitchModule,
        TabMenuModule,
        TableModule,
        MultiSelectModule,
        DialogModule,
        ImageModule,
        ChartModule,
        CalendarModule,
        ProgressBarModule,
        SliderModule,
        InputTextareaModule,
        ConfirmDialogModule,
        AutoCompleteModule,
        PasswordModule,
        ListboxModule,
        ProgressSpinnerModule,
        StepsModule,
        MenuModule,
        TabViewModule,
        EditorModule,
        RadioButtonModule,
        DividerModule,
        SharedModule,
        TagModule,
        AccordionModule,
        TaskModule,
        ResourceManagementModule,
        GalleriaModule,
        ServerManagementModule,
        DeployedSystemModule,
        CarouselModule,
        A11yModule,
        DigitalSignatureModule,
        TaskGroupModule,
        AppAccessHistoryModule,
        AppMonitorModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
