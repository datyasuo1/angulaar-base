import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatedServiceListComponent } from './affiliated-service-list.component';

describe('AffiliatedServiceListComponent', () => {
    let component: AffiliatedServiceListComponent;
    let fixture: ComponentFixture<AffiliatedServiceListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AffiliatedServiceListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AffiliatedServiceListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
