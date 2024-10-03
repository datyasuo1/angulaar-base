import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicInfoComponent } from './create-public-info.component';

describe('CreatePublicInfoComponent', () => {
    let component: CreatePublicInfoComponent;
    let fixture: ComponentFixture<CreatePublicInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreatePublicInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreatePublicInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
