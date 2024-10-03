import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeUnitComponent } from './administrative-unit.component';

describe('AdministrativeUnitComponent', () => {
    let component: AdministrativeUnitComponent;
    let fixture: ComponentFixture<AdministrativeUnitComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdministrativeUnitComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AdministrativeUnitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
