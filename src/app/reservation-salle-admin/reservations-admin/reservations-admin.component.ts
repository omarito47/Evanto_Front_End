import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationSalle } from 'src/app/core/models/reservationSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.css']
})
export class ReservationsAdminComponent {
  // listReservation: ReservationSalle[] = [];
  // salleMap: { [key: string]: string } = {};
  
  // reservation: FormGroup = new FormGroup({
  //   dateDebut: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  //   dateFin: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  //   tarif: new FormControl(0),
  //   idSalle: new FormControl(''),
  //   email: new FormControl(''),
  //   idUser: new FormControl(''),
  // });
  

  // constructor(
  //   private RS: ReservationSalleService,
  //   private SCGS: ConsumerGSService
  // ) {}

  // ngOnInit() {
  //   this.getAllReservation();
  //   this.getAllSalles();
  // }

  // getAllReservation() {
  //   this.RS.getReservations().subscribe({
  //     next: (reserv) => {
  //       this.listReservation = reserv;
       
  //     },
  //     error: (er) => {
  //       alert(er.message);
  //     }
  //   });
  // }

  // getAllSalles() {
  //   this.SCGS.getSalles().subscribe({
  //     next: (salles) => {
  //       salles.forEach(salle => {
  //         this.salleMap[salle._id] = salle.nomSalle;
  //       });
  //     },
  //     error: (er) => {
  //       alert(er.message);
  //     }
  //   });
  // }
  // getSalleName(idSalle: string): string {
  //   return this.salleMap[idSalle] || 'Nom de salle inconnu';
  // }

  // delete(id: string) {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
  //     this.RS.deleteReservation(id).subscribe({
  //       next: () =>
  //         (this.listReservation = this.listReservation.filter(
  //           (reservation) => reservation._id !== id
  //         )),
  //       error: (error) => {
  //         console.error('Error deleting category:', error);
  //       },
  //     });
  //   }
  // }
  listReservation: ReservationSalle[] = [];
  salleMap: { [key: string]: string } = {};
  userMap: { [key: string]: string } = {}; // Map to store user names by user IDs
  
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
    private userService: UsersService // Inject the UsersService
  ) {}

  ngOnInit() {
    this.getAllReservation();
    this.getAllSalles();
    this.getAllUsers(); // Fetch all users
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

  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        users.forEach(user => {
          this.userMap[user._id || ''] = user.name; // Populate the userMap with user names
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

  getUserName(idUser: string): string {
    return this.userMap[idUser] || 'Nom d\'utilisateur inconnu'; // Retrieve the user name using userMap
  }

  delete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.RS.deleteReservation(id).subscribe({
        next: () =>
          (this.listReservation = this.listReservation.filter(
            (reservation) => reservation._id !== id
          )),
        error: (error) => {
          console.error('Error deleting category:', error);
        },
      });
    }
  }
}
