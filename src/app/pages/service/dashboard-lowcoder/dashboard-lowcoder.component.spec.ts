import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLowcoderComponent } from './dashboard-lowcoder.component';

describe('DashboardLowcoderComponent', () => {
    let component: DashboardLowcoderComponent;
    let fixture: ComponentFixture<DashboardLowcoderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardLowcoderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardLowcoderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
