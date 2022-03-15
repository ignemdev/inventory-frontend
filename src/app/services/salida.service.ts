import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SalidaAdd } from '../models/salida/salida-add';

@Injectable({
  providedIn: 'root'
})

export class SalidaService {
  readonly endpoint: string = 'https://localhost:7257/api';

  constructor(private http: HttpClient) { }

  getSalidaList(): Observable<any[]> {
    return this.http.get<any>(this.endpoint + '/salida').pipe(catchError(this.handleError));
  }

  getSalidaById(id: number): Observable<any[]> {
    return this.http.get<any>(this.endpoint + `/salida/${id}`).pipe(catchError(this.handleError));
  }

  addSalida(salida: SalidaAdd) {
    return this.http.post<any>(this.endpoint + '/salida', salida).pipe(catchError(this.handleError));
  }

  handleError(res: HttpErrorResponse) {
    const { error } = res;
    return of(error);
  }
}
