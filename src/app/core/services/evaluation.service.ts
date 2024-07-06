// evaluation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Assurez-vous que throwError est importé correctement
import { catchError } from 'rxjs/operators';
import { Evaluation } from 'src/app/core/model/evaluation'; // Assurez-vous de l'importation correcte


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://127.0.0.1:9090/evaluation'; // Assurez-vous que l'URL correspond à votre backend


  constructor(private http: HttpClient) {}
  createEvaluation(atelierId: string, rating: number, comment: string): Observable<any> {
    const body = {
      atelierId,
      rating,
      comment
    };

    return this.http.post<any>(`${this.apiUrl}/`, body)
      .pipe(
        catchError(error => {
          console.error('Error creating evaluation:', error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }


  updateEvaluation(evaluationId: string, rating: number, comment: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}`;
    const body = { rating, comment };
    return this.http.put<any>(url, body);
  }

  deleteEvaluation(evaluationId: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}`;
    return this.http.delete<any>(url);
  }

  listAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}`);
  }

  addComment(evaluationId: string, userId: string, comment: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/comment`;
    const body = { userId, comment };
    return this.http.post<any>(url, body);
  }

  likeEvaluation(evaluationId: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/like`;
    const body = { userId };
    return this.http.post<any>(url, body);
  }

  reportEvaluation(evaluationId: string, userId: string, reason: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/report`;
    const body = { userId, reason };
    return this.http.post<any>(url, body);
  }


  addCommentReply(evaluationId: string, commentId: string, userId: string, reply: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/${commentId}/replies`;
    return this.http.post<any>(url, { userId, reply });
  }
  getEvaluation(evaluationId: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}`;
    return this.http.get<any>(url);
  }


  


  addEmojiToEvaluation(evaluationId: string, emoji: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/addEmoji`;
    return this.http.post(url, { emoji });
  }

  



  addAutoResponse(evaluationId: string, commentId: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/${commentId}/add-auto-response`;
    return this.http.post(url, {});
  }

  confirmEvaluation(evaluationId: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/confirm`;
    return this.http.put<any>(url, {}).pipe(
      catchError((error: any) => {
        console.error('An error occurred in confirmEvaluation:', error);
        return throwError(error); // Utilisation de throwError ici
      })
    );
  }

  cancelEvaluation(evaluationId: string): Observable<any> {
    const url = `${this.apiUrl}/${evaluationId}/cancel`;
    return this.http.put<any>(url, {}).pipe(
      catchError((error: any) => {
        console.error('An error occurred in cancelEvaluation:', error);
        return throwError(error); // Utilisation de throwError ici
      })
    );
  }
  // Gestion des erreurs globale
  private handleError(error: any): Observable<any> {
    console.error('An error occurred in EvaluationService:', error);
    return throwError(error); // Utilisation de throwError ici
  }

  getEvaluationById(evaluationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${evaluationId}`);
  }
  getEvaluationsByAtelierId(atelierId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/atelier/${atelierId}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des évaluations par ID d\'atelier :', error);
        return throwError(error);
      })
    );
  }








  // Confirmer une évaluation par ID d'atelier
  confirmEvaluationByAtelierId(atelierId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/atelier/${atelierId}/confirm`, {});
  }

  // Annuler une évaluation par ID d'atelier
  cancelEvaluationByAtelierId(atelierId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/atelier/${atelierId}/cancel`, {});
  }

  // Ajouter un commentaire sur une évaluation par ID d'atelier
  addCommentByAtelierId(atelierId: string, userId: string, comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/atelier/${atelierId}/comment`, { userId, comment });
  }

  // Répondre à un commentaire sur une évaluation par ID d'atelier
  addReplyToCommentByAtelierId(atelierId: string, commentId: string, userId: string, reply: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/evaluation/atelier/${atelierId}/comment/${commentId}/reply`, { userId, reply });
  }






  
}

