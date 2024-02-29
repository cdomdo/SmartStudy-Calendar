import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCreatorComponent } from './professor-creator.component';

describe('ProfessorCreatorComponent', () => {
  let component: ProfessorCreatorComponent;
  let fixture: ComponentFixture<ProfessorCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessorCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
