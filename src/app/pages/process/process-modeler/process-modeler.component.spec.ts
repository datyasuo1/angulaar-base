import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessModelerComponent } from './process-modeler.component';

describe('ProcessModelerComponent', () => {
    let component: ProcessModelerComponent;
    let fixture: ComponentFixture<ProcessModelerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessModelerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessModelerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
