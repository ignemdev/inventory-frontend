import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntradaAdd } from '../models/entrada/entrada-add';
import { EntradaEdit } from '../models/entrada/entrada-edit';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  readonly endpoint: string = 'https://localhost:7257/api';

  constructor(private http: HttpClient) { }

  getEntradaList(): Observable<any[]> {
    return this.http.get<any>(this.endpoint + '/entrada');
  }

  getEntradaById(id: number): Observable<any[]> {
    return this.http.get<any>(this.endpoint + `/entrada/${id}`).pipe(catchError(this.handleError));
  }

  addEntrada(entrada: EntradaAdd) {
    return this.http.post<any>(this.endpoint + '/entrada', entrada).pipe(catchError(this.handleError));
  }

  editEntrada(entrada: EntradaEdit) {
    return this.http.put<any>(this.endpoint + '/entrada', entrada).pipe(catchError(this.handleError));
  }

  deleteEntrada(id: number | string) {
    return this.http.delete(this.endpoint + `/entrada/${id}`).pipe(catchError(this.handleError));
  }

  handleError(res: HttpErrorResponse) {
    const { error } = res;
    return of(error);
  }
}
