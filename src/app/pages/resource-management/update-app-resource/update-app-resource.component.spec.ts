import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppResourceComponent } from './update-app-resource.component';

describe('UpdateAppResourceComponent', () => {
    let component: UpdateAppResourceComponent;
    let fixture: ComponentFixture<UpdateAppResourceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdateAppResourceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateAppResourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
