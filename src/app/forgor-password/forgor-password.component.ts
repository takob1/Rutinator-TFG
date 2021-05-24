import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/services/auth.service';

@Component({
  selector: 'app-forgor-password',
  templateUrl: './forgor-password.component.html',
  styleUrls: ['./forgor-password.component.css'],
})
export class ForgorPasswordComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
