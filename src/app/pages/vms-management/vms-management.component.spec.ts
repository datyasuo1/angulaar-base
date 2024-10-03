import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsManagementComponent } from './vms-management.component';

describe('VmsManagementComponent', () => {
    let component: VmsManagementComponent;
    let fixture: ComponentFixture<VmsManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VmsManagementComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VmsManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
