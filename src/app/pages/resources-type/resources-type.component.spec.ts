import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesTypeComponent } from './resources-type.component';

describe('ResourcesTypeComponent', () => {
    let component: ResourcesTypeComponent;
    let fixture: ComponentFixture<ResourcesTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResourcesTypeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ResourcesTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
