import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<any>(this.endpoint + `/entrada/${id}`);
  }

  addEntrada(entrada: EntradaAdd) {
    return this.http.post<any>(this.endpoint + '/entrada', entrada);
  }

  editEntrada(entrada: EntradaEdit) {
    return this.http.put<any>(this.endpoint + '/entrada', entrada);
  }

  deleteEntrada(id: number | string) {
    return this.http.delete(this.endpoint + `/entrada/${id}`);
  }
}
