import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationSalle } from 'src/app/core/models/reservationSalle';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.css']
})
export class DetailsReservationComponent {
  // reservatioSalle!: ReservationSalle;
  // listReservation: ReservationSalle[] = [];

  // constructor(
  //   private RS: ReservationSalleService,
  //   private ar: ActivatedRoute
  // ) {}

  // ngOnInit() {
  //   const reservationId = this.ar.snapshot.params['id'];
    
  //   // Fetch the salle details
  //   this.RS.getReservationById(reservationId).subscribe({
  //     next: (response) => {
  //       console.log('Fetched reservation:', response); // Log fetched salle
  //       this.reservatioSalle = response;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching reservation:', error);
  //     },
  //   });
  // }
}
