import { Injectable } from '@angular/core';
import { Ejercicio } from './ejercicio';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CRUDejercicioService {
  // ejerciciosRef: any;
  // ejercicioRef: any;

  constructor(private db: AngularFireDatabase, public afs: AngularFirestore) {}

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
    // this.ejerciciosRef = this.db.list('ejercicios');
    // return this.ejerciciosRef;
  }

  //actualizar un ejercicio
  updateEjercicio(ejercicio: Ejercicio) {
    // this.ejercicioRef.update({
    //   name: ejercicio.name,
    //   description: ejercicio.description,
    //   image: ejercicio.image,
    //   time_rep: ejercicio.time_rep,
    //   work_area: {},
    // });
  }

  //borrar un ejercicio
  deleteEjercicio(id: string) {
    // this.ejercicioRef = this.db.object('ejercicios/' + id);
    // this.ejercicioRef.remove();
  }
}
