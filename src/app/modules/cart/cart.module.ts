import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartPageComponent } from './components/cart-page.component';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
  ],
})
export class CartModule {}
