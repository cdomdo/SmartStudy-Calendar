import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {User} from "../../interfaces/user.interface";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

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

  registerUser(form: NgForm) {
    if (form.valid) {
      this.userData = form.value;
      this.userService.register(this.userData).then(() => {
        alert("Registro exitoso");
      }).catch(error => {
        alert('Error al registrar: ' + error.message);
      });
    }else {
      alert('Rellena los campos correctamente')
    }
  }

  loginUser(form: NgForm) {
    if (form.valid) {
      const {email, password} = form.value;
      this.userService.login({email, password}).then(() => {
        console.log("Login successful")
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        alert('Error al iniciar sesión: ' + error.message)
      });
    }else{
      alert('Rellena los campos correctamente')
    }
  }
}
