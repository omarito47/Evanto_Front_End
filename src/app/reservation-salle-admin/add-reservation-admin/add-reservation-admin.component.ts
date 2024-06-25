import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationSalle } from 'src/app/core/models/reservationSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-reservation-admin',
  templateUrl: './add-reservation-admin.component.html',
  styleUrls: ['./add-reservation-admin.component.css']
})
export class AddReservationAdminComponent {
  // idr!: string; // Id reservation
  // reserv!: ReservationSalle;
  // listReservation: ReservationSalle[] = [];
  // reservationSalle: FormGroup;
  // showConfirmationMessage: boolean = false; // Variable pour contrôler l'affichage du message de confirmation

  // constructor(
  //   private RS: ReservationSalleService,
  //   private router: Router,
  //   private ar: ActivatedRoute
  // ) {
  //   this.idr = this.ar.snapshot.params['idr']; // Récupérer id reservation de la route

  //   // Initialize the form
  //   this.reservationSalle = new FormGroup({
  //     dateDebut: new FormControl('', [Validators.required, this.dateValidator]),
  //     dateFin: new FormControl('', [Validators.required, this.dateValidator]),
  //     idSalle: new FormControl(''),
  //     email: new FormControl('', [Validators.email]),
  //     idUser: new FormControl('')
  //   });
  // }

  // ngOnInit(): void {
  //   this.RS.getReservations().subscribe({
  //     next: (response) => {
  //       this.listReservation = response;
  //     },
  //     error: (er) => alert(er.message)
  //   });

  //   this.RS.getReservationById(this.idr).subscribe({
  //     next: (data) => {
  //       this.reservationSalle.patchValue({
  //         dateDebut: this.dateToString(new Date(data.dateDebut)),
  //         dateFin: this.dateToString(new Date(data.dateFin)),
  //         idSalle: data.idSalle,
  //         email: data.email,
  //         idUser: data.idUser,
  //       });
  //       this.reserv = data;
  //     },
  //     error: (err) => alert(err.message)
  //   });
  // }

  // update() {
  //   const dateDebut = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateDebut')?.value);
  //   const dateFin = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateFin')?.value);
  //   const formData = {
  //     ...this.reservationSalle.value,
  //     dateDebut: dateDebut,
  //     dateFin: dateFin
  //   };

  //   this.RS.updateReservation(this.idr, formData).subscribe({
  //     next: () => {
  //       this.showConfirmationMessage = true; // Afficher le message de confirmation
  //       setTimeout(() => {
  //         this.router.navigate(['/reservationAdmin']); // Rediriger après un délai
  //       }, 3000); // Rediriger après 3 secondes (3000 ms)
  //     },
  //     error: (e) => alert(e.message),
  //   });
  // }

  // // Custom validator for yyyy-mm-dd date format
  // dateValidator(control: FormControl): { [key: string]: boolean } | null {
  //   const dateValue = control.value;
  //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!dateValue.match(dateRegex)) {
  //     return { 'invalidDate': true };
  //   }
  //   return null;
  // }

  // // Convert dd/mm/yyyy to yyyy-mm-dd
  // convertDateToYYYYMMDD(date: string): string {
  //   const [day, month, year] = date.split('/');
  //   return `${year}-${month}-${day}`;
  // }

  // // Convert yyyy-mm-dd to dd/mm/yyyy
  // convertDateToDDMMYYYY(date: string): string {
  //   const [year, month, day] = date.split('-');
  //   return `${day}/${month}/${year}`;
  // }

  // // Convert Date object to yyyy-mm-dd string
  // dateToString(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const day = ('0' + date.getDate()).slice(-2);
  //   return `${year}-${month}-${day}`;
  // }
  idr!: string;
  reserv!: ReservationSalle;
  listReservation: ReservationSalle[] = [];
  reservationSalle: FormGroup;
  showConfirmationMessage: boolean = false;
  salles: { _id: string, nomSalle: string }[] = [];
  users: { _id: string, name: string }[] = [];

  constructor(
    private RS: ReservationSalleService,
    private SCGS: ConsumerGSService,
    private userService: UsersService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.idr = this.ar.snapshot.params['idr'];
    this.reservationSalle = new FormGroup({
      dateDebut: new FormControl('', [Validators.required, this.dateValidator]),
      dateFin: new FormControl('', [Validators.required, this.dateValidator]),
      idSalle: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      idUser: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.RS.getReservations().subscribe({
      next: (response) => {
        this.listReservation = response;
      },
      error: (er) => alert(er.message)
    });

    this.SCGS.getSalles().subscribe({
      next: (salles) => {
        this.salles = salles.map((salle) => ({ _id: salle._id, nomSalle: salle.nomSalle}));
      },
      error: (er) => alert(er.message)
    });

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.map((user) => ({ _id: user._id, name: user.name }));
      },
      error: (er) => alert(er.message)
    });

    this.RS.getReservationById(this.idr).subscribe({
      next: (data) => {
        this.reservationSalle.patchValue({
          dateDebut: this.dateToString(new Date(data.dateDebut)),
          dateFin: this.dateToString(new Date(data.dateFin)),
          idSalle: data.idSalle,
          email: data.email,
          idUser: data.idUser,
        });
        this.reserv = data;
      },
      error: (err) => alert(err.message)
    });
  }

  update() {
    const dateDebut = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateDebut')?.value);
    const dateFin = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateFin')?.value);
    const formData = {
      ...this.reservationSalle.value,
      dateDebut: dateDebut,
      dateFin: dateFin
    };

    this.RS.updateReservation(this.idr, formData).subscribe({
      next: () => {
        this.showConfirmationMessage = true;
        setTimeout(() => {
          this.router.navigate(['/reservationAdmin']);
        }, 3000);
      },
      error: (e) => alert(e.message),
    });
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const dateValue = control.value;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateValue.match(dateRegex)) {
      return { 'invalidDate': true };
    }
    return null;
  }

  convertDateToYYYYMMDD(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
