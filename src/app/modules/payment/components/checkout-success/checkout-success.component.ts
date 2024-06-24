import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for handling route parameters
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-success',
  template: `
    <div>
      <h2>Payment Successful!</h2>
      <!-- Display additional details or next steps for the user -->
    </div>
  `,
})
export class CheckoutSuccessComponent {
  constructor(private route: ActivatedRoute) {
    // Access route parameters to get details from Stripe redirect
    this.route.queryParams.subscribe((params) => {
      const paymentIntentId = params['payment_intent'];
      if (paymentIntentId) {
        Swal.fire({
          title: 'Payment Success',
          text: `Payment Intent ID: ${paymentIntentId}`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        // Handle additional logic as needed
      }
    });
  }
}
