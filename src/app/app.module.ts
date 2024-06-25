import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { SallesComponent } from './salle-components/salles/salles.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TypeSalleComponent } from './salle-components/type-salle/type-salle.component';
import { AddSalleComponent } from './salle-components/add-salle/add-salle.component';
import { DetailsSalleComponent } from './salle-components/details-salle/details-salle.component';
import { AddReservationComponent } from './reservation-salle/add-reservation/add-reservation.component';
import { DetailsReservationComponent } from './reservation-salle/details-reservation/details-reservation.component';
import { ReservationsComponent } from './reservation-salle/reservations/reservations.component';
import { DetailsSalleClientComponent } from './salle-components-client/details-salle-client/details-salle-client.component';
import { SallesClientComponent } from './salle-components-client/salles-client/salles-client.component';
import { TypeClientSalleComponent } from './salle-components-client/type-client-salle/type-client-salle.component';
import { AddReservationAdminComponent } from './reservation-salle-admin/add-reservation-admin/add-reservation-admin.component';
import { ReservationsAdminComponent } from './reservation-salle-admin/reservations-admin/reservations-admin.component';
import { RatingSalleClientComponent } from './rating-salle-client/rating-salle-client.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SallesComponent,
    FooterComponent,
    NavbarComponent,
    TypeSalleComponent,
    AddSalleComponent,
    DetailsSalleComponent,
    AddReservationComponent,
    DetailsReservationComponent,
    ReservationsComponent,
    DetailsSalleClientComponent,
    SallesClientComponent,
    TypeClientSalleComponent,
     AddReservationAdminComponent,
    ReservationsAdminComponent,
    RatingSalleClientComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [DatePipe],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
