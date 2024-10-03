import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSigningComponent } from './confirm-signing.component';

describe('ConfirmSigningComponent', () => {
    let component: ConfirmSigningComponent;
    let fixture: ComponentFixture<ConfirmSigningComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmSigningComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmSigningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
