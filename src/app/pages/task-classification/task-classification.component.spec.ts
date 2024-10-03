import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskClassificationComponent } from './task-classification.component';

describe('TaskClassificationComponent', () => {
    let component: TaskClassificationComponent;
    let fixture: ComponentFixture<TaskClassificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskClassificationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskClassificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
