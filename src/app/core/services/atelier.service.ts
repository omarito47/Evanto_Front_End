import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Atelier } from '../model/atelier';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  private apiUrl = 'http://127.0.0.1:9090/atelier/'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(`${this.apiUrl}/getAll`);
  }

  updateAtelier(id: string, formData: FormData): Observable<Atelier> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<Atelier>(url, formData)
      .pipe(catchError(this.handleError));
  }

  addAtelier(formData: FormData): Observable<Atelier> {
    return this.http.post<Atelier>(`${this.apiUrl}/add`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteAtelier(id: string): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  getAtelier(id: string): Observable<Atelier> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Atelier>(url)
      .pipe(catchError(this.handleError));
  }

  exportAteliersToPDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ateliers/exporter-pdf`, { responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  trierAteliersParDateDebut(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(`${this.apiUrl}/ateliers/trier-par-date`)
      .pipe(catchError(this.handleError));
  }

  getAdminDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`)
      .pipe(catchError(this.handleError));
  }

  regrouperAteliersParLieu(): Observable<any> {
    const url = `${this.apiUrl}/ateliers-par-lieu`;
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  getCalendrierAteliers(): Observable<any[]> {
    const url = `${this.apiUrl}/calendrier`;
    return this.http.get<any[]>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur:', error);
    return throwError('Erreur lors de la récupération des données, veuillez réessayer plus tard.');
  }

  
  getNomAtelier(id: string): Observable<{ nom: string }> {
    return this.http.get<{ nom: string }>(`${this.apiUrl}/atelier/nom/${id}`);
  }
}
  

