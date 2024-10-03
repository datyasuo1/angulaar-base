import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuTreeSelectComponent } from './au-tree-select.component';

describe('AuTreeSelectComponent', () => {
    let component: AuTreeSelectComponent;
    let fixture: ComponentFixture<AuTreeSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuTreeSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AuTreeSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
