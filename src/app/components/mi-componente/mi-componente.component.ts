import { Component } from '@angular/core';

@Component({
    selector: 'mi-componente',
    template: `
        <h1>Soy un componente</h1>
        <p>bienvenido {{nombre}}</p>
        <p>tienes: {{edad}}</p>`
})

export class MiComponente {
    public nombre: String;
    public edad: number;
    // public ciclos: Array;


    constructor() {
        this.nombre = 'Luis fernando Taco Bautista';
        this.edad = 20;
        console.log("componente cargado");
    }
}