import { Component, OnInit, ViewChildren } from '@angular/core';
import { CRUDejercicioService } from '../../compartido/crudejercicio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { viewClassName } from '@angular/compiler';
import { QueryList } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-ejercicio',
  templateUrl: './add-ejercicio.component.html',
  styleUrls: ['./add-ejercicio.component.css'],
})
export class AddEjercicioComponent implements OnInit {
  @ViewChildren('inputs') checkboxes!: QueryList<ElementRef>;
  public ejercicioForm!: FormGroup;
  selectedFile!: File;
  downloadURL!: Observable<string>;
  sb: any;

  zonas = [
    'hombro',
    'pecho',
    'espalda',
    'biceps',
    'triceps',
    'antebrazo',
    'abdomen',
    'lumbar',
    'gluteo',
    'cuadriceps',
    'gemelos',
  ];

  zonasEjercitadas: string[] = [];

  onCheck(evt: string) {
    //this.crudApi.AddEjercicio
    if (!this.zonasEjercitadas.includes(evt)) {
      this.zonasEjercitadas.push(evt);
    } else {
      var index = this.zonasEjercitadas.indexOf(evt);
      if (index > -1) {
        this.zonasEjercitadas.splice(index, 1);
      }
    }
    console.log(this.zonasEjercitadas);
  }

  constructor(
    public crudApi: CRUDejercicioService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.crudApi.getListaEjercicios();
    this.ejercicioFormulario();
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `ejercicioImage/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`ejercicioImage/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.sb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  isValidField(field: string): string {
    const validatedFiel = this.ejercicioForm.get(field);
    return !validatedFiel?.valid && validatedFiel?.touched
      ? 'is-invalid'
      : validatedFiel?.touched
      ? 'is-valid'
      : '';
  }

  uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }

  ejercicioFormulario() {
    this.ejercicioForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      image: ['', Validators.required],
      time_rep: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get name() {
    return this.ejercicioForm.get('name');
  }

  get description() {
    return this.ejercicioForm.get('description');
  }

  get time_rep() {
    return this.ejercicioForm.get('time_rep');
  }

  get zona() {
    return this.ejercicioForm.get('zone');
  }

  ResetForm() {
    this.ejercicioForm.reset();
    this.zonasEjercitadas = [];
    this.uncheckAll();
  }

  submitEjercicioData() {
    this.crudApi.AddEjercicio(
      this.ejercicioForm.value,
      this.zonasEjercitadas,
      this.sb
    );
    this.toastr.success(
      this.ejercicioForm.controls['name'].value + ' successfully added!'
    );
    this.ResetForm();
    //this.ejercicioForm.reset
  }

  getSliderValue(event: Event) {
    console.log(event.target);
  }
}
