import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { error } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user') ?? '');
      } else {
        localStorage.setItem('user', '');
        //JSON.parse(localStorage.getItem('user') ?? '');
      }
    });
  }

  register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        //window.alert(error.message);
      });
  }

  SendVerificationMail() {
    firebase
      .auth()
      .currentUser?.sendEmailVerification()
      .then(() => {
        this.router.navigate(['home']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('correo de reseteo de contraseña enviado');
      })
      .catch((error) => {
        //window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider: firebase.auth.GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        //window.alert(error);
      });
  }

  SetUserData(user: User | any) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  UpdateUserData(user: User | any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const extra = {
      tag: 'braylout',
      rutinas: {
        rutina1: {
          ejercicio1: 1,
          ejercicio2: 2,
        },
        rutina2: {
          ejercicio1: 1,
          ejercicio2: 2,
        },
      },
    };
    return userRef.set(extra, {
      merge: true,
    });
  }

  //esto es lo de actualizar usuario
  UpdateUserData(user: User | any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const extra = {
      tag: 'braylout',
      rutinas: {
        rutina1: {
          ejercicio1: 1,
          ejercicio2: 2,
        },
        rutina2: {
          ejercicio1: 1,
          ejercicio2: 2,
        },
      },
    };
    return userRef.set(extra, {
      merge: true,
    });
  }

  async SignOut() {
    await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
