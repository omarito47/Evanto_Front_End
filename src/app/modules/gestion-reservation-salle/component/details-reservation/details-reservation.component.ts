import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationSalle } from 'src/app/core/model/reservationSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-details-reservation',
  templateUrl: './details-reservation.component.html',
  styleUrls: ['./details-reservation.component.scss']
})
export class DetailsReservationComponent implements OnInit {

  idr!: string;
  reserv!: ReservationSalle;
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
    this.RS.getReservationById(this.idr).subscribe({
      next: (data) => {
        this.reserv = data;
        // Assigner les valeurs au formulaire en convertissant les IDs en noms
        this.reservationSalle.patchValue({
          dateDebut: this.dateToString(new Date(data.dateDebut)),
          dateFin: this.dateToString(new Date(data.dateFin)),
          idSalle: data.idSalle,
          idUser: data.idUser,
          email: data.email
        });

        // Récupérer le nom de la salle
        this.SCGS.getSalleById(data.idSalle).subscribe(salle => {
          this.salles = [{ _id: salle._id, nomSalle: salle.nomSalle }];
        });

        // Récupérer le nom de l'utilisateur
        this.userService.getUserById(data.idUser).subscribe(user => {
          this.users = [{ _id: user._id, name: user.name }];
        });
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
          this.router.navigate(['/listeReservationSalle']);
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

