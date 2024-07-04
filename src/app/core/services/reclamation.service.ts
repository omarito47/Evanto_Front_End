import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reclamation } from '../model/reclamation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  apiUrlReclamation:string ="http://127.0.0.1:9090/reclamation/";
  constructor(private http:HttpClient) {
  }

  addReclamation(reclamation:FormData){
    return this.http.post(this.apiUrlReclamation,reclamation);
  }
  getReclamations(){
    return this.http.get<Reclamation[]>(this.apiUrlReclamation);
  }
  getReclamationByUser(id:string){
    return this.http.get<Reclamation[]>(this.apiUrlReclamation+"user/"+id);
  }
  getReclamationById(id:string){
    return this.http.get<Reclamation>(this.apiUrlReclamation+id);
  }
  updateReclamation(id: string, body: FormData) {
    return this.http.patch(this.apiUrlReclamation + id, body);
  }
  deleteReclamation(id: string) {
    return this.http.delete(this.apiUrlReclamation + id);
  }
  getReclamationsTraiter() {
    return this.http.get<Reclamation[]>(this.apiUrlReclamation+"traiter");
  }
  getReclamationsNonTraiter() {
    return this.http.get<Reclamation[]>(this.apiUrlReclamation+"nontraiter");
  }
  chercherReclamation(key: string) {
    return this.http.get<Reclamation[]>(this.apiUrlReclamation+"search/"+key);
  }

  traiterReclamation(id: string , body:Reclamation) {
    return this.http.patch(this.apiUrlReclamation + id+"/traiter",body);
  }
  ouvrireReclamation(id: string , body:Reclamation) {
    return this.http.patch(this.apiUrlReclamation + id+"/ouvrire",body);
  }
  fermerReclamation(id: string , body:Reclamation) {
    return this.http.patch(this.apiUrlReclamation + id+"/fermer",body);
  }

  // getReclamationStats(): Observable<any> {
  //   return this.http.get<any>(this.apiUrlReclamation+"stats");
  // }

  getReclamationsCountByService(): Observable<any> {
    return this.http.get<any>(this.apiUrlReclamation+"reclamations-count-by-service");
  }

  getMonthlyReclamations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlReclamation}getMonthlyReclamations`);
  }
  exportReclamation(){
    return this.http.get(this.apiUrlReclamation+"/export", { responseType: 'blob' });
  }

}
