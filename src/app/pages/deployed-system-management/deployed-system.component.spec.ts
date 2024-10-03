import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployedSystemComponent } from './deployed-system.component';

describe('DeployedSystemComponent', () => {
    let component: DeployedSystemComponent;
    let fixture: ComponentFixture<DeployedSystemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeployedSystemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DeployedSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
