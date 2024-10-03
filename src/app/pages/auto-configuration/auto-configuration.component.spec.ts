import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoConfigurationComponent } from './auto-configuration.component';

describe('AutoConfigurationComponent', () => {
    let component: AutoConfigurationComponent;
    let fixture: ComponentFixture<AutoConfigurationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AutoConfigurationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AutoConfigurationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
