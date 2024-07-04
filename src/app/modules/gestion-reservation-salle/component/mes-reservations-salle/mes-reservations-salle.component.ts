import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationSalle } from 'src/app/core/model/reservationSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mes-reservations-salle',
  templateUrl: './mes-reservations-salle.component.html',
  styleUrls: ['./mes-reservations-salle.component.scss']
})
export class MesReservationsSalleComponent implements OnInit {
  listReservation: ReservationSalle[] = [];
  salleMap: { [key: string]: string } = {};
  userId: string | null = null;
  historiqueReservation: ReservationSalle[] = [];

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
    this.userId = localStorage.getItem('userId');
  }

  getAllReservation() {
    this.RS.getReservations().subscribe({
      next: (reserv) => {
        const currentDate = new Date();
        this.listReservation = reserv.filter(reservation => {
          const reservationDateFin = new Date(reservation.dateFin);
          return reservation.idUser === this.userId && currentDate <= reservationDateFin;
        });
        // Filtrer les réservations terminées pour l'historique
        this.historiqueReservation = reserv.filter(reservation => {
          const reservationDateFin = new Date(reservation.dateFin);
          return reservation.idUser === this.userId && currentDate > reservationDateFin;
        });
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
      Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
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
    });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Annulation impossible',
        text: 'Vous ne pouvez pas annuler cette réservation car moins de 48 heures restent avant la date de début.',
      });
  }
}
  }