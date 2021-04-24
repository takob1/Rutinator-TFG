import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { FooterComponent } from './components/footer/footer.component';
import { CuerpoComponent } from './components/cuerpo/cuerpo.component';
import { Cuerpo2Component } from './components/cuerpo2/cuerpo2.component';
import { ContactoComponent } from './components/contacto/contacto.component';


//SERVUICIOS
import { EquipoService } from './equipo.service';

const routes: Routes = [
  { path: 'contacto', component: ContactoComponent },
  { path: 'cuerpo', component: CuerpoComponent },
  { path: '', component: Cuerpo2Component, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MiComponente,
    EncabezadoComponent,
    FooterComponent,
    CuerpoComponent,
    Cuerpo2Component,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    EquipoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
