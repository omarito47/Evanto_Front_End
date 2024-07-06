// services/quiz.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/core/model/quiz';
import { catchError } from 'rxjs/operators'; // Assurez-vous d'importer catchError correctement
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:9090/quizze';

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}`);
  }

  getQuizzesByAtelier(atelierId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/atelier/${atelierId}`);
  }

  checkAnswer(quizId: string, userAnswer: string): Observable<{ correct: boolean }> {
    return this.http.post<{ correct: boolean }>(`${this.baseUrl}/${quizId}`, { userAnswer });
  }
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.baseUrl, quiz);
  }

  createQuiz(atelierId: string, question: string, options: string[], correctAnswer: string): Observable<any> {
    const url = `${this.baseUrl}/atelier/${atelierId}`;

    const body = {
      question,
      options,
      correctAnswer
    };

    return this.http.post<any>(url, body);
  }


  addQuizForAtelier(atelierId: string, quizData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/atelier/${atelierId}`, quizData);
  }
}
