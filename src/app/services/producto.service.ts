import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductoAdd } from '../models/producto/producto-add';
import { ProductoEdit } from '../models/producto/producto-edit';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  readonly endpoint: string = 'https://localhost:7257/api';

  constructor(private http: HttpClient) { }

  getProductoList(): Observable<any[]> {
    return this.http.get<any>(this.endpoint + '/producto');
  }

  getProductoById(id: number): Observable<any[]> {
    return this.http.get<any>(this.endpoint + `/producto/${id}`);
  }

  addProducto(producto: ProductoAdd) {
    return this.http.post<any>(this.endpoint + '/producto', producto).pipe(catchError(this.handleError));
  }

  editProducto(producto: ProductoEdit) {
    return this.http.put<any>(this.endpoint + '/producto', producto).pipe(catchError(this.handleError));
  }

  deleteProducto(id: number | string) {
    return this.http.delete(this.endpoint + `/producto/${id}`).pipe(catchError(this.handleError));
  }

  getProductoEntradasById(id: number): Observable<any[]> {
    return this.http.get<any>(this.endpoint + `/producto/${id}/entradas`).pipe(catchError(this.handleError));
  }

  getProductoSalidasById(id: number): Observable<any[]> {
    return this.http.get<any>(this.endpoint + `/producto/${id}/salidas`).pipe(catchError(this.handleError));
  }

  handleError(res: HttpErrorResponse) {
    const { error } = res;
    return of(error);
  }
}
