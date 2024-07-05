import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrlService:string ="http://127.0.0.1:9090/service/";
  constructor(private http:HttpClient) {
  }

  addService(service:Service){
    return this.http.post(this.apiUrlService,service);
  }
  getServices(){
    return this.http.get<Service[]>(this.apiUrlService);
  }
  getServiceById(id:string){
    return this.http.get<Service>(this.apiUrlService+id);
  }
  updateService(id: string, body: Service) {
    return this.http.put(this.apiUrlService + id, body);
  }
  deleteService(id: string) {
    return this.http.delete(this.apiUrlService + id);
  }
  chercherService(key: string) {
    return this.http.get<Service[]>(this.apiUrlService+"search/"+key);
  }
}
