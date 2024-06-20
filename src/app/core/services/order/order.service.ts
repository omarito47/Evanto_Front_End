import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = 'http://localhost:8000/';
  apiUrlOrders: string = this.baseUrl + 'orders/';
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(this.apiUrlOrders);
  }
  create(body: FormData) {
    return this.http.post(this.apiUrlOrders, body);
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
    return this.http.get<Order>(this.apiUrlOrders + '/track/' + id);
  }
}
