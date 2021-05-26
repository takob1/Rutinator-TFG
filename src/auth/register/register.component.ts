import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private isEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  /*registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });*/

  constructor(private authSvc: AuthService, private _builder: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  isValidField(field: string): string {
    const validatedFiel = this.registerForm.get(field);
    return !validatedFiel?.valid && validatedFiel?.touched
      ? 'is-invalid'
      : validatedFiel?.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.registerForm = this._builder.group({
      displayName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    });
  }

  onRegister() {
    //const { email, password } = this.registerForm.value;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authSvc.register(this.registerForm.value);
    } else {
      console.log('no valido');
    }

  }
}
