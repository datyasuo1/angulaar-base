import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBuilderComponent } from './screen-builder.component';

describe('ScreenBuilderComponent', () => {
    let component: ScreenBuilderComponent;
    let fixture: ComponentFixture<ScreenBuilderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScreenBuilderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ScreenBuilderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
