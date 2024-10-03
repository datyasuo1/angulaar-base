import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSupersetComponent } from './dashboard-superset.component';

describe('DashboardSupersetComponent', () => {
    let component: DashboardSupersetComponent;
    let fixture: ComponentFixture<DashboardSupersetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardSupersetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardSupersetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
