import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commentaire } from '../models/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiUrlCommentaire:string ="http://127.0.0.1:9090/comment/";
  constructor(private http:HttpClient) {
  }

  addComment(comment:Commentaire){
    return this.http.post(this.apiUrlCommentaire,comment);
  }
  
  getComments(iduser:string,idrec:string){
    return this.http.get<Commentaire[]>(this.apiUrlCommentaire+"/"+iduser+"/"+idrec);
  }

  deleteComment(id:string) {
    return this.http.delete(this.apiUrlCommentaire + id);
  }

  satisfaitComment(id:string,comment:Commentaire){
    return this.http.patch<Commentaire>(this.apiUrlCommentaire+"/"+id+"/valide",comment);
  }
  nonSatisfaitComment(id:string,comment:Commentaire){
    return this.http.patch<Commentaire>(this.apiUrlCommentaire+"/"+id+"/invalide",comment);
  }
}
