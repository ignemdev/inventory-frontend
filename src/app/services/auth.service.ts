import { Injectable } from '@angular/core';
import { from, Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UsuarioLogin } from '../models/auth/usuario-login';
import { UsuarioRegister } from '../models/auth/usuario-register';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  readonly endpoint: string = 'https://localhost:7257/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  // Sign-up
  signUp(user: UsuarioRegister) {
    let api = `${this.endpoint}/usuario/register`;
    return this.http.post<any>(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: UsuarioLogin) {
    let api = `${this.endpoint}/usuario/login`;
    return this.http.post<any>(api, user).pipe(catchError(this.handleError));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUsername() {
    return localStorage.getItem('user_name');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUsername = localStorage.removeItem('user_name');
    if (removeToken == null && removeUsername == null) {
      this.router.navigate(['login']);
    }
  }

  handleError(res: HttpErrorResponse) {
    const { error } = res;
    return of(error);
  }
}