// participation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from '../model/participation'; // Assurez-vous d'importer le modèle de Participation si nécessaire

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private apiUrl = 'http://127.0.0.1:9090/participation'; // Assurez-vous que l'URL de votre API est correcte

  constructor(private http: HttpClient) { }

  // Ajouter une participation
  ajouterParticipation(userId: string, atelierId: string, categorieId: string): Observable<any> {
    const body = { userId, atelierId, categorieId };
    return this.http.post<any>(`${this.apiUrl}/add`, body);
  }

  // Obtenir toutes les participations
  getParticipations(): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/`);
  }

  supprimerParticipation(participationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${participationId}`);
  }

  modifierParticipation(participationId: string, updatedData: any): Observable<Participation> {
    return this.http.put<Participation>(`${this.apiUrl}/${participationId}`, updatedData);
  }


  // Filtrer les participations par statut
  filtrerParticipationsParStatut(status: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/${status}`);
  }


// Générer le graphique des statistiques de l'atelier
generateWorkshopStatsPieChart(atelierId: string): Observable<Blob> {
  return this.http.get(`${this.apiUrl}/stats/chart/${atelierId}`, { responseType: 'blob' });
}

// // Générer le fichier CSV des statistiques de l'atelier
// generateWorkshopStatsCSV(atelierId: string): Observable<Blob> {
//   return this.http.get(`${this.apiUrl}/stats/csv/${atelierId}`, { responseType: 'blob' });
// }
 // Obtenir les statistiques de l'atelier
 getWorkshopStats(atelierId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/stats/${atelierId}`);
}



}