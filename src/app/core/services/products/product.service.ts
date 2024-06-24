import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:8000/';
  apiUrlProducts: string = this.baseUrl + 'products/';

  constructor(private http: HttpClient) {}

  getAllProducts(
    page: number,
    limit: number,
    filters?: { category: string[] }
  ) {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<{ data: Product[]; paginationResult: any }>(
      this.apiUrlProducts,
      { params }
    );
  }
  getProductById(id: string) {
    return this.http.get<{ data: Product }>(this.apiUrlProducts + id);
  }
  addProduct(body: FormData) {
    return this.http.post(this.apiUrlProducts, body);
  }
  updateProduct(id: string, body: FormData) {
    return this.http.put(this.apiUrlProducts + id, body);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.apiUrlProducts + id);
  }
  chercherProduct(key: string) {
    return this.http.get<Product[]>(this.apiUrlProducts + 'search/' + key);
  }
}
