import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavSplitComponent } from './nav-split/nav-split.component';
import { NavbarV2Component } from './navbar-v2/navbar-v2.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import(
            '../../modules/type-event-managment/type-event-managment.module'
          ).then((m) => m.TypeEventManagmentModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/event-managment/event-managment.module').then(
            (m) => m.EventManagmentModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../modules/reservation/reservation.module').then(
            (m) => m.ReservationModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../modules/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  {
    path: 'nav2',
    component: NavbarV2Component,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/reservation/reservation.module').then(
            (m) => m.ReservationModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/checkout-page/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/payment/payment.module').then(
            (m) => m.PaymentModule
          ),
      },
    ],
  },

  {
    path: 'nav-split',
    component: NavSplitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaoutRoutingModule {}
