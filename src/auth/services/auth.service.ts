import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { error } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public resetForm!: FormGroup;
  userData: any;

  user!: Observable<User | any>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastr: ToastrService
  ) {
    /*this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        } else {
          localStorage.setItem('user', '');
          return of(null);

        }
      })
    );*/
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

  register(email: string, password: string, fName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        //console.log(result)
        this.SetUserData(result.user, fName);
      })
      .catch((error) => {
        this.toastr.error('Datos incorrectos');
      });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.UpdateUserData(result.user);
      })
      .catch((error) => {
        this.toastr.error('El usuario o la contraseña son incorrectos');
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
        //window.alert('correo de reseteo de contraseña enviado');
        this.toastr.success('Correo enviado correctamente');
      })
      .catch((error) => {
        //window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    try {
      const user = JSON.parse(localStorage.getItem('user')!);
      return true;
    } catch (e) {
      return false;
    }
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider: firebase.auth.GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          // console.log(result.user)
          this.router.navigate(['home']);
          // this.SetUserData(result.user);
        });
        // this.SetUserData(result.user);
        this.UpdateUserData(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        //window.alert(error);
      });
  }

  SetUserData(user: User | any, fName: string) {
    //console.log(user);
    const userRef: AngularFirestoreDocument<User | any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      fName: fName,
      lName: 'user.lastName',
    };
    console.log(userData);
    return userRef.set(userData, {
      merge: true,
    });
  }

  //esto es lo de actualizar usuario
  UpdateUserData(user: User | any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      fName: '',
      lName: '',
    };
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
    localStorage.setItem('user', JSON.stringify(this.user));
    return userRef.set(data, {
      merge: true,
    });
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async SignOut() {
    await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
