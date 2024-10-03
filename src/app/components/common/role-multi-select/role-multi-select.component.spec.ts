import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMultiSelectComponent } from './role-multi-select.component';

describe('RoleMultiSelectComponent', () => {
    let component: RoleMultiSelectComponent;
    let fixture: ComponentFixture<RoleMultiSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoleMultiSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RoleMultiSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
