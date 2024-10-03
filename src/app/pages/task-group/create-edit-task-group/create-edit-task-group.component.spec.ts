import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskGroupComponent } from './create-edit-task-group.component';

describe('CreateEditTaskGroupComponent', () => {
    let component: CreateEditTaskGroupComponent;
    let fixture: ComponentFixture<CreateEditTaskGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEditTaskGroupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEditTaskGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
