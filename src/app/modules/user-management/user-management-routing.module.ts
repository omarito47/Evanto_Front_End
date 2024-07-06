import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { UserFormClientComponent } from './components/user-form-client/user-form-client.component';
import { ListServiceComponent } from '../reclamation-management/component/list-service/list-service.component';
import { ReclamationChartComponent } from '../reclamation-management/component/reclamation-chart/reclamation-chart.component';
import { ReclamationDetailsComponent } from '../reclamation-management/component/reclamation-details/reclamation-details.component';
import { ReclamationFormComponent } from '../reclamation-management/component/reclamation-form/reclamation-form.component';
import { ReclamationsComponent } from '../reclamation-management/component/reclamations/reclamations.component';
import { ProductComponent } from '../product/components/product/product.component';
import { AddProductComponent } from '../product/components/add-product/add-product.component';
import { DetailsProductComponent } from '../product/components/details-product/details-product.component';
import { ProductCardComponent } from '../product/components/product-card/product-card.component';
import { DetailsCardProductComponent } from '../product/components/details-card/details-card.component';
import { CartPageComponent } from '../cart/components/cart-page.component';
import { PaymentComponent } from '../payment/components/pay/payment.component';
import { CheckoutSuccessComponent } from '../payment/components/checkout-success/checkout-success.component';
import { OrderTrackComponent } from '../checkout-page/order-track/order-track.component';
import { CheckoutPageComponent } from '../checkout-page/checkout/checkout-page.component';

const routes: Routes = [
  { path: 'liste-user', component: ListeUserComponent ,canActivate: [AuthGuard]},
  { path: 'view-user', component: ViewUserComponent,canActivate: [AuthGuard] },
  { path: 'users/add', component: UserFormComponent ,canActivate: [AuthGuard]},
  { path: 'users/edit/:id', component: UserFormComponent,canActivate: [AuthGuard]},
  { path: 'edit-user/:id',component: UserFormClientComponent,canActivate: [AuthGuard]},
  { path: 'dashboard', component:DashbordComponent,canActivate: [AuthGuard]},


  { path: 'reclamation/list', component: ReclamationsComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/stats', component: ReclamationChartComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/type', component: ListServiceComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/list/:id', component: ReclamationDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/list/update/:id', component: ReclamationFormComponent ,canActivate: [AuthGuard]},


  {
    path: 'product',
    children: [
      { path: '', component: ProductComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'update/:id', component: AddProductComponent },
      { path: 'details/:id', component: DetailsProductComponent },

      /////////CLIENT /////////////////////

      { path: 'list', component: ProductCardComponent },
      { path: 'list/:id', component: DetailsCardProductComponent },
    ],
  },

  {
    path: 'cart',
    children: [
      { path: '', component: CartPageComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },

  {
    path: 'checkout',
    children: [
      { path: '', component: CheckoutPageComponent },
      { path: 'orderTrack/:id', component: OrderTrackComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },

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
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class UserManagementRoutingModule { }
