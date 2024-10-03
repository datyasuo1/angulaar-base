import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditServerComponent } from './create-edit-server.component';

describe('CreateEditServerComponent', () => {
    let component: CreateEditServerComponent;
    let fixture: ComponentFixture<CreateEditServerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEditServerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEditServerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
