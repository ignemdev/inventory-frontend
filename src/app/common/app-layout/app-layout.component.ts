import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})

export class AppLayoutComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.doLogout()
  }
}
