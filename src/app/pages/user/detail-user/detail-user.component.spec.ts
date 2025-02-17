import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserComponent } from './detail-user.component';

describe('DetailUserComponent', () => {
    let component: DetailUserComponent;
    let fixture: ComponentFixture<DetailUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailUserComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DetailUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
