import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchResourceTypeComponent } from './watch-resource-type.component';

describe('WatchResourceTypeComponent', () => {
    let component: WatchResourceTypeComponent;
    let fixture: ComponentFixture<WatchResourceTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WatchResourceTypeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WatchResourceTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
