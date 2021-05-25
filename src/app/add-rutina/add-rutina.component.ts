import { Component, OnInit } from '@angular/core';
import { CRUDejercicioService } from '../../compartido/crudejercicio.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Ejercicio } from 'src/compartido/ejercicio';

@Component({
  selector: 'app-add-rutina',
  templateUrl: './add-rutina.component.html',
  styleUrls: ['./add-rutina.component.css'],
})
export class AddRutinaComponent implements OnInit {
  ejercicios$ = this.crudApi.ejercicios;

  ej!: Ejercicio[];
  // ejercicios$ = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // ejercicioRutina!: Ejercicio[];

  ejercicioRutina: Ejercicio[] = [];

  constructor(
    private router: Router,
    public crudApi: CRUDejercicioService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.crudApi.ejercicios.subscribe((exercise: any) => {
      this.ej = exercise;
    });
  }

  onDropped(event: CdkDragDrop<any>) {
    console.log(event.previousContainer);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
