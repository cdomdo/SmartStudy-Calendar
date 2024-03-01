import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorManagerComponent } from './professor-manager.component';

describe('ProfessorManagerComponent', () => {
  let component: ProfessorManagerComponent;
  let fixture: ComponentFixture<ProfessorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessorManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
