import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { CrudrutinaService } from 'src/compartido/crudrutina.service';
import { User } from '../services/user';
import { Rutina } from '../../compartido/rutina';
import { ToastrService } from 'ngx-toastr';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  rutinas$ = this.rutinaService.rutinas2$;
  items2!: Observable<any>;
  navigationExtras?: NavigationExtras = {
    state: {
      value: null,
    },
  };

  profileForm!: FormGroup;

  userData: any;

  private isEmail =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  value: any;

  constructor(
    public authSvc: AuthService,
    private _builder: FormBuilder,
    private router: Router,
    public toastr: ToastrService,
    private rutinaService: CrudrutinaService,
    public afs: AngularFirestore
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
    this.userData = JSON.parse(localStorage.getItem('user')!);
    console.log("dmMOnye");
    console.log(this.userData);
    this.rutinas$ = this.rutinaService.rutinas2$;
  }

  ngOnInit(): void {
    this.initForm();
    console.log("em el init form");
    console.log(this.userData);
    // this.userData = ;
    this.getUser()
    console.log(this.userData);

    this.rutinas$ = this.rutinaService.rutinas2$;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      console.log('no valido');
    }
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  isValidField(field: string): string {
    const validatedFiel = this.profileForm.get(field);
    return !validatedFiel?.valid && validatedFiel?.touched
      ? 'is-invalid'
      : validatedFiel?.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.profileForm = this._builder.group({
      displayName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      fName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    });
  }
  onGoBack(): void {
    this.router.navigate(['home']);
  }

  edit(item: any): void {
    this.navigationExtras!.state!.value = item;
    this.router.navigate(['edit-rutina'], this.navigationExtras);
  }

  async delete(id: string): Promise<void> {
    try {
      await this.rutinaService.deleteRutina(id);
      this.toastr.error('Rutina eliminado correctamente');
    } catch (err) {
      console.log(err);
    }
  }
  getUser(): void {
    this.items2 = this.afs.collection('users').doc(this.userData.uid).valueChanges();
    this.items2.subscribe((user2) => {
      if (user2) {
        this.userData = user2;
        this.profileForm.patchValue(this.userData);
      } else {
        //return "fuck";
        console.log('NOPE');
      }
    });
  }
}
