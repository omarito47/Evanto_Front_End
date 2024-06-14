import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:8000/';
  apiUrlProducts: string = this.baseUrl + 'products/';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<{ data: Product[] }>(this.apiUrlProducts);
  }
  getProductById(id: string) {
    return this.http.get<{ data: Product }>(this.apiUrlProducts + id);
  }
  addProduct(body: Product) {
    return this.http.post(this.apiUrlProducts, body);
  }
  updateProduct(id: string, body: Product) {
    return this.http.put(this.apiUrlProducts + id, body);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.apiUrlProducts + id);
  }
  chercherProduct(key: string) {
    return this.http.get<Product[]>(this.apiUrlProducts + 'search/' + key);
  }
}
