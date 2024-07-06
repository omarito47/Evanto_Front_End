// participation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from 'src/app/core/model/participation'; 
import { Atelier } from '../model/atelier';
import { catchError } from 'rxjs/operators'; // Assurez-vous d'importer catchError correctement
import { throwError } from 'rxjs';
import { User } from 'src/app/core/model/user';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private apiUrl = 'http://127.0.0.1:9090/participation'; // Assurez-vous que l'URL de votre API est correcte
  
  

  constructor(private http: HttpClient) {}

  // Récupérer toutes les participations
  getParticipations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  
  // Ajouter une nouvelle participation avec client_id et atelier_id
  addParticipation(client_id: string, atelier_id: string): Observable<any> {
    const participationData = { client_id, atelier_id };
    return this.http.post<any>(`${this.apiUrl}/add`, participationData);
  }

  // Mettre à jour une participation
  updateParticipation(participationId: string, updatedParticipation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/participations/${participationId}`, updatedParticipation);
  }

  // Supprimer une participation
  deleteParticipation(participationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/participations/${participationId}`);
  }

  // Confirmer une participation
  confirmParticipation(participationId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/participations/confirm/${participationId}`, {});
  }

  // Annuler une participation
  cancelParticipation(participationId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/participations/cancel/${participationId}`, {});
  }

  // Filtrer les participations par statut
  filterParticipationsByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participations/status/${status}`);
  }

  
  // Générer un graphique des statistiques de l'atelier
  generateWorkshopStatsPieChart(atelierId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/stats/chart/${atelierId}`, { responseType: 'blob' });
  }


  getWorkshopStats(atelierId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/${atelierId}`);
  }



 








  // Récupérer les participations par ID utilisateur
  getParticipationsByUserId(userId: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Récupérer les participations par ID atelier
  getParticipationsByWorkshopId(atelierId: string): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/atelier/${atelierId}`);
  }

  // Annuler une participation par ID atelier et ID participation
  cancelParticipationByWorkshopId(atelierId: string, participationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/atelier/${atelierId}/cancel/${participationId}`, {});
  }

  // Supprimer une participation par ID atelier et ID participation
  deleteParticipationByWorkshopId(atelierId: string, participationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/atelier/${atelierId}/${participationId}`);
  }


   // Exemple de récupération des détails de l'atelier associé à la participation
   getAtelierDetails(atelierId: string): Observable<Atelier> {
    return this.http.get<Atelier>(`${this.apiUrl}/atelier/${atelierId}`);
  }



  // Méthode pour supprimer une participation par ID utilisateur
  deleteParticipationByUserId(userId: string, participationId: string): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}/${participationId}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour annuler une participation par ID utilisateur avant 48 heures
  cancelParticipationByUserId(userId: string, participationId: string): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}/${participationId}/cancel`;
    return this.http.put<any>(url, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fonction de gestion des erreurs HTTP
  private handleError(error: any) {
    console.error('Erreur HTTP :', error);
    return throwError('Une erreur s\'est produite, veuillez réessayer.');
  }
}





