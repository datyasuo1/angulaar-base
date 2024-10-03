import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTableauComponent } from './dashboard-tableau.component';

describe('DashboardTableauComponent', () => {
    let component: DashboardTableauComponent;
    let fixture: ComponentFixture<DashboardTableauComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardTableauComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardTableauComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
