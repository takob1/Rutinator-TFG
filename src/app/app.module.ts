import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PerfilComponent } from 'src/auth/perfil/perfil.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { NavegacionComponent } from '../compartido/navegacion/navegacion.component';
import { HomeComponent } from '../home/home.component';
import { AddEjercicioComponent } from './add-ejercicio/add-ejercicio.component';
import { AddRutinaComponent } from './add-rutina/add-rutina.component';
import { AppComponent } from './app.component';
import { EditEjercicioComponent } from './edit-ejercicio/edit-ejercicio.component';
import { ForgorPasswordComponent } from './forgor-password/forgor-password.component';
import { ListEjercicioComponent } from './list-ejercicio/list-ejercicio.component';
import { SearchFilterPipe } from './search-filter.pipe';

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
    SearchFilterPipe,
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
