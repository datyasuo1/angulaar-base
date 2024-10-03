import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppAccessHistoryComponent } from './list-app-access-history.component';

describe('ListAppAccessHistoryComponent', () => {
    let component: ListAppAccessHistoryComponent;
    let fixture: ComponentFixture<ListAppAccessHistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListAppAccessHistoryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListAppAccessHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
