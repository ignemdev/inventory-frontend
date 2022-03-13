import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UsuarioLogin } from '../models/auth/usuario-login';
import { UsuarioRegister } from '../models/auth/usuario-register';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'https://localhost:7257/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) { }

  // Sign-up
  signUp(user: UsuarioRegister): Observable<any> {
    let api = `${this.endpoint}/usuario/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: UsuarioLogin) {
    return this.http
      .post<any>(`${this.endpoint}/usuario/login`, user)
      .subscribe((res: any) => {
        const { data: { token } } = res;
        localStorage.setItem('access_token', token);
        this.router.navigate(['productos']);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}