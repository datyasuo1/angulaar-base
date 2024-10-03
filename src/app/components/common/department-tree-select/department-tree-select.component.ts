import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';

import {
    DepartmentService,
    DepartmentTree,
} from 'src/app/service/api/department.service';

@Component({
    selector: 'app-department-tree-select',
    templateUrl: './department-tree-select.component.html',
    styleUrl: './department-tree-select.component.scss',
})
export class DepartmentTreeSelectComponent {
    constructor(private dS: DepartmentService) {}

    departments: DepartmentTree[] = [];

    @Input() label: string = 'Phòng ban';

    @Input() placeholder: string = 'Chọn phòng ban';

    @Input() showLabel: boolean = true;

    @Input() department: DepartmentTree;

    @Input() selectedDepartmentId: number | null = null;

    @Input() errorDepartment: string = '';

    @Input() required: boolean = false;

    @Input() autofocus: boolean = false;

    @Input() hasAllValue: boolean = false;

    @Input() hasFilter: boolean = false;

    @Output() onChange: EventEmitter<DepartmentTree> = new EventEmitter();

    @Output() departmentChange: EventEmitter<DepartmentTree> =
        new EventEmitter();

    foundItem: DepartmentTree;

    async ngOnInit() {
        await this.getDepartments();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['selectedDepartmentId'] && this.departments.length > 0) {
            if (
                !this.hasAllValue ||
                (this.hasAllValue && this.selectedDepartmentId)
            ) {
                this.department = this.getDepartmentById(
                    this.selectedDepartmentId,
                    this.departments,
                );
            } else {
                this.department = this.departments[0];
            }
            this.departmentChange.emit(this.department);
        }
    }

    async getDepartments() {
        try {
            const res = await lastValueFrom(
                this.dS.getComboBoxAgencies(-1, 1, '', ',,', true),
            );
            if (!this.hasAllValue) {
                this.departments = res.data;
                this.department = this.getDepartmentById(
                    this.selectedDepartmentId,
                    this.departments,
                );
            } else {
                this.departments = [
                    {
                        id: undefined,
                        name: '-- Tất cả --',
                    },
                    ...res.data,
                ];
                this.department = this.departments[0];
            }

            this.departmentChange.emit(this.department);
        } catch (error: unknown) {
            console.error(error);
        }
    }

    getDepartmentById(id: string | number, list: DepartmentTree[]) {
        for (let i = 0; i < list.length; i++) {
            if (list[i]?.id === id) {
                this.department = list[i];
                this.foundItem = this.department;
            }
            const childList = list[i].children;
            if (childList?.length > 0) {
                this.getDepartmentById(id, childList);
            }
        }
        return this.foundItem;
    }

    handleDepartmentChange(data: DepartmentTree) {
        this.onChange.emit(data);
    }

    handleClearDepartment() {
        this.department = null;
        if (this.hasAllValue) {
            setTimeout(() => {
                this.department = this.departments[0];
            });
        }
        this.departmentChange.emit(this.department);
    }
}
