import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenViewerComponent } from './screen-viewer.component';

describe('ScreenViewerComponent', () => {
    let component: ScreenViewerComponent;
    let fixture: ComponentFixture<ScreenViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScreenViewerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ScreenViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
