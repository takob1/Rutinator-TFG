import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/auth/services/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent implements OnInit {

  navigation: NavigationExtras = {
    state: {
      value: null
    }
  }
  constructor(public authSvc: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onEdit(item: any): void {
    this.navigation.state!.value = item;
    this.router.navigate(['perfil'], this.navigation);
  }
}
