import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  profileForm !: FormGroup;
  navigation: NavigationExtras = {
    state: {
      value: null
    }
  }

  private isEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  constructor(public authSvc: AuthService, private _builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
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
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    })

  }

  onEdit(item: any): void {
    this.router.navigate(['edit']);
  }
}
