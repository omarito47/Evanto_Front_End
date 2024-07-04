// import { Component, OnInit } from '@angular/core';
// import { Salle } from 'src/app/core/model/salle';
// import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
// import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
// import { ReservationSalle } from 'src/app/core/model/reservationSalle';
// import { UsersService } from 'src/app/core/services/users.service';
// import {User} from 'src/app/core/model/user';
// @Component({
//   selector: 'app-stat',
//   templateUrl: './stat.component.html',
//   styleUrls: ['./stat.component.scss']
// })
// export class StatComponent implements OnInit {
//   reservations: ReservationSalle[];
//   salles: Salle[];
//   sallePlusReservee: Salle;
//   reservationsParSalle: { salle: string, nombreReservations: number }[] = [];
//   reservationsParUser: { user: User, reservations: ReservationSalle[] }[] = [];

//   constructor(
//     private reservationService: ReservationSalleService,
//     private gsService: ConsumerGSService,
//     private userService: UsersService,
//   ) { }

//   ngOnInit(): void {
//     this.loadReservations();
//     this.loadSalles();
//     this.loadSallePlusReservee();
//     // this.loadReservationsParUser();
//   }

//   loadReservations() {
//     console.log("Loading reservations...");
//     this.reservationService.getReservations().subscribe(
//       data => {
//         this.reservations = data;
//         console.log('Réservations chargées :', this.reservations);
//       },
//       error => {
//         console.error('Erreur lors du chargement des réservations : ', error);
//       }
//     );
//   }


//   loadSalles() {
//     console.log("Loading salles...");
//     this.gsService.getSalles().subscribe(
//       data => {
//         this.salles = data;
//         console.log('Salles chargées :', this.salles);
//         this.calculateReservationsParSalle();
//       },
//       error => {
//         console.error('Erreur lors du chargement des salles : ', error);
//       }
//     );
//   }
  
//   loadSallePlusReservee() {
//     this.gsService.getMostReservedSalle().subscribe(
//       data => {
//         this.sallePlusReservee = data;
//       },
//       error => {
//         console.error('Erreur lors du chargement de la salle la plus réservée : ', error);
//       }
//     );
//   }



//   calculateReservationsParSalle() {
//     console.log("Calculating reservations per salle...");
//     this.salles.forEach(salle => {
//       console.log(`Fetching reservations for salle: ${salle.nomSalle}`);
//       this.reservationService.getReservationsBySalle(salle._id).subscribe(
//         reservations => {
//           console.log(`Reservations for salle ${salle.nomSalle}:`, reservations);
//           this.reservationsParSalle.push({ salle: salle.nomSalle, nombreReservations: reservations.length });
          
//         },
//         error => {
//           console.error(`Erreur lors du chargement des réservations pour la salle ${salle.nomSalle} : `, error);
//         }
//       );
//     });
//   }

//   // loadReservationsParUser() {
//   //   console.log("Loading reservations per user...");
//   //   this.userService.getUsers().subscribe(
//   //     users => {
//   //       users.forEach(user => {
//   //         this.reservationService.getReservationsByUser(user._id).subscribe(
//   //           (reservations: ReservationSalle[]) => {
//   //             const userReservations = { user: user, reservations: reservations };
//   //             this.reservationsParUser.push(userReservations);
//   //             console.log(`Reservations for user ${user.name}:`, reservations);
//   //           },
//   //           error => {
//   //             console.error(`Error loading reservations for user ${user.name}: `, error);
//   //           }
//   //         );
//   //       });
//   //     },
//   //     error => {
//   //       console.error('Error loading users: ', error);
//   //     }
//   //   );
//   // }

//   getNombreTotalSalles(): number {
//     return this.salles ? this.salles.length : 0;
//   }

//   getNombreTotalReservations(): number {
//     return this.reservations ? this.reservations.length : 0;
//   }  
 

// }

import { Component, OnInit } from '@angular/core';
import { Salle } from 'src/app/core/model/salle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { ReservationSalle } from 'src/app/core/model/reservationSalle';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  reservations: ReservationSalle[];
  salles: Salle[];
  sallePlusReservee: Salle;
  reservationsParSalle: { salle: string, nombreReservations: number }[] = [];

  constructor(
    private reservationService: ReservationSalleService,
    private gsService: ConsumerGSService,
  ) { }

  ngOnInit(): void {
    this.loadReservations();
    this.loadSalles();
    this.loadSallePlusReservee();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe(
      data => {
        this.reservations = data;
      },
      error => {
        console.error('Erreur lors du chargement des réservations : ', error);
      }
    );
  }

  loadSalles() {
    this.gsService.getSalles().subscribe(
      data => {
        this.salles = data;
        this.calculateReservationsParSalle();
      },
      error => {
        console.error('Erreur lors du chargement des salles : ', error);
      }
    );
  }

  loadSallePlusReservee() {
    this.gsService.getMostReservedSalle().subscribe(
      data => {
        this.sallePlusReservee = data;
      },
      error => {
        console.error('Erreur lors du chargement de la salle la plus réservée : ', error);
      }
    );
  }

  calculateReservationsParSalle() {
    this.salles.forEach(salle => {
      this.reservationService.getReservationsBySalle(salle._id).subscribe(
        reservations => {
          const reservationCount = reservations.length;
          this.reservationsParSalle.push({ salle: salle.nomSalle, nombreReservations: reservationCount });
        },
        error => {
          console.error(`Erreur lors du chargement des réservations pour la salle ${salle.nomSalle} : `, error);
        }
      );
    });
  }

  getNombreTotalSalles(): number {
    return this.salles ? this.salles.length : 0;
  }

  getNombreTotalReservations(): number {
    return this.reservations ? this.reservations.length : 0;
  }

  getBarWidth(nombreReservations: number): number {
    const maxReservations = Math.max(...this.reservationsParSalle.map(item => item.nombreReservations));
    return maxReservations > 0 ? (nombreReservations / maxReservations) * 100 : 0;
  }
}
