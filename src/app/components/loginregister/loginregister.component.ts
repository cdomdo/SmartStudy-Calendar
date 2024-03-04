import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (container && registerBtn && loginBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    } else {
      console.error('Elements not found.');
    }
  }

  registerUser(formData: any) {
    const { email, password } = formData;
    this.userService.register({ email, password }).then(() => {
      console.log("Registration successful")
    }).catch(error => {
      console.error('Error al registrar:', error);
    });
  }

  loginUser(formData: any) {
    const { email, password } = formData;
    this.userService.login({ email, password }).then(() => {
      console.log("Login successful")
    }).catch(error => {
      console.error('Error al iniciar sesión:', error);
    });
  }
}
