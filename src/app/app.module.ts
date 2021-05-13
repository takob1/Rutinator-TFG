import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { NavegacionComponent } from '../compartido/navegacion/navegacion.component';
import { HomeComponent } from '../home/home.component';
import { AppComponent } from './app.component';
import { AddEjercicioComponent } from './add-ejercicio/add-ejercicio.component';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';
import { ListEjercicioComponent } from './list-ejercicio/list-ejercicio.component';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from '../auth/services/auth.service';
import { PerfilComponent } from 'src/auth/perfil/perfil.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-exercise', component: AddEjercicioComponent },
  { path: 'edit-exercise', component: EditEjercicioComponent },
  { path: 'list-exercise', component: EditEjercicioComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddEjercicioComponent,
    EditEjercicioComponent,
    ListEjercicioComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
