// categorie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'http://127.0.0.1:9090/categorie';

  constructor(private http: HttpClient) {}

  addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie);
  }

  fetchAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  update(id: string, categorie: Categorie): Observable<Categorie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Categorie>(url, categorie);
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  search(query: string): Observable<Categorie[]> {
    const url = `${this.apiUrl}/search?q=${query}`;
    return this.http.get<Categorie[]>(url);
  }

  archiveCategory(id: string): Observable<Categorie> {
    const url = `${this.apiUrl}/archive/${id}`;
    return this.http.put<Categorie>(url, null);
  }

  restoreCategory(id: string): Observable<Categorie> {
    const url = `${this.apiUrl}/restore/${id}`;
    return this.http.put<Categorie>(url, null);
  }

  getArchivedCategories(): Observable<Categorie[]> {
    const url = `${this.apiUrl}/archived`;
    return this.http.get<Categorie[]>(url);
  }
}
