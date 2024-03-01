import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditorComponent } from './subject-editor.component';

describe('SubjectEditorComponent', () => {
  let component: SubjectEditorComponent;
  let fixture: ComponentFixture<SubjectEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
