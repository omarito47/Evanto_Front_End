import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-navbar-v2',
  templateUrl: './navbar-v2.component.html',
  styleUrls: ['./navbar-v2.component.scss'],
})
export class NavbarV2Component implements OnInit {
  userRole: string;
  userId: string;
  userName: string;
  cartQuantity = 0;

  ngOnInit() {
    // Retrieve the user's role from local storage
    this.userRole = localStorage.getItem('role');
    // Retrieve the user id from local storage
    this.userId = localStorage.getItem('userId');
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userName = user.name;
    });
  }

  constructor(
    private router: Router,
    private cartservice: CartService,
    private userService: UsersService
  ) {
    cartservice.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
