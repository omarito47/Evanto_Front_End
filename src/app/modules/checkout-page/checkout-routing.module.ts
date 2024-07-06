import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './checkout/checkout-page.component';
import { OrderTrackComponent } from './order-track/order-track.component';

const routes: Routes = [
  {
    path: 'checkout',
    children: [
      { path: '', component: CheckoutPageComponent },
      { path: 'orderTrack/:id', component: OrderTrackComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
