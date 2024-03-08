import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userToken: string | null = null;
  constructor(private auth: Auth, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.getIdToken().then(token => {
          this.userToken = token;
          localStorage.setItem('userToken', token); // Guarda el token en el almacenamiento local
        });
      } else {
        this.userToken = null;
        localStorage.removeItem('userToken'); // Elimina el token del almacenamiento local al cerrar sesión
      }
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
