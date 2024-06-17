import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atelier } from '../model/atelier';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  private apiUrl = 'http://127.0.0.1:9090/atelier';// Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(`${this.apiUrl}/getAll`);
  }


  updateAtelier(id: string, atelier: Atelier): Observable<Atelier> {
    const url = `${this.apiUrl}/update/${id}`; // URL complète avec l'ID
    return this.http.put<Atelier>(url, atelier);
  }


  addAtelier(atelier: Atelier): Observable<Atelier> {
    return this.http.post<Atelier>(`${this.apiUrl}/add`, atelier); // URL pour ajouter un atelier
  }

  deleteAtelier(id: string): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

  getAtelier(id: string): Observable<Atelier> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Atelier>(url);
  }



   // Nouvelle méthode pour exporter les ateliers en PDF
   exportAteliersToPDF(): Observable<Blob> {
    
  return this.http.get(`${this.apiUrl}/ateliers/exporter-pdf`, { responseType: 'blob' });
}

  


  // Méthode pour trier les ateliers par date de début
  trierAteliersParDateDebut(): Observable<Atelier[]> {
    return this.http.get<Atelier[]>(`${this.apiUrl}/ateliers/trier-par-date`);
  }

  // Autres méthodes CRUD pour les ateliers...
}

  








