import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';

const routes: Routes = [{ path: '', component: PerfilComponent }];

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PerfilModule {}
