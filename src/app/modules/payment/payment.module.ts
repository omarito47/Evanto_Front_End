import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './components/pay/payment.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';

@NgModule({
  declarations: [PaymentComponent, CheckoutSuccessComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
  ],
})
export class PaymentModule {}
