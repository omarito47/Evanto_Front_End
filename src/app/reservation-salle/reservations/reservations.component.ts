import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationSalle } from 'src/app/core/models/reservationSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  listReservation: ReservationSalle[] = [];
  salleMap: { [key: string]: string } = {};
  
  reservation: FormGroup = new FormGroup({
    dateDebut: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    dateFin: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    tarif: new FormControl(0),
    idSalle: new FormControl(''),
    email: new FormControl(''),
    idUser: new FormControl(''),
  });
  

  constructor(
    private RS: ReservationSalleService,
    private SCGS: ConsumerGSService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getAllReservation();
    this.getAllSalles();
  }

  getAllReservation() {
    this.RS.getReservations().subscribe({
      next: (reserv) => {
        this.listReservation = reserv;
       
      },
      error: (er) => {
        alert(er.message);
      }
    });
  }

  getAllSalles() {
    this.SCGS.getSalles().subscribe({
      next: (salles) => {
        salles.forEach(salle => {
          this.salleMap[salle._id] = salle.nomSalle;
        });
      },
      error: (er) => {
        alert(er.message);
      }
    });
  }
  getSalleName(idSalle: string): string {
    return this.salleMap[idSalle] || 'Nom de salle inconnu';
  }

  
  delete(id: string) {
    const reservationToDelete = this.listReservation.find(reservation => reservation._id === id);
    if (!reservationToDelete) {
      console.error('Reservation not found.');
      return;
    }
  
    const currentDate = new Date();
    const reservationDateDebut = new Date(reservationToDelete.dateDebut);
  
    // Calculating the difference in milliseconds between the current date and the reservation start date
    const timeDifference = reservationDateDebut.getTime() - currentDate.getTime();
  
    // Converting milliseconds to hours
    const hoursDifference = timeDifference / (1000 * 3600);
  
    if (hoursDifference >= 48) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
        this.RS.deleteReservation(id).subscribe({
          next: () =>
            (this.listReservation = this.listReservation.filter(
              (reservation) => reservation._id !== id
            )),
          error: (error) => {
            console.error('Error deleting reservation:', error);
          },
        });
      }
    } else {
      alert('Vous ne pouvez pas annuler cette réservation car moins de 48 heures restent avant la date de début.');
    }
  }
}
