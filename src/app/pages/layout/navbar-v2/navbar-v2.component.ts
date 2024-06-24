import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-navbar-v2',
  templateUrl: './navbar-v2.component.html',
  styleUrls: ['./navbar-v2.component.scss'],
})
export class NavbarV2Component implements OnInit {
  cartQuantity = 0;

  constructor(private router: Router, private cartservice: CartService) {
    cartservice.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
}
