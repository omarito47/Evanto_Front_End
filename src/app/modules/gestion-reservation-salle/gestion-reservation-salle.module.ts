import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GestionReservationSalleRoutingModule } from './gestion-reservation-salle-routing.module';
import { ReservationsComponent } from './component/reservations/reservations.component';
import { DetailsReservationComponent } from './component/details-reservation/details-reservation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationClientComponent } from './component/reservation-client/reservation-client.component';
import { MesReservationsSalleComponent } from './component/mes-reservations-salle/mes-reservations-salle.component';
import { StatComponent } from './stat/stat.component';


@NgModule({
  declarations: [
  
    ReservationsComponent,
       DetailsReservationComponent,
       ReservationClientComponent,
       MesReservationsSalleComponent,
       StatComponent
  ],
  imports: [
    CommonModule,
    GestionReservationSalleRoutingModule,
     ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [DatePipe],
})
export class GestionReservationSalleModule { }
