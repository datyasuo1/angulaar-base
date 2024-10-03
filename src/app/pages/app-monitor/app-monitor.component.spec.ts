import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMonitorComponent } from './app-monitor.component';

describe('AppMonitorComponent', () => {
    let component: AppMonitorComponent;
    let fixture: ComponentFixture<AppMonitorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppMonitorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppMonitorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
