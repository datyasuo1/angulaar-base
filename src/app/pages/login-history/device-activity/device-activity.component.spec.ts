import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceActivityComponent } from './device-activity.component';

describe('DeviceActivityComponent', () => {
    let component: DeviceActivityComponent;
    let fixture: ComponentFixture<DeviceActivityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeviceActivityComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DeviceActivityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
