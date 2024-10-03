import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchResourceComponent } from './watch-resource.component';

describe('WatchResourceComponent', () => {
    let component: WatchResourceComponent;
    let fixture: ComponentFixture<WatchResourceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WatchResourceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WatchResourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
