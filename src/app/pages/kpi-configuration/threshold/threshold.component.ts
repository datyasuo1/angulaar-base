import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';
import { FormBaseComponent } from 'src/app/base/form-base/form-base.component';
import { Logic } from 'src/app/interface';
import {
    KPIPatternRule,
    Params,
} from 'src/app/service/api/kpi-configuration.service';
import { KpiConfigInfoService } from 'src/app/service/app/kpi-config-info.service';
import { ToastService } from 'src/app/service/app/toast.service';
import { VerificationService } from 'src/app/service/app/verification.service';
import { CustomFormValidator } from 'src/app/utils/form-validator';
import { v4 as uuidv4 } from 'uuid';

export interface DropInfo {
    targetId: string;
    action?: string;
}

@Component({
    templateUrl: './threshold.component.html',
    styleUrls: ['./threshold.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThresholdComponent extends FormBaseComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private kpiConfigInfoService: KpiConfigInfoService,
        private router: Router,
        private verificationService: VerificationService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit(): void {
        this.kpiConfigInfoService.thresholdUpdate$.subscribe(() => {
            this.assignData();
        });
    }

    assignData() {
        const threshold = this.kpiConfigInfoService.getThreshold();
        const {
            kpiConfiguraionName,
            serviceTypes,
            selectedServiceType,
            parameters,
            list,
        } = threshold ?? {};
        this.name = kpiConfiguraionName;
        this.serviceTypes = serviceTypes;
        this.serviceType = selectedServiceType;
        this.parameters = parameters;
        this.list = list;
        this.prepareDragDrop(this.list);
    }

    _serviceTypes: KPIPatternRule[] = [];

    get serviceTypes() {
        return this._serviceTypes;
    }

    set serviceTypes(value: KPIPatternRule[]) {
        this._serviceTypes = value;

        this.kpiConfigInfoService.setThreshold({
            ...this.kpiConfigInfoService.getThreshold(),
            serviceTypes: value,
        });
    }

    _serviceType: KPIPatternRule;

    get serviceType() {
        return this._serviceType;
    }

    set serviceType(value: KPIPatternRule) {
        this._serviceType = value;

        this.kpiConfigInfoService.setThreshold({
            ...this.kpiConfigInfoService.getThreshold(),
            selectedServiceType: value,
        });
    }

    errorServiceType: string = '';

    _name: string = '';

    get name() {
        return this._name;
    }

    set name(value: string) {
        this._name = value;

        this.kpiConfigInfoService.setThreshold({
            ...this.kpiConfigInfoService.getThreshold(),
            kpiConfiguraionName: value,
        });
    }

    errorName: string = '';

    _parameters: Params[] = [];

    get parameters() {
        return this._parameters;
    }

    set parameters(value: Params[]) {
        this._parameters = value;
        this.kpiConfigInfoService.setThreshold({
            ...this.kpiConfigInfoService.getThreshold(),
            parameters: value,
        });
    }

    logics: Logic[] = [
        {
            name: 'VÀ',
            code: 'and',
        },
        {
            name: 'HOẶC',
            code: 'or',
        },
    ];

    isValid: boolean = true;

    _list: any[] = [];

    get list() {
        return this._list;
    }

    set list(value: any[]) {
        this._list = value;
        this.kpiConfigInfoService.setThreshold({
            ...this.kpiConfigInfoService.getThreshold(),
            list: this.list,
        });
    }

    tempList: any[] = [];

    movePage() {
        if (this.validateForm()) {
            this.router.navigateByUrl(
                `${this.router.url.replace('threshold', 'alert')}`,
            );
        }
    }

    handleClose() {
        const threshold = this.kpiConfigInfoService.getThreshold();
        const alert = this.kpiConfigInfoService.getAlert();

        if (
            threshold?.list?.length > 0 ||
            threshold?.kpiConfiguraionName?.length > 0 ||
            (threshold?.selectedServiceType &&
                Object.keys(threshold?.selectedServiceType)?.length > 0) ||
            (alert?.selectedLevel &&
                Object.keys(alert?.selectedLevel)?.length > 0) ||
            (alert?.selectedField &&
                Object.keys(alert?.selectedField)?.length > 0) ||
            alert?.kpiConfigurationTitle?.length > 0
        ) {
            this.verificationService.saveVerification(() => {
                this.router.navigate([
                    'system-management',
                    'kpi-configuration',
                ]);
            });
        } else {
            this.router.navigate(['system-management', 'kpi-configuration']);
        }
    }

    handleServiceTypeChange(data: KPIPatternRule) {
        this.serviceType = data;
        this.errorServiceType = '';
        this.parameters = this.serviceType.params;
    }

    addCriteriaToItem(
        data: any[],
        targetId: string,
        value: any,
        component: string,
    ) {
        for (const item of data) {
            if (item.id === targetId) {
                if (component == 'parameter') {
                    item.parameterName = value?.name;
                    item.parameterType = value?.type;
                    item.selectedParameter = value;
                    item.errorParameter = '';
                    item.comparisonConditions = [
                        ...(value?.operations.map((item: string) => ({
                            name: item,
                            code: item,
                        })) ?? []),
                    ];
                    this.cdr.detectChanges();
                }
                if (component == 'operation') {
                    item.operation = value?.name;
                    item.operations = item?.comparisonConditions;
                    item.selectedComparisonCondition = value;
                    item.errorComparisonCondition = '';
                    this.cdr.detectChanges();
                }
                if (component == 'value') {
                    item.value = value;
                    item.errorValue = '';
                    this.cdr.detectChanges();
                }
                break;
            }
            if (item.children && item.children?.length > 0) {
                this.addCriteriaToItem(
                    item.children,
                    targetId,
                    value,
                    component,
                );
            }
        }
    }

    addLogicToItem(data: any[], targetId: string, selectedData: any) {
        for (const item of data) {
            if (item.id === targetId) {
                item.conditionType = selectedData?.code;
                item.selectedLogic = selectedData;
                item.errorLogic = '';
                this.cdr.detectChanges();
                break;
            }
            if (item.children && item.children?.length > 0) {
                this.addLogicToItem(item.children, targetId, selectedData);
            }
        }
    }

    handleConparisonConditionChange(data: any, row: any) {
        this.addCriteriaToItem(this.list, row.id, data, 'operation');
    }

    handleParameterChange(data: any, row: any) {
        this.addCriteriaToItem(this.list, row.id, data, 'parameter');
    }

    handleValueChange(data: any, row: any) {
        this.addCriteriaToItem(this.list, row.id, data, 'value');
    }

    handleLogicChange(data: any, row: any) {
        this.addLogicToItem(this.list, row.id, data);
    }

    addLogic() {
        this.list.push({
            id: uuidv4(),
            type: 'condition',
            conditionType: '',
            group: [],
            selectedLogic: {},
            errorLogic: '',
            children: [],
        });
        this.list = [...this.list];
        this.tempList = _.cloneDeep(this.list);
        this.prepareDragDrop(this.list);
    }

    addGroup() {
        this.list.push({
            id: uuidv4(),
            type: 'group',
            children: [],
        });
        this.list = [...this.list];
        this.tempList = _.cloneDeep(this.list);
        this.prepareDragDrop(this.list);
    }

    addCriteria() {
        this.list.push({
            id: uuidv4(),
            type: 'criteria',
            operation: '',
            parameterName: '',
            parameterType: '',
            comparisonConditions: [],
            operations: [],
            value: '',
            errorValue: '',
            selectedComparisonCondition: {},
            errorComparisonCondition: '',
            selectedParameter: {},
            errorParameter: '',
            group: [],
            children: [],
        });
        this.list = [...this.list];
        this.tempList = _.cloneDeep(this.list);
        this.prepareDragDrop(this.list);
    }

    handleStopPropagation(event: any) {
        event.stopPropagation();
    }

    isValidGroup(inputList: any[]) {
        for (let i = 0; i < inputList.length; i++) {
            const item = inputList[i];
            if (item.type == 'criteria' || item.type == 'condition') {
                if (item.children && item.children.length > 0) {
                    this.isValid = false;
                    i += inputList.length;
                }
            } else if (
                item.type == 'group' &&
                item.children &&
                item.children.length > 0 &&
                this.isValid
            ) {
                this.isValidGroup(item.children);
            }
        }
    }

    removeObjectById(arr: any[], id: any) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                arr.splice(i, 1);
                return;
            }

            if (arr[i].children && arr[i].children.length > 0) {
                this.removeObjectById(arr[i].children, id);
            }
        }
    }

    handleNodeClick(node: any) {
        node.isExpanded = !node.isExpanded;
    }

    handleDeleteRow(data: any) {
        this.removeObjectById(this.list, data.id);
    }

    validateForm() {
        let res = true;
        const validator = new CustomFormValidator();
        if (this.list.length > 0) {
            res = this.validateLogic(this.list);
        }
        if (!validator.isStringInputValid(this.name)) {
            res = false;
            this.errorName = 'Vui lòng nhập Tên KPI!';
        }
        if (!validator.isObjectInputValid(this.serviceType)) {
            res = false;
            this.errorServiceType = 'Vui lòng chọn Loại dịch vụ!';
        }
        return res;
    }

    validateLogic(logics: any[]) {
        let res = true;
        for (let i = 0; i < logics.length; i++) {
            const item = logics[i];
            if (item.type === 'condition') {
                if (item.children && item.children.length > 0) {
                    this.toastService.showError(
                        'Lỗi cấu hình ngưỡng',
                        'PHÉP LOGIC không cho phép chứa nhóm con',
                    );
                    res = false;
                }

                if (
                    i === 0 ||
                    i === logics.length - 1 ||
                    logics[i - 1].type !== 'criteria' ||
                    logics[i + 1].type !== 'criteria'
                ) {
                    this.toastService.showError(
                        'Lỗi cấu hình ngưỡng',
                        'PHÉP LOGIC cần một tiêu chí trước và một tiêu chí sau',
                    );
                    res = false;
                }
                if (
                    !item.selectedLogic ||
                    Object.keys(item.selectedLogic).length === 0
                ) {
                    item.errorLogic = 'Vui lòng chọn phép logic!';
                    this.cdr.detectChanges();
                    res = false;
                }
            }
            if (item.type === 'criteria') {
                if (item.children && item.children.length > 0) {
                    this.toastService.showError(
                        'Lỗi cấu hình ngưỡng',
                        'TIÊU CHÍ không cho phép chứa nhóm con',
                    );
                    res = false;
                }

                if (item.value.length === 0) {
                    item.errorValue = 'Vui lòng nhập giá trị!';
                    this.cdr.detectChanges();
                    res = false;
                }

                if (
                    !item.selectedComparisonCondition ||
                    Object.keys(item.selectedComparisonCondition).length === 0
                ) {
                    item.errorComparisonCondition =
                        'Vui lòng chọn điều kiện so sánh!';
                    this.cdr.detectChanges();
                    res = false;
                }
                if (
                    !item.selectedParameter ||
                    Object.keys(item.selectedParameter).length === 0
                ) {
                    item.errorParameter = 'Vui lòng chọn tham số!';
                    this.cdr.detectChanges();
                    res = false;
                }
            }
            if (item.type === 'group') {
                if (item.children && item.children.length == 0) {
                    this.toastService.showError(
                        'Lỗi cấu hình ngưỡng',
                        'NHÓM không cho phép rỗng',
                    );
                    res = false;
                } else {
                    const tempRes = this.validateLogic(item.children);
                    // Có lý do để làm như sau:
                    if (!tempRes) {
                        res = tempRes;
                    }
                }
            }
        }
        return res;
    }

    // ids for connected drop lists
    dropTargetIds = [];
    nodeLookup = {};
    dropActionTodo: DropInfo = null;

    prepareDragDrop(nodes: any[]) {
        nodes.forEach((node) => {
            this.dropTargetIds.push(node.id);
            this.nodeLookup[node.id] = node;
            if (node.children && node.children.length > 0) {
                this.prepareDragDrop(node.children);
            }
        });
    }

    dragMoved(event: any) {
        const e = this.document.elementFromPoint(
            event.pointerPosition.x,
            event.pointerPosition.y,
        );

        if (!e) {
            this.clearDragInfo();
            return;
        }
        const container = e.classList.contains('node-item')
            ? e
            : e.closest('.node-item');
        if (!container) {
            this.clearDragInfo();
            return;
        }
        this.dropActionTodo = {
            targetId: container.getAttribute('data-id'),
        };
        const targetRect = container.getBoundingClientRect();
        const oneThird = targetRect.height / 3;

        if (event.pointerPosition.y - targetRect.top < oneThird) {
            // before
            this.dropActionTodo['action'] = 'before';
        } else if (event.pointerPosition.y - targetRect.top > 2 * oneThird) {
            // after
            this.dropActionTodo['action'] = 'after';
        } else {
            // inside
            this.dropActionTodo['action'] = 'inside';
        }
        this.showDragInfo();
    }

    drop(event: any) {
        // this.isValid = true;
        // this.isValidGroup(this.list);
        // if (!this.isValid) {
        //     this.list = _.cloneDeep(this.tempList);
        //     this.isValid = true;
        // } else {
        //     this.tempList = _.cloneDeep(this.list);
        // }

        if (!this.dropActionTodo) return;

        const draggedItemId = event.item.data;
        const parentItemId = event.previousContainer.id;
        const targetListId = this.getParentNodeId(
            this.dropActionTodo.targetId,
            this.list,
            'main',
        );

        const draggedItem = this.nodeLookup[draggedItemId];

        const oldItemContainer =
            parentItemId != 'main'
                ? this.nodeLookup[parentItemId]?.children
                : this.list;
        const newContainer =
            targetListId != 'main'
                ? this.nodeLookup[targetListId]?.children
                : this.list;

        const i = oldItemContainer.findIndex(
            (c: any) => c.id === draggedItemId,
        );
        oldItemContainer.splice(i, 1);

        switch (this.dropActionTodo.action) {
            case 'before':
            case 'after':
                const targetIndex = newContainer.findIndex(
                    (c: any) => c.id === this.dropActionTodo.targetId,
                );
                if (this.dropActionTodo.action == 'before') {
                    newContainer.splice(targetIndex, 0, draggedItem);
                } else {
                    newContainer.splice(targetIndex + 1, 0, draggedItem);
                }
                break;

            case 'inside':
                if (this.nodeLookup[this.dropActionTodo.targetId]) {
                    this.nodeLookup[this.dropActionTodo.targetId].children.push(
                        draggedItem,
                    );
                    this.nodeLookup[this.dropActionTodo.targetId].isExpanded =
                        true;
                }
                break;
        }

        this.clearDragInfo(true);
    }

    getParentNodeId(
        id: string,
        nodesToSearch: any[],
        parentId: string,
    ): string {
        for (const node of nodesToSearch) {
            if (node.id == id) return parentId;
            const ret = this.getParentNodeId(id, node.children, node.id);
            if (ret) return ret;
        }
        return null;
    }

    showDragInfo() {
        this.clearDragInfo();
        if (this.dropActionTodo) {
            this.document
                .getElementById('node-' + this.dropActionTodo.targetId)
                .classList.add('drop-' + this.dropActionTodo.action);
        }
    }

    clearDragInfo(dropped = false) {
        if (dropped) {
            this.dropActionTodo = null;
        }
        this.document
            .querySelectorAll('.drop-before')
            .forEach((element) => element.classList.remove('drop-before'));
        this.document
            .querySelectorAll('.drop-after')
            .forEach((element) => element.classList.remove('drop-after'));
        this.document
            .querySelectorAll('.drop-inside')
            .forEach((element) => element.classList.remove('drop-inside'));
    }
}
