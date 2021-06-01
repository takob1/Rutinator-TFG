import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CRUDejercicioService } from 'src/compartido/crudejercicio.service';
import { CrudrutinaService } from 'src/compartido/crudrutina.service';
import { Ejercicio } from 'src/compartido/ejercicio';
import { Rutina } from 'src/compartido/rutina';

@Component({
  selector: 'app-edit-rutina',
  templateUrl: './edit-rutina.component.html',
  styleUrls: ['./edit-rutina.component.css'],
})
export class EditRutinaComponent implements OnInit {
  rutina: Rutina;

  ejercicios$ = this.crudApi.ejercicios;
  public firstFormGroup!: FormGroup;
  ej!: Ejercicio[];

  ejercicioRutina: Ejercicio[] = [];

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public crudApi: CRUDejercicioService,
    public crudApiRutina: CrudrutinaService,
    public toastr: ToastrService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.rutina = navigation?.extras?.state?.value;
  }

  ngOnInit(): void {
    this.crudApi.ejercicios.subscribe((exercise: any) => {
      this.ej = exercise;
    });

    this.ejercicioFormulario();

    if (typeof this.rutina === 'undefined') {
      this.router.navigate(['add-rutina']);
    } else {
      this.firstFormGroup.patchValue(this.rutina);
    }
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
    console.log(this.firstFormGroup.value);
  }

  formatLabel(value: number) {
    if (value >= 11) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  submitRutinaData() {
    this.crudApiRutina.updateRutina(
      this.firstFormGroup.value,
      this.ejercicioRutina,
      this.rutina.$id
    );
    this.toastr.success(
      this.firstFormGroup.controls['name'].value + ' successfully added!'
    );
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
