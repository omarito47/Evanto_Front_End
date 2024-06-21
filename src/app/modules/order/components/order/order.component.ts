import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: Order[] = []; // Array to hold orders
  id: string | undefined; // Property to hold route parameter

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrders(); // Call getAllOrders when component initializes
  }

  getAllOrders(): void {
    // Call your order service to fetch all orders
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        console.log('Orders:', response); // Log orders received from backend
        this.orders = response as any; // Assign received orders to component property
      },
      error: (error) => {
        console.error('Error fetching orders:', error); // Log any errors fetching orders
        // Optionally, you can handle errors here, e.g., show a message to the user
      },
    });
  }

  cancelOrder(id: string): void {
    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        // Update locally to reflect cancellation
        this.orders = this.orders.map((order) => {
          if (order._id === id) {
            return { ...order, isCanceled: true };
          }
          return order;
        });
      },
      error: (error) => {
        console.error('Error canceling order:', error);
      },
    });
  }
}
