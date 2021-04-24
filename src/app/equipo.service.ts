import { isLoweredSymbol } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  equipo: any[] = [
    {
      nombre: 'ignacio',
      edad: 20,
      descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Ullam consectetur odio officia fuga.Nostrum tenetur, nobis unde aliquid itaque placeat consequuntur eius soluta similique magni, dolore veniam corrupti voluptatum obcaecati.'

    },
    {
      nombre: 'Fernando',
      edad: 21,
      descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Ullam consectetur odio officia fuga.Nostrum tenetur, nobis unde aliquid itaque placeat consequuntur eius soluta similique magni, dolore veniam corrupti voluptatum obcaecati.'

    }
  ]

  constructor() {
    console.log('funcionando service');
  }

  obtener() {
    return this.equipo;
  }
}
