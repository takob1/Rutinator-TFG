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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rutina',
  templateUrl: './add-rutina.component.html',
  styleUrls: ['./add-rutina.component.css'],
})
export class AddRutinaComponent implements OnInit {
  ejercicios$ = this.crudApi.ejercicios;
  public firstFormGroup!: FormGroup;
  ej!: Ejercicio[];

  // ejercicios$ = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // ejercicioRutina!: Ejercicio[];

  ejercicioRutina: Ejercicio[] = [];

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public crudApi: CRUDejercicioService,
    public toastr: ToastrService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crudApi.ejercicios.subscribe((exercise: any) => {
      this.ej = exercise;
    });

    this.ejercicioFormulario();
  }

  isValidField(field: string): string {
    const validatedFiel = this.firstFormGroup.get(field);
    return !validatedFiel?.valid && validatedFiel?.touched
      ? 'is-invalid'
      : validatedFiel?.touched
      ? 'is-valid'
      : '';
  }

  ejercicioFormulario() {
    this.firstFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      time: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get name() {
    return this.firstFormGroup.get('name');
  }

  saveData() {
    console.log(this.firstFormGroup.value);
  }

  saveEx() {}

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
