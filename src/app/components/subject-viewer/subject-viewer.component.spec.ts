import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectViewerComponent } from './subject-viewer.component';

describe('SubjectViewerComponent', () => {
  let component: SubjectViewerComponent;
  let fixture: ComponentFixture<SubjectViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
