import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/core/models/order';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  order: Order = new Order();
  checkoutForm!: FormGroup;
  products = [];

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items.map((item) => {
      this.products.push(item.product);
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });
    this.order.totalPrice = cart.totalPrice;

    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        details: ['', Validators.required],
        phone: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
      }),
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      Swal.fire({
        title: 'Invalid Inputs',
        text: 'Please fill the inputs',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.setCurrentOrder(this.order);
    this.cartService.clearCart();
    this.router.navigateByUrl('/nav2/payment');
  }

  getProduct(productId: string) {
    return this.products.find((item) => item._id == productId);
  }
}
