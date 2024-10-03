import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskGroupComponent } from './list-task-group.component';

describe('ListTaskGroupComponent', () => {
    let component: ListTaskGroupComponent;
    let fixture: ComponentFixture<ListTaskGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListTaskGroupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListTaskGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
