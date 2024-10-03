import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceVersionComponent } from './create-resource-version.component';

describe('CreateResourceVersionComponent', () => {
    let component: CreateResourceVersionComponent;
    let fixture: ComponentFixture<CreateResourceVersionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateResourceVersionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateResourceVersionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
