import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveCheckboxComponent } from './reactive-checkbox.component';

describe('ReactiveCheckboxComponent', () => {
    let component: ReactiveCheckboxComponent;
    let fixture: ComponentFixture<ReactiveCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveCheckboxComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReactiveCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
