import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResourceComponent } from './list-app-resource.component';

describe('ListResourceComponent', () => {
    let component: ListResourceComponent;
    let fixture: ComponentFixture<ListResourceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListResourceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListResourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
