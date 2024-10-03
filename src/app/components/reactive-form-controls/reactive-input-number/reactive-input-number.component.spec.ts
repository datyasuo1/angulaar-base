import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveInputNumberComponent } from './reactive-input-number.component';

describe('ReactiveInputNumberComponent', () => {
    let component: ReactiveInputNumberComponent;
    let fixture: ComponentFixture<ReactiveInputNumberComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveInputNumberComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReactiveInputNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
