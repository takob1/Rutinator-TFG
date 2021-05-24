import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from '../../compartido/ejercicio';
import { CRUDejercicioService } from '../../compartido/crudejercicio.service';
import { NavigationExtras, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-list-ejercicio',
  templateUrl: './list-ejercicio.component.html',
  styleUrls: ['./list-ejercicio.component.css'],
})
export class ListEjercicioComponent implements OnInit {
  ejercicios$ = this.crudApi.ejercicios;

  navigationExtras?: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(
    private router: Router,
    public crudApi: CRUDejercicioService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  edit(item: any): void {
    this.navigationExtras!.state!.value = item;
    this.router.navigate(['edit-exercise'], this.navigationExtras);
  }
  detail(item: any): void {
    this.navigationExtras!.state!.value = item;
    this.router.navigate(['home'], this.navigationExtras);
  }
  async delete(id: string): Promise<void> {
    try {
      await this.crudApi.deleteEjercicio(id);
      this.toastr.error('Ejercicio eliminado correctamente');
    } catch (err) {
      console.log(err);
    }
  }
}
