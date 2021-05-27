import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { CrudrutinaService } from 'src/compartido/crudrutina.service';
import { Ejercicio } from 'src/compartido/ejercicio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  rutinas$ = this.rutinaService.rutinas;

  constructor(
    public authSvc: AuthService,
    private _builder: FormBuilder,
    private router: Router,
    private rutinaService: CrudrutinaService
  ) {}

  ngOnInit(): void {
    // this.initForm();
  }
}
