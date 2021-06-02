import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { CrudrutinaService } from 'src/compartido/crudrutina.service';
import { Ejercicio } from 'src/compartido/ejercicio';
import { Rutina } from 'src/compartido/rutina';
@Component({
  selector: 'app-list-ejercicio-sort-desc',
  templateUrl: './list-ejercicio-sort-desc.component.html',
  styleUrls: ['./list-ejercicio-sort-desc.component.css'],
})
export class ListEjercicioSortDescComponent implements OnInit {
  rutinas$ = this.rutinaService.rutinaDesc;

  rut!: Rutina[];

  constructor(
    public authSvc: AuthService,
    private _builder: FormBuilder,
    private router: Router,
    private rutinaService: CrudrutinaService
  ) {}
  @Input()
  searchModel!: string;

  @Output()
  public select: EventEmitter<{}> = new EventEmitter();

  ngOnInit(): void {
    this.rutinas$.subscribe((rutina: any) => {
      this.rut = rutina;
    });
  }
}
