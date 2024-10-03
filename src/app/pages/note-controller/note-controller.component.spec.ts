import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteControllerComponent } from './note-controller.component';

describe('NoteControllerComponent', () => {
    let component: NoteControllerComponent;
    let fixture: ComponentFixture<NoteControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoteControllerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NoteControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
