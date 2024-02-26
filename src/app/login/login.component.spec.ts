import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // @ts-ignore
    registerBtn.addEventListener('click', () => {
      // @ts-ignore
      container.classList.add("active");
    });

    // @ts-ignore
    loginBtn.addEventListener('click', () => {
      // @ts-ignore
      container.classList.remove("active");
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
