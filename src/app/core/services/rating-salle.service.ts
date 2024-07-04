import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingSalleService {

  constructor(private http:HttpClient) { }

  baseUrl : string = "http://127.0.0.1:9090/"
  
  apiUrlRating:string =this.baseUrl+"rating/";

  addUpdateRating(body:Rating) {
    return this.http.post(this.apiUrlRating, body);}
   

    getRatings(){
      return this.http.get<Rating[]>(this.apiUrlRating)}
      
  
      getRatingsBySalle(id:string){
      return this.http.get<Rating>(this.apiUrlRating+ id);} 
  
   
  
    deleteReservation(id: string) {
      return this.http.delete(this.apiUrlRating+ id);}
    }
