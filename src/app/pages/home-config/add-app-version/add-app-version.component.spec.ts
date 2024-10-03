import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppVersionComponent } from './add-app-version.component';

describe('AddAppVersionComponent', () => {
    let component: AddAppVersionComponent;
    let fixture: ComponentFixture<AddAppVersionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddAppVersionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddAppVersionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
