import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeSalle } from '../model/typeSalle';
import { Salle } from '../model/salle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGSService {

  baseUrl : string = "http://127.0.0.1:9090/"
  
  apiUrlSalle:string =this.baseUrl+"salle/";
  apiUrlTypeSalle: string = this.baseUrl+"typeSalle/"
  //apiUrlApartment: string = this.baseUrl+"apartement/"
  constructor(private http:HttpClient) {
  }
//type salle
addTypeSalle(body:TypeSalle){
  return this.http.post(this.apiUrlTypeSalle,body); }

getTypeSalles(){
  return this.http.get<TypeSalle[]>(this.apiUrlTypeSalle)}

getTypeSalleById(id:string){
  return this.http.get<TypeSalle>(this.apiUrlTypeSalle+id);} 

updateTypeSalle(id: string, body: TypeSalle) {
  return this.http.put(this.apiUrlTypeSalle + id, body);}

deleteTypeSalle(id: string) {
  return this.http.delete(this.apiUrlTypeSalle + id);}

  getTypeSallesWithLibelle(): Observable<TypeSalle[]> {
    return this.http.get<TypeSalle[]>(this.apiUrlTypeSalle + '?includeLibelle=true');
  }
//salle
addSalle(salle:FormData) {
  return this.http.post(this.apiUrlSalle, salle);}

  getSalles(){
    return this.http.get<Salle[]>(this.apiUrlSalle)}

  getSalleById(id:string){
    return this.http.get<Salle>(this.apiUrlSalle+id);} 

  updateSalle(id: string, body: FormData) {
    return this.http.put(this.apiUrlSalle + id, body);}

  deleteSalle(id: string) {
    return this.http.delete(this.apiUrlSalle + id);}
  
  chercherSalle(key: string) {
    return this.http.get<Salle[]>(this.apiUrlSalle+"search/"+key);
  }
  // getHighestRatedSalle() {
  //   return this.http.get<Salle>(this.apiUrlSalle + "mieuxNotee");
  // }

  getMostReservedSalle() {
    return this.http.get<Salle>(this.apiUrlSalle + "plusReservee");
  }

  
}
