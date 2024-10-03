import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth/auth.guard';
import { AdministrativeUnitComponent } from './administrative-unit/administrative-unit.component';
import { AffiliatedServiceListComponent } from './affiliated-service-list/affiliated-service-list.component';
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
import { AlertComponent } from './kpi-configuration/alert/alert.component';
import { CreateKpiConfigurationComponent } from './kpi-configuration/create-kpi-configuration/create-kpi-configuration.component';
import { KpiConfigurationComponent } from './kpi-configuration/kpi-configuration.component';
import { ThresholdComponent } from './kpi-configuration/threshold/threshold.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { PriorityComponent } from './priority/priority.component';
import { ProcessGroupComponent } from './process-group/process-group.component';
import { ProcessModelerComponent } from './process/process-modeler/process-modeler.component';
import { ProcessUploaderComponent } from './process/process-uploader/process-uploader.component';
import { ProcessComponent } from './process/process.component';
import { ProfileLayoutComponent } from './profile/profile-layout/profile.layout.component';
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
import { ServiceComponent } from './service/service.component';
import { DetailUserGroupComponent } from './user-group/detail-user-group/detail-user-group.component';
import { UpdateUserGroupComponent } from './user-group/update-user-group/update-user-group.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { TaskClassificationComponent } from './task-classification/task-classification.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { NoteControllerComponent } from './note-controller/note-controller.component';
import { AddTaskClassificationComponent } from './task-classification/add-task-classification/add-task-classification.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import { HistoryComponent } from './user/history/history.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user.component';
import { VideoWallComponent } from './video-wall/video-wall.component';
import { VisitStatisticsComponent } from './visit-statistics/visit-statistics.component';
import { VmsManagementComponent } from './vms-management/vms-management.component';
import { WatchVmsManagementComponent } from './vms-management/watch-vms-management/watch-vms-management.component';
import { WarningMapComponent } from './warning-map/warning-map.component';
import { TaskComponent } from './task/task.component';
import { TaskReportComponent } from './task/task-report/task-report.component';

// ----------Trong code:
// Có component có canActivate
// Có canActivate nhưng trong breadcrumb không có attribute permission thì bất kì user nào cũng có quyền vào
// ----------Trong UI:
// Các mục ngoài cùng không có cha, thì đường dẫn UI là '' để tránh click vào thì bị nhảy tới trang không mong muốn.
const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            breadcrumb: 'Trang chủ',
            useLayout: false,
        },
    },
    {
        path: 'task',
        component: TaskComponent,

        loadChildren: () =>
            import('./task/task.module').then((m) => m.TaskModule),
    },
    {
        path: 'warning-map',
        component: WarningMapComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Bản đồ cảnh báo',
            permission: 'warning-map',
            useLayout: false,
        },
    },
    // {
    //     path: 'warning-map',
    //     component: WarningMapComponent,
    //     canActivate: [AuthGuard],
    //     data: {
    //         breadcrumb: 'Bản đồ cảnh báo',
    //         permission: 'warning-map',
    //         useLayout: false,
    //     },
    // },
    {
        path: 'screen',
        data: {
            breadcrumb: 'Màn hình',
        },
        children: [
            {
                path: 'screen-viewer/:id',
                component: ScreenViewerComponent,
                data: {
                    breadcrumb: 'Xem màn hình',
                },
            },
        ],
    },
    {
        path: 'monitor',
        data: {
            breadcrumb: 'Giám sát',
        },
        children: [
            {
                path: 'video-wall',
                data: {
                    breadcrumb: 'Điều hành camera',
                    permission: 'monitor/video-wall',
                    useLayout: false,
                },
                component: VideoWallComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'service',
                data: {
                    breadcrumb: 'Dịch vụ',
                },
                children: [
                    {
                        path: ':serId',
                        component: ServiceComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'monitor/service/:serId',
                            useLayout: false,
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: ':serId/create',
                        component: AddServiceComponent,
                        data: {
                            breadcrumb: 'Thêm mới dịch vụ',
                            permission: 'monitor/service/:serId/create',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: '',
                redirectTo: 'video-wall',
                pathMatch: 'full',
            },
        ],
    },
    // only system admin have this permission
    {
        path: 'user-permission',
        data: {
            breadcrumb: 'Phân quyền',
        },
        children: [
            {
                path: 'user',
                data: {
                    breadcrumb: 'Người dùng',
                },
                children: [
                    {
                        path: '',
                        component: UserComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'user-permission/user',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'detail/:id',
                        component: DetailUserComponent,
                        data: {
                            breadcrumb: 'Chi tiết người dùng',
                            permission: 'user-permission/user/detail/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'history/:id',
                        component: HistoryComponent,
                        data: {
                            breadcrumb: 'Lịch sử đăng nhập',
                            permission: 'user-permission/user/history/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: AddUserComponent,
                        data: {
                            breadcrumb: 'Thêm mới người dùng',
                            permission: 'user-permission/user/create',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: UpdateUserComponent,
                        data: {
                            breadcrumb: 'Cập nhật người dùng',
                            permission: 'user-permission/user/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'user-group',
                data: {
                    breadcrumb: 'Nhóm người dùng',
                },
                children: [
                    {
                        path: '',
                        component: UserGroupComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'user-permission/user-group',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: UpdateUserGroupComponent,
                        data: {
                            breadcrumb: 'Cập nhật nhóm người dùng',
                            permission: 'user-permission/user-group/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'detail/:id',
                        component: DetailUserGroupComponent,
                        data: {
                            breadcrumb: 'Chi tiết nhóm người dùng',
                            permission: 'user-permission/user-group/detail/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'feature',
                component: FeatureComponent,
                data: {
                    breadcrumb: 'Chức năng',
                    permission: 'user-permission/feature',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'feature-group',
                component: FeatureGroupComponent,
                data: {
                    breadcrumb: 'Nhóm chức năng',
                    permission: 'user-permission/feature-group',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'role',
                data: {
                    breadcrumb: 'Vai trò',
                },
                children: [
                    {
                        path: '',
                        component: RoleComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'user-permission/role',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: UpdateRoleComponent,
                        data: {
                            breadcrumb: 'Cập nhật vai trò',
                            permission: 'user-permission/role/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
        ],
    },
    {
        path: 'task',
        data: {
            breadcrumb: 'Công việc, nhiệm vụ',
        },
        children: [
            {
                path: 'list-task',
                data: {
                    breadcrumb: 'Danh sách',
                },
                component: TaskComponent,
                loadChildren: () =>
                    import('./task/task.module').then((m) => m.TaskModule),
            },
            {
                path: 'task-report',
                component: TaskReportComponent,
                data: {
                    breadcrumb: 'Báo cáo thống kê',
                },
                loadChildren: () =>
                    import('./task/task.module').then((m) => m.TaskModule),
            },
        ],
    },
    {
        path: 'app-monitor',
        data: {
            breadcrumb: 'Giám sát',
        },
        loadChildren: () =>
            import('./app-monitor/app-monitor.module').then(
                (m) => m.AppMonitorModule,
            ),
    },
    {
        path: 'system-management',
        data: {
            breadcrumb: 'Quản trị hệ thống',
        },
        children: [
            {
                path: 'resources',
                data: {
                    breadcrumb: 'Tài nguyên',
                },
                children: [
                    {
                        path: '',
                        component: ResourcesComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'system-management/resources',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: CreateResourceComponent,
                        data: {
                            breadcrumb: 'Thêm mới tài nguyên',
                            permission: 'system-management/resources/create',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: CreateResourceComponent,
                        data: {
                            breadcrumb: 'Cập nhật tài nguyên',
                            permission:
                                'system-management/resources/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'watch/:id',
                        component: WatchResourceComponent,
                        data: {
                            breadcrumb: 'Xem chi tiết tài nguyên',
                            permission: 'system-management/resources/watch/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'kpi-configuration',
                data: {
                    breadcrumb: 'Cấu hình KPI',
                },

                children: [
                    {
                        path: '',
                        component: KpiConfigurationComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'system-management/kpi-configuration',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        data: {
                            breadcrumb: 'Thêm mới cấu hình Kpi',
                            permission:
                                'system-management/kpi-configuration/create',
                        },
                        component: CreateKpiConfigurationComponent,
                        canActivate: [AuthGuard],
                        children: [
                            {
                                path: 'alert',
                                component: AlertComponent,
                                data: {
                                    breadcrumb: 'Cấu hình cảnh báo',
                                },
                            },
                            {
                                path: 'threshold',
                                component: ThresholdComponent,
                                data: {
                                    breadcrumb: 'Cấu hình ngưỡng',
                                },
                            },
                        ],
                    },
                    {
                        path: 'update/:id',
                        data: {
                            breadcrumb: 'Cập nhật cấu hình Kpi',
                            permission:
                                'system-management/kpi-configuration/update/:id',
                        },
                        component: CreateKpiConfigurationComponent,
                        canActivate: [AuthGuard],
                        children: [
                            {
                                path: 'alert',
                                component: AlertComponent,
                                data: {
                                    breadcrumb: 'Cấu hình cảnh báo',
                                },
                            },
                            {
                                path: 'threshold',
                                component: ThresholdComponent,
                                data: {
                                    breadcrumb: 'Cấu hình ngưỡng',
                                },
                            },
                        ],
                    },
                    {
                        path: 'watch/:id',
                        component: CreateKpiConfigurationComponent,
                        data: {
                            breadcrumb: 'Xem chi tiết cấu hình kpi',
                            permission:
                                'system-management/kpi-configuration/watch/:id',
                        },
                        canActivate: [AuthGuard],
                        children: [
                            {
                                path: 'alert',
                                component: AlertComponent,
                                data: {
                                    breadcrumb: 'Cấu hình cảnh báo',
                                },
                            },
                            {
                                path: 'threshold',
                                component: ThresholdComponent,
                                data: {
                                    breadcrumb: 'Cấu hình ngưỡng',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: 'public-info',
                data: {
                    breadcrumb: 'Thông tin công cộng',
                },
                children: [
                    {
                        path: '',
                        component: PublicInfoComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'system-management/public-info',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: CreatePublicInfoComponent,
                        canActivate: [AuthGuard],
                        data: {
                            breadcrumb: 'Thêm mới thông tin công cộng',
                            permission: 'system-management/public-info/create',
                            permissionCode: 'create-public-info',
                        },
                    },
                    {
                        path: 'update/:id',
                        component: CreatePublicInfoComponent,
                        canActivate: [AuthGuard],
                        data: {
                            breadcrumb: 'Cập nhật thông tin công cộng',
                            permission:
                                'system-management/public-info/update/:id',
                            permissionCode: 'update-public-info',
                        },
                    },
                    {
                        path: 'watch/:id',
                        component: WatchPublicInfoComponent,
                        canActivate: [AuthGuard],
                        data: {
                            breadcrumb: 'Xem chi tiết thông tin công cộng',
                            permission:
                                'system-management/public-info/watch/:id',
                            permissionCode: 'detail-public-info',
                        },
                    },
                ],
            },
            {
                path: 'affiliated-service-list',
                component: AffiliatedServiceListComponent,
                data: {
                    breadcrumb: 'Danh sách các dịch vụ liên kết',
                    permission: 'system-management/affiliated-service-list',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'visit-statistics',
                component: VisitStatisticsComponent,
                data: {
                    breadcrumb: 'Thống kê số lượng truy cập',
                    permission: 'system-management/visit-statistics',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'home-config',
                component: HomeConfigComponent,
                data: {
                    breadcrumb: 'Cấu hình trang chủ',
                    permission: 'system-management/home-config',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'service-config',
                data: {
                    breadcrumb: 'Cấu hình hiển thị dịch vụ',
                },

                children: [
                    {
                        path: '',
                        component: DashboardConfigComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'system-management/service-config',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'watch/:id',
                        component: WatchDashboardConfigComponent,
                        data: {
                            breadcrumb:
                                'Xem chi tiết cấu hình hiển thị dịch vụ',
                            permission:
                                'system-management/service-config/watch/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: NewDashboardConfigComponent,
                        data: {
                            breadcrumb: 'Thêm mới cấu hình hiển thị dịch vụ',
                            permission:
                                'system-management/service-config/create',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: NewDashboardConfigComponent,
                        data: {
                            breadcrumb: 'Cập nhật cấu hình hiển thị dịch vụ',
                            permission:
                                'system-management/service-config/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'vms-management',
                data: {
                    breadcrumb: 'Quản lý VMS',
                },
                children: [
                    {
                        path: '',
                        component: VmsManagementComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'system-management/vms-management',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'watch/:id',
                        component: WatchVmsManagementComponent,
                        data: {
                            breadcrumb: 'Xem chi tiết VMS',
                            permission:
                                'system-management/vms-management/watch/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'resource-application-management',
                data: {
                    breadcrumb: 'Quản lí tài nguyên ứng dụng',
                },
                loadChildren: () =>
                    import(
                        './resource-management/resource-management.module'
                    ).then((m) => m.ResourceManagementModule),
            },
            {
                path: 'server-management',
                data: {
                    breadcrumb: 'Thông tin máy chủ',
                },
                loadChildren: () =>
                    import('./server-management/server-management.module').then(
                        (m) => m.ServerManagementModule,
                    ),
            },
            {
                path: 'deployed-system-management',
                data: {
                    breadcrumb: 'Quản lý phần mềm triển khai',
                },
                loadChildren: () =>
                    import(
                        './deployed-system-management/deployed-system.module'
                    ).then((m) => m.DeployedSystemModule),
            },
        ],
    },
    {
        path: 'process-management',
        data: {
            breadcrumb: 'Quản lý quy trình',
        },
        children: [
            {
                path: 'screen',
                data: {
                    breadcrumb: 'Màn hình',
                },
                children: [
                    {
                        path: 'update/:id',
                        component: ScreenBuilderComponent,
                        data: {
                            breadcrumb: 'Cập nhật màn hình',
                            permission: 'process-management/screen/update/:id',
                            useLayout: false,
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: '',
                        component: ScreenComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'process-management/screen',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'process',
                data: {
                    breadcrumb: 'Quy trình',
                },

                children: [
                    {
                        path: '',
                        component: ProcessComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'process-management/process',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'process-modeler/:id',
                        component: ProcessModelerComponent,
                        data: {
                            breadcrumb: 'Xây dựng quy trình',
                            permission:
                                'process-management/process/process-modeler/:id',
                            useLayout: false,
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'process-upload',
                        component: ProcessUploaderComponent,
                        data: {
                            breadcrumb: 'Tải lên quy trình',
                            permission:
                                'process-management/process/process-upload',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'process-group',
                component: ProcessGroupComponent,
                data: {
                    breadcrumb: 'Nhóm quy trình',
                    permission: 'process-management/process-group',
                },
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'screen',
                pathMatch: 'full',
            },

            {
                path: 'auto-configuration',
                component: AutoConfigurationComponent,
                data: {
                    breadcrumb: 'Cấu hình tự động',
                    permission: 'process-management/auto-configuration',
                },
                canActivate: [AuthGuard],
            },
        ],
    },
    {
        path: 'screen-viewer/:screenId',
        component: ScreenViewerComponent,
        data: {
            breadcrumb: 'Màn hình lowcoder',
            permission: 'screen-viewer/:screenId',
        },
        canActivate: [AuthGuard],
    },
    {
        path: 'category',
        data: {
            breadcrumb: 'Danh mục',
        },
        children: [
            {
                path: 'service-type',
                data: {
                    breadcrumb: 'Loại dịch vụ',
                },
                children: [
                    {
                        path: '',
                        component: FieldComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'category/service-type',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: CreateFieldComponent,
                        data: {
                            breadcrumb: 'Thêm mới loại dịch vụ',
                            permission: 'category/service-type/create',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: UpdateFieldComponent,
                        data: {
                            breadcrumb: 'Cập nhật loại dịch vụ',
                            permission: 'category/service-type/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'resources-type',
                data: {
                    breadcrumb: 'Loại tài nguyên',
                },
                children: [
                    {
                        path: '',
                        component: ResourcesTypeComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'category/resources-type',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: CreateResourceTypeComponent,
                        data: {
                            breadcrumb: 'Thêm mới loại tài nguyên',
                            permission: 'category/resources-type/create',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: CreateResourceTypeComponent,
                        data: {
                            breadcrumb: 'Cập nhật loại tài nguyên',
                            permission: 'category/resources-type/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'watch/:id',
                        component: WatchResourceTypeComponent,
                        data: {
                            breadcrumb: 'Xem chi tiết loại tài nguyên',
                            permission: 'category/resources-type/watch/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'priority',
                component: PriorityComponent,
                data: {
                    breadcrumb: 'Độ ưu tiên',
                    permission: 'category/priority',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'department',
                data: {
                    breadcrumb: 'Phòng ban',
                },
                children: [
                    {
                        path: '',
                        component: DepartmentComponent,
                        data: {
                            breadcrumb: null,
                            permission: 'category/department',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: CreateDepartmentComponent,
                        data: {
                            breadcrumb: 'Thêm mới phòng ban',
                            permission: 'category/department/create',
                        },
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'update/:id',
                        component: CreateDepartmentComponent,
                        data: {
                            breadcrumb: 'Cập nhật phòng ban',
                            permission: 'category/department/update/:id',
                        },
                        canActivate: [AuthGuard],
                    },
                ],
            },
            {
                path: 'administrative-unit',
                component: AdministrativeUnitComponent,
                data: {
                    breadcrumb: 'Đơn vị hành chính',
                    permission: 'category/administrative-unit',
                },
                canActivate: [AuthGuard],
            },
            {
                path: '',
                redirectTo: 'affiliated-service-list',
                pathMatch: 'full',
            },
            {
                path: 'task-classification',
                component: TaskClassificationComponent,
                data: {
                    breadcrumb: 'Phân loại công việc',
                    permission: 'category/task-classification',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'task-status',
                component: TaskStatusComponent,
                data: {
                    breadcrumb: 'Trạng thái công việc',
                    permission: 'category/task-status',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'task-group',
                data: {
                    breadcrumb: 'Quản lý nhóm công việc',
                },
                loadChildren: () =>
                    import('./task-group/task-group.module').then(
                        (m) => m.TaskGroupModule,
                    ),
            },
        ],
    },
    {
        path: 'utility',
        data: {
            breadcrumb: 'Tiện ích',
        },
        children: [
            {
                path: 'note-controller',
                component: NoteControllerComponent,
                data: {
                    breadcrumb: 'Ghi chú cá nhân',
                    permission: 'utility/note-controller',
                },
                canActivate: [AuthGuard],
            },
            {
                path: 'digital-signature',
                data: {
                    breadcrumb: 'Ký số',
                },
                loadChildren: () =>
                    import('./digital-signature/digital-signature.module').then(
                        (m) => m.DigitalSignatureModule,
                    ),
            },
        ],
    },

    {
        path: 'profile',
        component: ProfileLayoutComponent,
        data: {
            breadcrumb: 'Cài đặt người dùng',
        },
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfileModule),
    },
    {
        path: 'login-history',
        component: LoginHistoryComponent,
        data: {
            breadcrumb: 'Lịch sử đăng nhập',
        },
    },
    {
        path: 'app-access-history',
        data: {
            breadcrumb: 'Tài khoản',
        },
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./app-access-history/app-access-history.module').then(
                (m) => m.AppAccessHistoryModule,
            ),
    },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
