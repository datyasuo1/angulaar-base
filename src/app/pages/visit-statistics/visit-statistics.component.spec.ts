import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitStatisticsComponent } from './visit-statistics.component';

describe('VisitStatisticsComponent', () => {
    let component: VisitStatisticsComponent;
    let fixture: ComponentFixture<VisitStatisticsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VisitStatisticsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VisitStatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
