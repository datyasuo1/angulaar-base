import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchPublicInfoComponent } from './watch-public-info.component';

describe('WatchPublicInfoComponent', () => {
    let component: WatchPublicInfoComponent;
    let fixture: ComponentFixture<WatchPublicInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WatchPublicInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WatchPublicInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
