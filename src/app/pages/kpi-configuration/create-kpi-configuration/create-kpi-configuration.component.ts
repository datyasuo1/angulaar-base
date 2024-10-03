import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Field, FieldService } from 'src/app/service/api/field.service';
import {
    GroupCondition,
    KpiConfigurationService,
    KPIPatternRule,
    KpiResponse,
} from 'src/app/service/api/kpi-configuration.service';
import {
    Priority,
    PriorityService,
} from 'src/app/service/api/priority.service';
import { KpiConfigInfoService } from 'src/app/service/app/kpi-config-info.service';
import { decryptLong } from 'src/app/utils/encrypt';

@Component({
    selector: 'app-create-kpi-configuration',
    templateUrl: './create-kpi-configuration.component.html',
    styleUrls: ['./create-kpi-configuration.component.scss'],
    providers: [KpiConfigInfoService],
})
export class CreateKpiConfigurationComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private kpiConfigurationService: KpiConfigurationService,
        private kpiConfigInfoService: KpiConfigInfoService,
        private priorityService: PriorityService,
        private fieldService: FieldService,
    ) {}

    items: MenuItem[] = [];

    pageTitle: string = '';

    findServiceTypeById(id: string) {
        return this.kpiConfigInfoService
            .getThreshold()
            .serviceTypes.filter((item: KPIPatternRule) => item.id == id)[0];
    }

    findLevelById(id: number) {
        return this.kpiConfigInfoService
            .getAlert()
            .levels.filter((item: Priority) => item.id == id)[0];
    }

    findFieldById(id: number) {
        return this.kpiConfigInfoService
            .getAlert()
            .fields.filter((item: Field) => item.id == id)[0];
    }

    ngOnInit(): void {
        this.items = [
            {
                label: 'Cấu hình ngưỡng',
                routerLink: 'threshold',
            },
            {
                label: 'Cấu hình cảnh báo',
                routerLink: 'alert',
            },
        ];

        const serviceTypesAPI = this.kpiConfigurationService.getServiceType();
        const fieldsAPI = this.fieldService.getComboBoxFields();
        const prioritiesAPI = this.priorityService.getComboBoxPriorities();

        forkJoin([serviceTypesAPI, fieldsAPI, prioritiesAPI]).subscribe({
            next: ([result1, result2, result3]) => {
                this.kpiConfigInfoService.setThreshold({
                    ...this.kpiConfigInfoService.getThreshold(),
                    serviceTypes: result1.data,
                });
                this.kpiConfigInfoService.setAlert({
                    ...this.kpiConfigInfoService.getAlert(),

                    fields: result2.data,
                    levels: result3.data,
                });

                this.kpiConfigInfoService.onThresholdUpdate();
                this.kpiConfigInfoService.onAlertUpdate();

                if (this.router.url.includes('create')) {
                    this.pageTitle = 'Thêm mới cấu hình KPI';
                }

                if (this.router.url.includes('update')) {
                    this.pageTitle = 'Cập nhật cấu hình KPI';
                    this.getKpiConfigurationById();
                }

                if (this.router.url.includes('watch')) {
                    this.pageTitle = 'Xem cấu hình KPI';
                    this.getKpiConfigurationById();
                }
            },
        });

        if (
            this.router.url.includes('threshold') ||
            this.router.url.includes('alert')
        ) {
            this.router.navigateByUrl(`${this.router.url}`);
        } else {
            this.router.navigateByUrl(`${this.router.url}/threshold`);
        }
    }

    getKpiConfigurationById() {
        this.kpiConfigurationService
            .getKpiConfigurationById(
                decryptLong(this.route.snapshot.params['id']),
            )
            .subscribe({
                next: (res: KpiResponse) => {
                    const data = res?.data;

                    const tempList = data.groupConditions;

                    this.changeAttributeToChildren(tempList);

                    this.kpiConfigInfoService.setThreshold({
                        ...this.kpiConfigInfoService.getThreshold(),
                        kpiConfiguraionName: data.name,
                        selectedServiceType: this.findServiceTypeById(
                            data.patternRule?.id,
                        ),
                        list: tempList,
                        parameters: data.patternRule?.params,
                    });
                    this.kpiConfigInfoService.setAlert({
                        ...this.kpiConfigInfoService.getAlert(),
                        kpiConfigurationTitle:
                            data.actions[0].parameters.json.title,
                        selectedField: this.findFieldById(
                            data.actions[0].parameters.json.field_id,
                        ),
                        selectedLevel: this.findLevelById(
                            data.actions[0].parameters.json.priority_id,
                        ),
                        content: data.actions[0].parameters.json.content,
                        address: data.actions[0].parameters.json.location,
                    });
                    this.kpiConfigInfoService.onThresholdUpdate();
                    this.kpiConfigInfoService.onAlertUpdate();
                },
            });
    }

    changeAttributeToChildren(data: GroupCondition[]) {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (item.group) {
                    item.children = item.group;
                    delete item.group;
                }
                if (item.children?.length > 0) {
                    this.changeAttributeToChildren(item.children);
                }
            });
        }
    }
}
