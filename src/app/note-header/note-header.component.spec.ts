import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteHeaderComponent } from './note-header.component';

describe('NoteHeaderComponent', () => {
  let component: NoteHeaderComponent;
  let fixture: ComponentFixture<NoteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
