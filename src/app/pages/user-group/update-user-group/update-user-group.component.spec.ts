import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserGroupComponent } from './update-user-group.component';

describe('UpdateUserGroupComponent', () => {
    let component: UpdateUserGroupComponent;
    let fixture: ComponentFixture<UpdateUserGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpdateUserGroupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateUserGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
