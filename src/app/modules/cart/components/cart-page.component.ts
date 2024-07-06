import { Component } from '@angular/core';
import { Cart } from 'src/app/core/model/Cart';
import { CartItem } from 'src/app/core/model/CartItem';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product._id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product._id, quantity);
  }
  arrayFromnumber(len) {
    return Array.from({ length: len }, (value, index) => index + 1);
  }
}
