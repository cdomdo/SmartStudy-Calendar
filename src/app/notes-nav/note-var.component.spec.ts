import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navbarComponent } from './note-var.component';

describe('navbarComponent', () => {
  let component: navbarComponent;
  let fixture: ComponentFixture<navbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [navbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(navbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
