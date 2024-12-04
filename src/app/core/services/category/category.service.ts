import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = 'http://localhost:9090/';
  apiUrlCategorys: string = this.baseUrl + 'categories/';
  constructor(private http: HttpClient) {}
  getAllCategorys() {
    return this.http.get<{ data: Category[] }>(this.apiUrlCategorys);
  }
  getCategoryById(id: string) {
    return this.http.get<{ data: Category }>(this.apiUrlCategorys + id);
  }
  addCategory(body: FormData) {
    return this.http.post(this.apiUrlCategorys, body);
  }
  updateCategory(id: string, body: FormData) {
    return this.http.put(this.apiUrlCategorys + id, body);
  }

  deleteCategory(id: string) {
    return this.http.delete(this.apiUrlCategorys + id);
  }
}
