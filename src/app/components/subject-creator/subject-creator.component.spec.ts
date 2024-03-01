import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCreatorComponent } from './subject-creator.component';

describe('SubjectCreatorComponent', () => {
  let component: SubjectCreatorComponent;
  let fixture: ComponentFixture<SubjectCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
