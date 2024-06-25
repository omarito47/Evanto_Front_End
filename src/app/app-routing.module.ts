import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TypeSalleComponent } from './salle-components/type-salle/type-salle.component';
import { AddSalleComponent } from './salle-components/add-salle/add-salle.component';
import { DetailsSalleComponent } from './salle-components/details-salle/details-salle.component';
import { SallesComponent } from './salle-components/salles/salles.component';
import { ReservationsComponent } from './reservation-salle/reservations/reservations.component';
import { AddReservationComponent } from './reservation-salle/add-reservation/add-reservation.component';
import { DetailsReservationComponent } from './reservation-salle/details-reservation/details-reservation.component';
import { DetailsSalleClientComponent } from './salle-components-client/details-salle-client/details-salle-client.component';
import { SallesClientComponent } from './salle-components-client/salles-client/salles-client.component';
import { AddReservationAdminComponent } from './reservation-salle-admin/add-reservation-admin/add-reservation-admin.component';
import { ReservationsAdminComponent } from './reservation-salle-admin/reservations-admin/reservations-admin.component';
import { RatingSalleClientComponent } from './rating-salle-client/rating-salle-client.component';
const routes: Routes = [
  

  {
    path: 'salle',
    children: [
      { path: '', component: SallesComponent },
      { path: 'add', component: AddSalleComponent },
      { path: 'update/:id', component: AddSalleComponent }, 
      { path: 'details/:id', component: DetailsSalleComponent },
      { path: 'type', component: TypeSalleComponent },

  
    ],
  },
  {
    path: 'salleClient',
    children: [
      { path: '', component: SallesClientComponent }, 
      { path: 'details/:id', component: DetailsSalleClientComponent},
  

  
    ],
  },
  {
    path: 'reservation',
    children: [
      { path: '', component: ReservationsComponent },
      { path: 'add/:id', component: AddReservationComponent },// Ajout d'une nouvelle réservation
      { path: 'update/:idr', component: AddReservationComponent }, // Mise à jour d'une réservation
      { path: 'details/:idr', component: DetailsReservationComponent },

    ],
  },

  {
    path: 'reservationAdmin',
    children: [
      { path: '', component: ReservationsAdminComponent},
      //{ path: 'add', component: AddReservationAdminComponent },// Ajout d'une nouvelle réservation
      { path: 'update/:idr', component: AddReservationAdminComponent }, // Mise à jour d'une réservation
     

    ],
  },
  {
    path: 'rating',
    children: [
      { path: '', component: RatingSalleClientComponent},
      { path: 'add/:id', component: RatingSalleClientComponent },// Ajout d'une nouvelle réservation
    ],
  },
  
{path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
