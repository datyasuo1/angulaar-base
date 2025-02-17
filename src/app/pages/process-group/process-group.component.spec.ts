import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessGroupComponent } from './process-group.component';

describe('ProcessGroupComponent', () => {
    let component: ProcessGroupComponent;
    let fixture: ComponentFixture<ProcessGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessGroupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
