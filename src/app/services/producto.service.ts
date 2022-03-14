import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<any>(this.endpoint + '/producto', producto);
  }

  editProducto(producto: ProductoEdit) {
    return this.http.put<any>(this.endpoint + '/producto', producto);
  }

  deleteProducto(id: number | string) {
    return this.http.delete(this.endpoint + `/producto/${id}`);
  }
}
