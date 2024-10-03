import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAppResourceComponent } from './create-app-resource.component';

describe('CreateAppResourceComponent', () => {
    let component: CreateAppResourceComponent;
    let fixture: ComponentFixture<CreateAppResourceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateAppResourceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateAppResourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
