import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKpiConfigurationComponent } from './create-kpi-configuration.component';

describe('CreateKpiConfigurationComponent', () => {
    let component: CreateKpiConfigurationComponent;
    let fixture: ComponentFixture<CreateKpiConfigurationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateKpiConfigurationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateKpiConfigurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
