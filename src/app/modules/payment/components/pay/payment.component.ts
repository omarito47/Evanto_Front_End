import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements AfterViewInit {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  @ViewChild('cardElement') cardElement!: ElementRef;

  constructor(
    private ngZone: NgZone,
    private orderService: OrderService,
    private router: Router
  ) {
    this.initializeStripe();
  }

  async initializeStripe() {
    this.stripe = await loadStripe(
      'pk_test_51PUz5g06xt7Y6U6AXtdFDOdYhNo6DTpE3jlw6ZFWr4LlGR1YEiql2b5yw26UMps7SHqu5hyHhbkysP4aBWoO0vpo004aOY7eWi'
    );
    if (this.stripe) {
      this.ngZone.run(() => {
        this.elements = this.stripe!.elements();
      });
    } else {
      Swal.fire({
        title: 'Initialization Error',
        text: 'Failed to initialize Stripe',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  }

  ngAfterViewInit() {
    this.mountCardElement();
  }

  async mountCardElement() {
    if (this.elements && this.cardElement.nativeElement) {
      this.card = this.elements.create('card');
      this.card.mount(this.cardElement.nativeElement);
    } else {
      // Retry mounting after a short delay if elements are not ready
      setTimeout(() => this.mountCardElement(), 100);
    }
  }

  async handlePayment() {
    if (!this.stripe || !this.card) {
      Swal.fire({
        title: 'Initialization Error',
        text: 'Stripe or card element not initialized',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      return;
    }

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    if (error) {
      Swal.fire({
        title: 'Payment Error',
        text: `Error creating payment method: ${error.message}`,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      return;
    }

    const order = this.orderService.getCurrentOrder();

    try {
      const response = await fetch('http://localhost:8000/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          total: order.totalPrice,
        }),
      });

      const result = await response.json();

      if (result.error) {
        Swal.fire({
          title: 'Payment Error',
          text: `Error creating payment intent: ${result.error.message}`,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Payment Success',
          text: 'Payment intent created successfully',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        this.createOrder(order, result.paymentIntent.id);
      }
    } catch (err) {
      Swal.fire({
        title: 'Payment Error',
        text: `Error: ${err.message}`,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  }

  async createOrder(order: Order, paymentId: string) {
    this.orderService.create({ ...order, paymentId }).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Order Completed',
          text: 'Your order has been successfully placed!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          this.orderService.clearOrder();
          this.router.navigateByUrl(
            '/nav2/checkout/orderTrack/' + response._id
          );
        });
      },
      error: (errorResponse) => {
        Swal.fire({
          title: 'Order Error',
          text: `Failed to place the order: ${errorResponse.error.message}`,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
