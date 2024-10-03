import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchVmsManagementComponent } from './watch-vms-management.component';

describe('WatchVmsManagementComponent', () => {
    let component: WatchVmsManagementComponent;
    let fixture: ComponentFixture<WatchVmsManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WatchVmsManagementComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WatchVmsManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
