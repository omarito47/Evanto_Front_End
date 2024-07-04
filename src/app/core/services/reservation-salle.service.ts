import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationSalle } from '../model/reservationSalle';

@Injectable({
  providedIn: 'root'
})
export class ReservationSalleService {

  constructor(private http:HttpClient) { }

  baseUrl : string = "http://127.0.0.1:9090/"
  
  apiUrlReservationSalle:string =this.baseUrl+"reservationSalle/";

  addReservation(reservation:FormData) {
    return this.http.post(this.apiUrlReservationSalle, reservation);}
  
    getReservations(){
      return this.http.get<ReservationSalle[]>(this.apiUrlReservationSalle)}
  
    getReservationById(id:string){
      return this.http.get<ReservationSalle>(this.apiUrlReservationSalle+id);} 
  
    updateReservation(id: string, body: FormData) {
      return this.http.put(this.apiUrlReservationSalle + id, body);}
  
    deleteReservation(id: string) {
      return this.http.delete(this.apiUrlReservationSalle+ id);}
    
      getReservationsBySalle(id: string) {
        return this.http.get<ReservationSalle[]>(this.apiUrlReservationSalle + 'RbySalle/'+ id);}

        getReservationsByUser(id: string) {
          return this.http.get(this.apiUrlReservationSalle+'RbyUser/'+ id);}

          
}
