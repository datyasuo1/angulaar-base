import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDashboardConfigComponent } from './new-dashboard-config.component';

describe('NewDashboardConfigComponent', () => {
    let component: NewDashboardConfigComponent;
    let fixture: ComponentFixture<NewDashboardConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewDashboardConfigComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NewDashboardConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
