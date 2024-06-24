import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/pay/payment.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';

const routes: Routes = [
  {
    path: 'payment',
    children: [
      { path: '', component: PaymentComponent },
      { path: 'success', component: CheckoutSuccessComponent },
      // { path: 'success', component: CheckoutSuccessComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
