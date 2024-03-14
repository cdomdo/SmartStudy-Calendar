import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {User} from "../../interfaces/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginregisterComponent {

  userData: User = {
    nombreCompleto: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    universidad: '',
    fechaNacimiento: new Date()
  };

  constructor(private router: Router,private userService: UserService) {}

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
    this.userData = formData;
    this.userService.register(this.userData).then(() => {
      console.log("Registro exitoso");
      // Aquí podrías redirigir al usuario a otra página, mostrar un mensaje de éxito, etc.
    }).catch(error => {
      console.error('Error al registrar:', error);
      // Aquí podrías mostrar un mensaje de error al usuario, por ejemplo.
    });
  }

  loginUser(formData: any) {
    const { email, password } = formData;
    this.userService.login({ email, password }).then(() => {
      console.log("Login successful")
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.error('Error al iniciar sesión:', error);
    });
  }
}
