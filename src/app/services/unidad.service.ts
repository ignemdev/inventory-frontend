import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  readonly endpoint: string = 'https://localhost:7257/api';

  constructor(private http: HttpClient) { }

  getUnidadList(): Observable<any[]> {
    return this.http.get<any>(this.endpoint + '/unidad');
  }
}
