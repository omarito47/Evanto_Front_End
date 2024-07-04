// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ReservationSalle } from 'src/app/core/model/reservationSalle';
// import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
// import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
// import { UsersService } from 'src/app/core/services/users.service';

// @Component({
//   selector: 'app-reservations',
//   templateUrl: './reservations.component.html',
//   styleUrls: ['./reservations.component.scss']
// })
// export class ReservationsComponent implements OnInit {
//   listReservation: ReservationSalle[] = [];
//   userNames: { [key: string]: string } = {};
//   salleNames: { [key: string]: string } = {};

//   reservation: FormGroup = new FormGroup({
//     dateDebut: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
//     dateFin: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
//     tarif: new FormControl(0),
//     idSalle: new FormControl(''),
//     email: new FormControl(''),
//     idUser: new FormControl(''),
//   });
  

//   constructor(
//     private RS: ReservationSalleService,
//     private SCGS: ConsumerGSService,
//     private userService: UsersService 
//   ) {}

//   ngOnInit() {
//     this.getAllReservation();
   
//   }

//   getAllReservation() {
//     this.RS.getReservations().subscribe({
//       next: (reserv) => {
//         this.listReservation = reserv;
//         this.listReservation.forEach(reservation => {
//           this.userService.getUserById(reservation.idUser).subscribe(user => {
//             this.userNames[reservation.idUser] = user.name;  // Store the user's name
//           });
//           this.SCGS.getSalleById(reservation.idSalle).subscribe(salle => {
//             this.salleNames[reservation.idSalle] = salle.nomSalle;  // Store the room's name
//           });
//         });
//       },
//       error: (er) => {
//         alert(er.message);
//       }
//     });
//   }
 

//  getUserName(userId: string): string {
//     return this.userNames[userId] || 'Loading...';
//   }

//   getSalleName(salleId: string): string {
//     return this.salleNames[salleId] || 'Loading...';
//   }
  

//   delete(id: string) {
//     if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
//       this.RS.deleteReservation(id).subscribe({
//         next: () =>
//           (this.listReservation = this.listReservation.filter(
//             (reservation) => reservation._id !== id
//           )),
//         error: (error) => {
//           console.error('Error deleting category:', error);
//         },
//       });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationSalle } from 'src/app/core/model/reservationSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  listReservation: ReservationSalle[] = [];
  filteredReservations: ReservationSalle[] = [];
  userNames: { [key: string]: string } = {};
  salleNames: { [key: string]: string } = {};
  selectedSalleId: string | null = null;

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
    private userService: UsersService 
  ) {}

  ngOnInit() {
    this.getAllReservation();
  }

  getAllReservation() {
    this.RS.getReservations().subscribe({
      next: (reserv) => {
        this.listReservation = reserv;
        this.filteredReservations = reserv;
        this.listReservation.forEach(reservation => {
          this.userService.getUserById(reservation.idUser).subscribe(user => {
            this.userNames[reservation.idUser] = user.name;  // Store the user's name
          });
          this.SCGS.getSalleById(reservation.idSalle).subscribe(salle => {
            this.salleNames[reservation.idSalle] = salle.nomSalle;  // Store the room's name
          });
        });
      },
      error: (er) => {
        alert(er.message);
      }
    });
  }

  onSalleSelectChange(event: any) {
    const salleId = event.target.value;
    this.selectedSalleId = salleId ? salleId : null;
    this.applyFilters();
  }

  applyFilters() {
    if (!this.selectedSalleId) {
      this.filteredReservations = this.listReservation;
    } else {
      this.filteredReservations = this.listReservation.filter(reservation => 
        reservation.idSalle === this.selectedSalleId
      );
    }
  }

  getUserName(userId: string): string {
    return this.userNames[userId] || 'Loading...';
  }

  getSalleName(salleId: string): string {
    return this.salleNames[salleId] || 'Loading...';
  }

  delete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.RS.deleteReservation(id).subscribe({
        next: () => {
          this.listReservation = this.listReservation.filter(
            (reservation) => reservation._id !== id
          );
          this.applyFilters(); // Apply filters after deletion
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }
  }
  
}

