import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  path: string = '';
  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    });
  }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.path}/products`, {
      headers: this.getHeaders(),
    });
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.path}/products`, product, {
      headers: this.getHeaders(),
    });
  }

  putProduct(product: Product) {
    return this.http.put(`${this.path}/products`, product, {
      headers: this.getHeaders(),
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.path}/products/${id}`, {
      headers: this.getHeaders(),
    });
  }

}
