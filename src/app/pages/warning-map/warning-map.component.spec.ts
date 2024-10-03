import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningMapComponent } from './warning-map.component';

describe('WarningMapComponent', () => {
    let component: WarningMapComponent;
    let fixture: ComponentFixture<WarningMapComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WarningMapComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WarningMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
