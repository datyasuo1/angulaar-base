import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDeployedSystemComponent } from './create-edit-deployed-system.component';

describe('CreateEditDeployedSystemComponent', () => {
    let component: CreateEditDeployedSystemComponent;
    let fixture: ComponentFixture<CreateEditDeployedSystemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEditDeployedSystemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEditDeployedSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
