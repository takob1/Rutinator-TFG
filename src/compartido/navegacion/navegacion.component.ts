import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/services/auth.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent implements OnInit {
  constructor(public authSvc: AuthService) {}

  ngOnInit(): void {}
}
