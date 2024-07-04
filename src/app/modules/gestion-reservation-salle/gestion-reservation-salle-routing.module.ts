import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './component/reservations/reservations.component';
import { DetailsReservationComponent } from './component/details-reservation/details-reservation.component';
import { ReservationClientComponent } from './component/reservation-client/reservation-client.component';
import { MesReservationsSalleComponent } from './component/mes-reservations-salle/mes-reservations-salle.component';
import { StatComponent } from './stat/stat.component';

const routes: Routes = [
  { path: 'listeReservationSalle', component: ReservationsComponent },
  { path: 'detailsReservationSalle/:idr', component: DetailsReservationComponent },
  //client
  { path: 'ReservationSalleClient/:id', component: ReservationClientComponent },
  { path: 'mesReservationSalle', component: MesReservationsSalleComponent },
  { path: 'stats', component: StatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionReservationSalleRoutingModule { }
