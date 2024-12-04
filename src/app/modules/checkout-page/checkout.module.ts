import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './checkout/checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  declarations: [
    CheckoutPageComponent,
    // Add other components if needed
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here if needed
  ],
})
export class CheckoutModule {}
