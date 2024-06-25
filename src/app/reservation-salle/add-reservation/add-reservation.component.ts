// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ReservationSalle } from 'src/app/core/models/reservationSalle';
// import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
// import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';


// @Component({
//   selector: 'app-add-reservation',
//   templateUrl: './add-reservation.component.html',
//   styleUrls: ['./add-reservation.component.css']
// })
//   export class AddReservationComponent implements AfterViewInit {
//       @ViewChild('calendarEl') calendarEl!: ElementRef;
//       calendar!: Calendar;
//       isStartDateSelected: boolean = false;
//     id!: string; // Id salle
//     idr!: string; // Id reservation
//     reserv!: ReservationSalle;
//     listReservation: ReservationSalle[] = [];
//     reservationSalle: FormGroup;
//     showConfirmationMessage: boolean = false; // Variable pour contrôler l'affichage du message de confirmation
  
//     constructor(
//       private RS: ReservationSalleService,
//       private router: Router,
//       private ar: ActivatedRoute
//     ) {
//       this.id = this.ar.snapshot.params['id']; // Récupérer id salle de la route
//       this.idr = this.ar.snapshot.params['idr']; // Récupérer id reservation de la route
  
//       // Initialize the form with idSalle from the route
//       this.reservationSalle = new FormGroup({
//         dateDebut: new FormControl('', [Validators.required, this.dateValidator]),
//         dateFin: new FormControl('', [Validators.required, this.dateValidator]),
//         idSalle: new FormControl(this.id),
//         email: new FormControl('', [Validators.email]),
//         idUser: new FormControl('6669fc80f57f35325b9fd8fa')
//       });
  
//       // Fetch the list of reservations
//       this.RS.getReservations().subscribe({
//         next: (response) => {
//           this.listReservation = response;
//         },
//         error: (er) => alert(er.message)
//       });
  
//       // Fetch reservation by id if id is defined
//       if (this.idr !== undefined) {
//         this.RS.getReservationById(this.idr).subscribe({
//           next: (data) => {
//             this.reservationSalle.patchValue({
//               dateDebut: this.convertDateToDDMMYYYY(this.dateToString(data.dateDebut)),
//               dateFin: this.convertDateToDDMMYYYY(this.dateToString(data.dateFin)),
//               idSalle: data.idSalle,
//               email: data.email,
//               idUser: data.idUser,
//             });
//             this.reserv = data;
//           },
//           error: (err) => alert(err.message)
//         });
//       }
//     }
  
//     ngOnInit(): void {}

//     ngAfterViewInit() {
//       const currentDate = new Date(); // Obtenir la date actuelle
//       this.calendar = new Calendar(this.calendarEl.nativeElement, {
//         plugins: [dayGridPlugin, interactionPlugin],
//         selectable: true,
//         validRange: {
//           start: currentDate.toISOString().substring(0, 10), // Format YYYY-MM-DD
//         },
//         select: this.handleDateSelect.bind(this)
//       });
//       this.calendar.render();
//     }
  
//     handleDateSelect(info: any) {
//       if (!this.isStartDateSelected) {
//         // Si la date de début n'est pas encore sélectionnée
//         this.isStartDateSelected = true;
//         this.reservationSalle.patchValue({
//           dateDebut: info.startStr,
//           dateFin: '' // Laisser la date de fin vide initialement
//         });
//       } else {
//         // Si la date de début est déjà sélectionnée
//         // Soustraire un jour de la date de fin pour corriger l'ajout d'un jour
//         const endDate = new Date(info.endStr);
//         endDate.setDate(endDate.getDate() - 1);
  
//         this.reservationSalle.patchValue({
//           dateFin: endDate.toISOString().substr(0, 10) // Format YYYY-MM-DD
//         });
//         this.isStartDateSelected = false; // Réinitialiser le statut de sélection de la date de début
//       }
//     }
    
  
//     add() {
//       // Convert dates to YYYY-MM-DD before sending to the backend
//       const dateDebut = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateDebut')?.value);
//       const dateFin = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateFin')?.value);
//       const formData = {
//         ...this.reservationSalle.value,
//         dateDebut: dateDebut,
//         dateFin: dateFin
//       };
  
//       if (this.idr !== undefined) {
//         // Mettre à jour la réservation
//         this.RS.updateReservation(this.idr, formData).subscribe({
//           next: () => {
//             this.showConfirmationMessage = true; // Afficher le message de confirmation
//             setTimeout(() => {
//               this.router.navigate(['/reservation']); // Rediriger après un délai
//             }, 3000); // Rediriger après 3 secondes (3000 ms)
//           },
//           error: (e) => alert(e.message),
//         });
//       } else {
//         // Ajouter une nouvelle réservation
//         this.RS.addReservation(formData).subscribe({
//           next: () => {
//             this.showConfirmationMessage = true; // Afficher le message de confirmation
//             setTimeout(() => {
//               this.router.navigate(['/reservation']); // Rediriger après un délai
//             }, 3000); // Rediriger après 3 secondes (3000 ms)
//           },
//           error: (e) => alert(e.message),
//         });
//       }
//     }
  
//     // Custom validator for dd/mm/yyyy date format
//     dateValidator(control: FormControl): { [key: string]: boolean } | null {
//       const dateValue = control.value;
//       const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
//       if (!dateValue.match(dateRegex)) {
//         return { 'invalidDate': true };
//       }
//       return null;
//     }
  
//     // Convert dd/mm/yyyy to yyyy-mm-dd
//     convertDateToYYYYMMDD(date: string): string {
//       const [day, month, year] = date.split('/');
//       return `${year}-${month}-${day}`;
//     }
  
//     // Convert yyyy-mm-dd to dd/mm/yyyy
//     convertDateToDDMMYYYY(date: string): string {
//       const [year, month, day] = date.split('-');
//       return `${day}/${month}/${year}`;
//     }
  
//     // Convert Date object to yyyy-mm-dd string
//     dateToString(date: Date): string {
//       const year = date.getFullYear();
//       const month = ('0' + (date.getMonth() + 1)).slice(-2);
//       const day = ('0' + date.getDate()).slice(-2);
//       return `${year}-${month}-${day}`;
//     }
//   }

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationSalle } from 'src/app/core/models/reservationSalle';
import { ReservationSalleService } from 'src/app/core/services/reservation-salle.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit, AfterViewInit {
  @ViewChild('calendarEl') calendarEl!: ElementRef;
  calendar!: Calendar;
  isStartDateSelected: boolean = false;
  id!: string; // Id salle
  idr!: string; // Id reservation
  reserv!: ReservationSalle;
  listReservation: ReservationSalle[] = [];
  reservationSalle: FormGroup;
  showConfirmationMessage: boolean = false; // Variable pour contrôler l'affichage du message de confirmation

  constructor(
    private RS: ReservationSalleService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id']; // Récupérer id salle de la route
    this.idr = this.ar.snapshot.params['idr']; // Récupérer id reservation de la route

    // Initialize the form with idSalle from the route
    this.reservationSalle = new FormGroup({
      dateDebut: new FormControl('', [Validators.required, this.dateValidator]),
      dateFin: new FormControl('', [Validators.required, this.dateValidator]),
      idSalle: new FormControl(this.id),
      email: new FormControl('', [Validators.email]),
      idUser: new FormControl('6669fc80f57f35325b9fd8fa')
    });
  }

  ngOnInit(): void {
  // Fetch the list of reservations
  this.RS.getReservations().subscribe({
    next: (response) => {
      this.listReservation = response;
      // Initialize the calendar after fetching reservations
      this.initializeCalendar();
    },
    error: (er) => alert(er.message)
  });

  // Fetch reservation by id if id is defined
  if (this.idr !== undefined) {
    this.RS.getReservationById(this.idr).subscribe({
      next: (data) => {
        this.reservationSalle.patchValue({
          dateDebut: this.convertDateToDDMMYYYY(this.dateToString(data.dateDebut)),
          dateFin: this.convertDateToDDMMYYYY(this.dateToString(data.dateFin)),
          idSalle: data.idSalle,
          email: data.email,
          idUser: data.idUser,
        });
        this.reserv = data;
      },
      error: (err) => alert(err.message)
    });
  }
}

  ngAfterViewInit() {
    if (this.listReservation.length > 0) {
      this.initializeCalendar();
    }
  }

  initializeCalendar() {
    const currentDate = new Date(); // Obtenir la date actuelle
  
    // Transform reservations to events for disabling dates
    const disabledDates = this.listReservation.map(reservation => {
      // Ajoutez un jour à la date de fin pour qu'elle soit inclusive
      const endDate = new Date(reservation.dateFin);
      endDate.setDate(endDate.getDate() + 1);
  
      return {
        start: this.dateToString(new Date(reservation.dateDebut)),
        end: this.dateToString(endDate), // Utilisez la date de fin ajustée
        display: 'background',
        overlap: false,
        color: 'gray'
      };
    });
  
    this.calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      validRange: {
        start: currentDate.toISOString().substring(0, 10), // Format YYYY-MM-DD
      },
      events: disabledDates,
      eventOverlap: false,
      selectOverlap: (event) => {
        return event.display !== 'background';
      },
      select: this.handleDateSelect.bind(this)
    });
  
    this.calendar.render();
  }
  
  handleDateSelect(info: any) {
    if (!this.isStartDateSelected) {
      // Si la date de début n'est pas encore sélectionnée
      this.isStartDateSelected = true;
      this.reservationSalle.patchValue({
        dateDebut: info.startStr,
        dateFin: '' // Laisser la date de fin vide initialement
      });
    } else {
      // Si la date de début est déjà sélectionnée
      // Soustraire un jour de la date de fin pour corriger l'ajout d'un jour
      const endDate = new Date(info.endStr);
      endDate.setDate(endDate.getDate() - 1);

      this.reservationSalle.patchValue({
        dateFin: endDate.toISOString().substr(0, 10) // Format YYYY-MM-DD
      });
      this.isStartDateSelected = false; // Réinitialiser le statut de sélection de la date de début
    }
  }

  add() {
    // Convert dates to YYYY-MM-DD before sending to the backend
    const dateDebut = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateDebut')?.value);
    const dateFin = this.convertDateToYYYYMMDD(this.reservationSalle.get('dateFin')?.value);
    const formData = {
      ...this.reservationSalle.value,
      dateDebut: dateDebut,
      dateFin: dateFin
    };

    if (this.idr !== undefined) {
      // Mettre à jour la réservation
      this.RS.updateReservation(this.idr, formData).subscribe({
        next: () => {
          this.showConfirmationMessage = true; // Afficher le message de confirmation
          setTimeout(() => {
            this.router.navigate(['/reservation']); // Rediriger après un délai
          }, 3000); // Rediriger après 3 secondes (3000 ms)
        },
        error: (e) => alert(e.message),
      });
    } else {
      // Ajouter une nouvelle réservation
      this.RS.addReservation(formData).subscribe({
        next: () => {
          this.showConfirmationMessage = true; // Afficher le message de confirmation
          setTimeout(() => {
            this.router.navigate(['/reservation']); // Rediriger après un délai
          }, 3000); // Rediriger après 3 secondes (3000 ms)
        },
        error: (e) => alert(e.message),
      });
    }
  }

  // Custom validator for dd/mm/yyyy date format
  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const dateValue = control.value;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateValue.match(dateRegex)) {
      return { 'invalidDate': true };
    }
    return null;
  }

  // Convert dd/mm/yyyy to yyyy-mm-dd
  convertDateToYYYYMMDD(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  // Convert yyyy-mm-dd to dd/mm/yyyy
  convertDateToDDMMYYYY(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  // Convert Date object to yyyy-mm-dd string
  dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
