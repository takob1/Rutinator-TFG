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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
// import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../auth/services/auth.service';
import { PerfilComponent } from 'src/auth/perfil/perfil.component';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ForgorPasswordComponent } from './forgor-password/forgor-password.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { AddRutinaComponent } from './add-rutina/add-rutina.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'create-exercise',
    component: AddEjercicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-exercise',
    component: EditEjercicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-exercise',
    component: ListEjercicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-rutina',
    component: AddRutinaComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgorPasswordComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
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
    ForgorPasswordComponent,
    AddRutinaComponent,
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
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    DragDropModule,
    MatStepperModule,
    MatSliderModule,
    // AngularFirestore,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
