import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalidaAdd } from '../models/salida/salida-add';

@Injectable({
  providedIn: 'root'
})

export class SalidaService {
  readonly endpoint: string = 'https://localhost:7257/api';

  constructor(private http: HttpClient) { }

  getSalidaList(): Observable<any[]> {
    return this.http.get<any>(this.endpoint + '/salida');
  }

  getSalidaById(id: number): Observable<any[]> {
    return this.http.get<any>(this.endpoint + `/salida/${id}`);
  }

  addSalida(salida: SalidaAdd) {
    return this.http.post<any>(this.endpoint + '/salida', salida);
  }
}
