import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavSplitComponent } from './nav-split/nav-split.component';
import { NavbarV2Component } from './navbar-v2/navbar-v2.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';
import { DashboardComponent } from 'src/app/modules/gestion-statistiques/component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/type-event-managment/type-event-managment.module').then((m) => m.TypeEventManagmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/event-managment/event-managment.module').then((m) => m.EventManagmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../modules/reservation/reservation.module').then((m) => m.ReservationModule),
        canActivate: [AuthGuard]
      },
      //insaf
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-salle/gestion-salle.module').then((m) => m.GestionSalleModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-reservation-salle/gestion-reservation-salle.module').then((m) => m.GestionReservationSalleModule),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-rating/gestion-rating.module').then((m) => m.GestionRatingModule),
      },
      //insaf
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
          import('../../modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/order/order.module').then((m) => m.OrderModule),
      },

    ],
  },
  {
    path: 'nav2', component: NavbarV2Component,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../modules/reservation/reservation.module').then((m) => m.ReservationModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
        canActivate: [AuthGuard]
      },
      // insaf
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-salle/gestion-salle.module').then((m) => m.GestionSalleModule),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-reservation-salle/gestion-reservation-salle.module').then((m) => m.GestionReservationSalleModule),
      },

      // insaf
      /****Gestion de Reclamation module ********* */
      {
        path: '',
        loadChildren: () =>
          import('../../modules/reclamation-management/reclamation-management.module').then((m) => m.ReclamationManagementModule),
        canActivate: [AuthGuard]
      },

      /****Gestion de Reclamation module ********* */
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
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-statistiques/gestion-statistiques.module').then((m) => m.GestionStatistiquesModule),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-participation/gestion-participation.module').then((m) => m.GestionParticipationModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-quizz/gestion-quizz.module').then((m) => m.GestionQuizzModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-categorie/gestion-categorie.module').then((m) => m.GestionCategorieModule),
      },

      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-ateliers/gestion-ateliers.module').then((m) => m.GestionAteliersModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () =>
          import('../../modules/gestion-evaluation/gestion-evaluation.module').then((m) => m.GestionEvaluationsModule),
        canActivate: [AuthGuard]
      },
    
    ],
  },
  {
    path: 'nav-split', component: NavSplitComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaoutRoutingModule { }
