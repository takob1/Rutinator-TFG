import { Component, OnInit } from '@angular/core';
import { CRUDejercicioService } from '../../compartido/crudejercicio.service';
import { CrudrutinaService } from '../../compartido/crudrutina.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Ejercicio } from 'src/compartido/ejercicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rutina } from 'src/compartido/rutina';

@Component({
  selector: 'app-add-rutina',
  templateUrl: './add-rutina.component.html',
  styleUrls: ['./add-rutina.component.css'],
})
export class AddRutinaComponent implements OnInit {
  isLinear = true;
  datos = {
    name: String,
    description: String,
    time: Number,
    dificultad: String,
  };
  ejercicios$ = this.crudApi.ejercicios;
  public firstFormGroup!: FormGroup;
  ej!: Ejercicio[];

  ejercicioRutina: Ejercicio[] = [];
  ejercicioRutina2: Ejercicio[] = [];

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public crudApi: CRUDejercicioService,
    public crudApiRutina: CrudrutinaService,
    public toastr: ToastrService
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
      dificultad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get name() {
    return this.firstFormGroup.get('name');
  }

  get description() {
    return this.firstFormGroup.get('description');
  }

  get time() {
    return this.firstFormGroup.get('time');
  }

  get dificultad() {
    return this.firstFormGroup.get('dificultad');
  }

  ResetForm() {
    this.firstFormGroup.reset();
  }
  saveData() {
    this.datos = this.firstFormGroup.value;
    console.log(this.datos);
  }
  guardarDatos() {
    this.ejercicioRutina2 = this.ejercicioRutina;
  }

  formatLabel(value: number) {
    if (value >= 11) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  submitRutinaData() {
    this.crudApiRutina.AddRutina(
      this.firstFormGroup.value,
      this.ejercicioRutina
    );
    this.toastr.success(
      this.firstFormGroup.controls['name'].value + ' successfully added!'
    );
    this.router.navigate(['home']);
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
      console.log(this.ejercicioRutina2);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
