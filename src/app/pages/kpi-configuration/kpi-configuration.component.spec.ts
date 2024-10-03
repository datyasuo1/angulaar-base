import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiConfigurationComponent } from './kpi-configuration.component';

describe('KpiConfigurationComponent', () => {
    let component: KpiConfigurationComponent;
    let fixture: ComponentFixture<KpiConfigurationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KpiConfigurationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(KpiConfigurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
