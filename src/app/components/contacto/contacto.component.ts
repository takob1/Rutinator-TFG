import { Component, OnInit } from '@angular/core';
import { EquipoService } from './../../equipo.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  equipo: any[] = [];

  constructor(private _sservicio: EquipoService) {
    this.equipo = _sservicio.obtener();
  }

  ngOnInit(): void {
  }

}
