import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicio';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Rutina } from './rutina';
import { AuthService } from 'src/auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/auth/services/user';

@Injectable({
  providedIn: 'root',
})
export class CrudrutinaService {
  rutinas!: Observable<Rutina[]>;
  rutinas2$!: Observable<Rutina[]>;

  RutinaCollection$!: AngularFirestoreCollection<Rutina>;
  RutinaCollection!: AngularFirestoreCollection<Rutina>;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public afs: AngularFirestore,
    public authSvc: AuthService
  ) {
    this.RutinaCollection = afs.collection<Rutina>('rutinas');
    this.RutinaCollection$ = afs.collection<Rutina>('rutinas', (ref) =>
      ref.where('uid', '==', this.getCurrentUserUid())
    );

    this.getListaRutinas();
    this.getListaRutinasfiltro();
  }

  AddRutina(rutina: Rutina | any, ejercicios: Ejercicio[]) {
    var user = this.getCurrentUser();

    const id = this.afs.createId();
    const rutinaRef: AngularFirestoreDocument<any> = this.afs.doc(
      `rutinas/${id}`
    );
    const rutinaData: Rutina = {
      $id: id,
      Owner_image: user.photoURL,
      Owner_name: user.displayName,
      dificultad: rutina.dificultad,
      name: rutina.name,
      time: rutina.time,
      description: rutina.description,
      exercises: ejercicios,
      uid: user.uid,
    };
    return rutinaRef.set(rutinaData, {
      merge: true,
    });

    console.log(rutina, ejercicios, user.displayName, user.uid);
  }

  getCurrentUser() {
    var usuario: User = JSON.parse(localStorage.getItem('user')!);

    return usuario;
  }

  getListaRutinas() {
    this.rutinas = this.RutinaCollection.snapshotChanges().pipe(
      map((actions) => actions.map((a) => a.payload.doc.data() as Rutina))
    );
  }

  getCurrentUserUid() {
    var usuario: User = JSON.parse(localStorage.getItem('user')!);

    console.log(usuario.uid);
    return usuario.uid;
  }

  getListaRutinasfiltro() {
    this.rutinas2$ = this.RutinaCollection$.snapshotChanges().pipe(
      map((actions) => actions.map((a) => a.payload.doc.data() as Rutina))
    );
  }

  getByUserRef(uid: string) {
    return (this.RutinaCollection = this.afs.collection('rutinas', (ref) =>
      ref.where('uid', '==', uid)
    ));
  }
}
