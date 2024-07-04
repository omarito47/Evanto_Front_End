import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavSplitComponent } from './nav-split/nav-split.component';
import { NavbarV2Component } from './navbar-v2/navbar-v2.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';

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
