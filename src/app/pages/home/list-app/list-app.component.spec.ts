import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppComponent } from './list-app.component';

describe('ListAppComponent', () => {
    let component: ListAppComponent;
    let fixture: ComponentFixture<ListAppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListAppComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
