import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceTypeComponent } from './create-resource-type.component';

describe('CreateResourceTypeComponent', () => {
    let component: CreateResourceTypeComponent;
    let fixture: ComponentFixture<CreateResourceTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateResourceTypeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateResourceTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
