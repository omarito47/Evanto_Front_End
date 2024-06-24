import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpOptions;
  baseUrl: string = 'http://localhost:8000/';
  apiUrlOrders: string = this.baseUrl + 'orders/';
  paymentUrl: string = this.baseUrl + 'payment/';
  private currentOrder: Order = this.getCartFromLocalStorage();
  private orderSubject: BehaviorSubject<Order> = new BehaviorSubject(
    this.currentOrder
  );

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    this.httpOptions = {
      headers: httpHeaders,
      observe: 'body',
    };
  }
  getAllOrders() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<Order[]>(this.apiUrlOrders, {
      headers: httpHeaders,
    });
  }
  create(body: Order) {
    return this.http.post<Order>(this.apiUrlOrders, body, {
      ...this.httpOptions,
      observe: 'body',
    }) as Observable<any>;
  }
  updateOrder(id: string, body: FormData) {
    return this.http.put(this.apiUrlOrders + id, body);
  }
  cancelOrder(id: string) {
    return this.http.put(`${this.apiUrlOrders}/cancel/${id}`, null);
  }

  // getNewOrderForCurrentUser():Observableble<Order>{ {
  //   return this.http.get<Order>(this.apiUrlOrders, +'newOrderForCurrentUser');
  // }

  pay(order: Order) {
    return this.http.post<string>(this.apiUrlOrders, +'/pay');
  }

  trackOrderById(id: string) {
    return this.http.get<Order>(this.apiUrlOrders + id, {
      ...this.httpOptions,
      observe: 'body',
    }) as Observable<any>;
  }
  processPayment(token: string): Observable<any> {
    return this.http.post(this.paymentUrl, { token });
  }

  getCurrentOrder(): Order {
    return this.orderSubject.value;
  }

  setCurrentOrder(order: Order): void {
    this.currentOrder = order;
    this.setCartToLocalStorage();
  }

  clearOrder() {
    this.currentOrder = new Order();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Order> {
    return this.orderSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    const orderJson = JSON.stringify(this.currentOrder);
    localStorage.setItem('Order', orderJson);
    this.orderSubject.next(this.currentOrder);
  }

  private getCartFromLocalStorage(): Order {
    const orderJson = localStorage.getItem('Order');
    return orderJson ? JSON.parse(orderJson) : new Order();
  }
}
