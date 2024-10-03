import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserGroupComponent } from './detail-user-group.component';

describe('DetailUserGroupComponent', () => {
    let component: DetailUserGroupComponent;
    let fixture: ComponentFixture<DetailUserGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailUserGroupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DetailUserGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
