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
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CRUDejercicioService {
  ejercicios!: Observable<Ejercicio[]>;

  ejerciciosCollection!: AngularFirestoreCollection<Ejercicio>;
  ejercicioRef: any;

  constructor(private db: AngularFireDatabase, public afs: AngularFirestore) {
    this.ejerciciosCollection = afs.collection<Ejercicio>('ejercicio');
    this.getListaEjercicios();
  }

  AddEjercicio(ejercicio: Ejercicio | any, workarea: any, execiseImage: any) {
    const id = this.afs.createId();
    const ejerciciosRef: AngularFirestoreDocument<any> = this.afs.doc(
      `ejercicio/${id}`
    );
    const ejercicioData: Ejercicio = {
      $id: id,
      name: ejercicio.name,
      description: ejercicio.description,
      image: execiseImage,
      time_rep: ejercicio.time_rep,
      work_area: workarea,
    };
    return ejerciciosRef.set(ejercicioData, {
      merge: true,
    });
  }

  checkCheckBoxvalue(event: { checked: any }) {
    console.log(event.checked);
  }
  //buscar un ejercicio
  getEjercicio(id: string) {
    // this.ejercicioRef = this.db.object('ejercicios/' + id);
    // return this.ejercicioRef;
  }

  //buscar todos los ejercios
  getListaEjercicios() {
    this.ejercicios = this.ejerciciosCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Ejercicio))
      );
    // this.ejerciciosRef = this.db.list('ejercicios');
    // return this.ejerciciosRef;
  }

  //actualizar un ejercicio
  updateEjercicio(
    ejercicio: Ejercicio | any,
    ejId: string,
    workarea: any,
    execiseImage: any
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = ejId;
        const data: Ejercicio = {
          $id: id,
          name: ejercicio.name,
          description: ejercicio.description,
          image: execiseImage,
          time_rep: ejercicio.time_rep,
          work_area: workarea,
        };
        const result = await this.ejerciciosCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
    // this.ejercicioRef.update({
    //   name: ejercicio.name,
    //   description: ejercicio.description,
    //   image: ejercicio.image,
    //   time_rep: ejercicio.time_rep,
    //   work_area: {},
    // });
  }

  //borrar un ejercicio
  deleteEjercicio(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.ejerciciosCollection.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
    // this.ejercicioRef = this.db.object('ejercicios/' + id);
    // this.ejercicioRef.remove();
  }
}
