import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.scss'],
})
export class OrderTrackComponent {
  order!: Order;
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if (!params.id) return;

    orderService.trackOrderById(params.id).subscribe((response) => {
      this.order = response.data;
    });
  }
}
