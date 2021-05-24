import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  profileForm !: FormGroup;
  userData: any;

  private isEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  value: any;

  constructor(public authSvc: AuthService, private _builder: FormBuilder, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
    this.userData = JSON.parse(localStorage.getItem('user')!)

  }

  ngOnInit(): void {
    this.initForm();
    console.log(this.userData);
    this.profileForm.patchValue(this.userData);

  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      console.log("no valido");
    }
  }

  isValidField(field: string): string {
    const validatedFiel = this.profileForm.get(field);
    return (!validatedFiel?.valid && validatedFiel?.touched) ? 'is-invalid' : validatedFiel?.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.profileForm = this._builder.group({
      displayName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    })

  }
  onGoBack(): void {
    this.router.navigate(['home']);
  }

}
