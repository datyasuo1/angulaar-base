import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessUploaderComponent } from './process-uploader.component';

describe('ProcessUploaderComponent', () => {
    let component: ProcessUploaderComponent;
    let fixture: ComponentFixture<ProcessUploaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessUploaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
