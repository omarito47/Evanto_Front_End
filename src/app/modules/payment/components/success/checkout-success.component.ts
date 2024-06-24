import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for handling route parameters

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
      console.log('Payment Intent ID:', paymentIntentId);
      // Handle additional logic as needed
    });
  }
}
