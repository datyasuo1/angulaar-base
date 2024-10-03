import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import {
    AddDashboardConfigRequestBody,
    Agency,
    Dashboard,
    DashboardConfigResponse,
    DashboardConfigService,
    DashboardService,
    DashboardServicesResponse,
} from 'src/app/service/api/dashboard-config.service';
import {
    DepartmentService,
    DepartmentsResponse,
    DepartmentTree,
} from 'src/app/service/api/department.service';
import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CommonResponse } from 'src/app/service/common';
import { decryptLong } from 'src/app/utils/encrypt';
import { CustomFormValidator } from 'src/app/utils/form-validator';

@Component({
    selector: 'app-new-dashboard-config',
    templateUrl: './new-dashboard-config.component.html',
    styleUrls: ['./new-dashboard-config.component.scss'],
})
export class NewDashboardConfigComponent
    extends FormBaseComponent
    implements OnInit
{
    rows: number = 10;

    first: number = 0;

    totalRecords: number = 0;

    service: DashboardService[];

    errorService: string = '';

    services: DashboardService[] = [];

    name: string = '';

    errorName: string = '';

    department: DepartmentTree[];

    departments: DepartmentTree[] = [];

    visible: boolean = false;

    departmentData: DepartmentTree[] = [];

    id: number;

    cardTitle: string = 'Thêm mới cấu hình hiển thị dịch vụ';

    pageType: string = 'create';

    constructor(
        private dashboardConfigService: DashboardConfigService,
        private departmentService: DepartmentService,
        private verificationService: VerificationService,
        private router: Router,
        private route: ActivatedRoute,
        private apiHandlerService: ApiHandlerService,
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.router.url.includes('update')) {
            this.cardTitle = 'Cập nhật cấu hình hiển thị dịch vụ';
            this.pageType = 'update';
            this.id = parseInt(decryptLong(this.route.snapshot.params?.['id']));
            forkJoin([
                this.dashboardConfigService.getDashboardServices(-1, 1),
                this.departmentService.getComboBoxAgencies(),
            ])
                .pipe(
                    switchMap(([res1, res2]) => {
                        this.services = res1.data;
                        this.departments = res2.data;
                        return this.dashboardConfigService.getDashboardConfigById(
                            this.id,
                        );
                    }),
                )
                .subscribe({
                    next: (res: DashboardConfigResponse) => {
                        const { configName, agencies, dashboards } = res.data;
                        this.name = configName;
                        this.service = this.services.filter(
                            (item: DashboardService) =>
                                dashboards.find(
                                    (obj: Dashboard) => obj.id === item.id,
                                ),
                        );
                        const ids = agencies.map((item: Agency) => item.id);
                        this.totalRecords = agencies.length;

                        this.department = this.departments.filter(
                            (item: DepartmentTree) => ids.includes(item.id),
                        );

                        this.departmentData = this.department;
                    },
                });
        } else {
            this.getDepartments();
            this.getServices();
        }
    }

    handleDepartmentChange(event: DepartmentTree[]) {
        this.department = event;
    }

    getServices() {
        this.dashboardConfigService.getDashboardServices(-1, 1).subscribe({
            next: (res: DashboardServicesResponse) => {
                this.services = res.data;
            },
        });
    }

    getDepartments() {
        this.departmentService.getComboBoxAgencies().subscribe({
            next: (res: DepartmentsResponse) => {
                this.departments = res.data;
            },
        });
    }

    confirmDelete(data: DepartmentTree) {
        this.verificationService.delVerification(
            `Bạn có chắc muốn xóa Phòng ban <b>${data.name}</b>?`,
            () => {
                this.handleDeleteDepartment(data);
            },
        );
    }

    handleDeleteDepartment(data: DepartmentTree) {
        this.department = this.department.filter(
            (item: DepartmentTree) => item.id !== data.id,
        );
        this.departmentData = this.department;
    }

    handleClose() {
        this.router.navigate(['system-management', 'service-config']);
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (!validator.isStringInputValid(this.name)) {
            res = false;
            this.errorName = 'Vui lòng nhập Tên cấu hình';
        }
        if (!validator.isObjectInputValid(this.service)) {
            res = false;
            this.errorService = 'Vui lòng chọn Dịch vụ';
        }
        return res;
    }

    getAUColumn(data: DepartmentTree) {
        const { wardName, districtName, provinceName } = data ?? {};
        return wardName || districtName || provinceName || '';
    }

    handleAddDepartment() {
        if (this.department && this.department.length > 0) {
            this.departmentData = this.department;
            this.totalRecords = this.departmentData.length;
            this.visible = false;
        }
    }

    handleDashboardConfigForm() {
        if (this.validateForm()) {
            this.loading = true;
            const data: AddDashboardConfigRequestBody = {
                configName: this.name,
                dashboards: this.service.map(
                    (item: DashboardService) => item.id,
                ),
                agencies: this.departmentData.map(
                    (item: DepartmentTree) => item.id,
                ),
            };
            if (this.pageType === 'create') {
                this.dashboardConfigService
                    .createDashboardConfig(data)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        }),
                    )
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.router.navigate([
                                        'system-management',
                                        'service-config',
                                    ]);
                                },
                                201,
                            );
                        },
                    });
            } else {
                this.dashboardConfigService
                    .updateDashboardConfig(data, this.id)
                    .pipe(
                        finalize(() => {
                            this.loading = false;
                        }),
                    )
                    .subscribe({
                        next: (res: CommonResponse) => {
                            this.apiHandlerService.handleSuccess(
                                res,
                                () => {
                                    this.router.navigate([
                                        'system-management',
                                        'service-config',
                                    ]);
                                },
                                200,
                            );
                        },
                    });
            }
        }
    }
}
