import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDashboardConfigComponent } from './watch-dashboard-config.component';

describe('WatchDashboardConfigComponent', () => {
    let component: WatchDashboardConfigComponent;
    let fixture: ComponentFixture<WatchDashboardConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WatchDashboardConfigComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WatchDashboardConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
