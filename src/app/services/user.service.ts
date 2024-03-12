import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../interfaces/user.interface";
@Injectable({
  providedIn: 'root'
})

export class UserService {

  userToken: string | null = null;

  constructor(private auth: Auth, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.getIdToken().then(token => {
          this.userToken = token;
          localStorage.setItem('userToken', token);
        });
      } else {
        this.userToken = null;
        localStorage.removeItem('userToken');
      }
    });
  }

  register(userData: User) {
    const { email, password, nombreCompleto, telefono, universidad, fechaNacimiento } = userData;

    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        // Guardar información adicional en Firestore
        return this.firestore.collection('users').doc(userCredential.user.uid).set({
          email,
          nombreCompleto,
          telefono,
          universidad,
          fechaNacimiento
        });
      });
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getUserData() {
    if (this.auth.currentUser) {
      return this.firestore.collection('users').doc(this.auth.currentUser.uid).valueChanges();
    } else {
      // Manejar el caso en que this.auth.currentUser sea nulo
      return console.log('No user logged in')
    }
  }
}
