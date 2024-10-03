import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskClassificationComponent } from './add-task-classification.component';

describe('AddTaskClassificationComponent', () => {
    let component: AddTaskClassificationComponent;
    let fixture: ComponentFixture<AddTaskClassificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddTaskClassificationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddTaskClassificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
