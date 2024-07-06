import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface User {
  _id?: string;
    name?:string;
    email?:string;
    password?:string;
    age?:number;
    address?:string;
    verified?:boolean;
    verificationCode?:string;
    phoneNumber?:string;
    token?:string;
    role?:string;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:9090/User';
  constructor(
    private http : HttpClient
  ) { }
  private userId: string | null = null;
  private userIdKey = 'userId'; 


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  //omar.taamallah@pardus-it.com
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getuserbyEmail/${email}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, updatedAttributes: Partial<User>): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<User>(url, updatedAttributes);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  

  getUsername(id: string): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/user/username/${id}`);
  }


  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey); // Utilisation de userIdKey ici pour récupérer l'ID de l'utilisateur
  }

}
