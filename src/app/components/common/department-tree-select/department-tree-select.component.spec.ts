import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTreeSelectComponent } from './department-tree-select.component';

describe('DepartmentTreeSelectComponent', () => {
    let component: DepartmentTreeSelectComponent;
    let fixture: ComponentFixture<DepartmentTreeSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DepartmentTreeSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DepartmentTreeSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
