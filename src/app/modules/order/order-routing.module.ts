import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: 'order',
    children: [
      { path: '', component: OrderComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
