import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeployedSystemComponent } from './list-deployed-system.component';

describe('ListDeployedSystemComponent', () => {
    let component: ListDeployedSystemComponent;
    let fixture: ComponentFixture<ListDeployedSystemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListDeployedSystemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListDeployedSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
