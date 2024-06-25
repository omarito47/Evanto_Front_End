import { Component } from '@angular/core';
import { Rating } from '../core/models/rating';
import { FormControl, FormGroup } from '@angular/forms';
import { RatingSalleService } from '../core/services/rating-salle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rating-salle-client',
  templateUrl: './rating-salle-client.component.html',
  styleUrls: ['./rating-salle-client.component.css']
})
export class RatingSalleClientComponent {
  id!: string; // Id salle
  idr!: string; // Id rating
  reserv!: Rating;
  listRating: Rating[] = [];
  rating: FormGroup;
  showConfirmationMessage: boolean = false; // Variable pour contrôler l'affichage du message de confirmation

  constructor(
    private ratingService: RatingSalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id']; // Récupérer id salle de la route
    this.idr = this.activatedRoute.snapshot.params['idr']; // Récupérer id reservation de la route

    // Initialize the form with idSalle from the route
    this.rating = new FormGroup({
      idUser: new FormControl('6669fc80f57f35325b9fd8fa'),
      idSalle: new FormControl(this.id),
      ratingValue: new FormControl(''),
    });

    // Fetch the list of reservations
    this.ratingService.getRatings().subscribe({
      next: (response) => {
        this.listRating = response;
      },
      error: (error) => console.error(error)
    });
  }

  addOrModifyRating() {
    const ratingData = this.rating.value;
  
    // Check if the user has already rated the room
    const existingRating = this.listRating.find(rating => rating.idSalle === this.id && rating.idUser === ratingData.idUser);
  
    if (existingRating) {
      // Modify the existing rating
      ratingData._id = existingRating._id; // Ajouter l'ID du rating existant dans l'objet ratingData
      this.ratingService.addUpdateRating(ratingData).subscribe({
        next: () => {
          this.showConfirmationMessage = true;
          // Vous pouvez récupérer la liste des notations mises à jour ici
          this.fetchRatings();
        },
        error: (error) => console.error(error)
      });
    } else {
      // Add a new rating
      this.ratingService.addUpdateRating(ratingData).subscribe({
        next: () => {
          this.showConfirmationMessage = true;
          // Vous pouvez récupérer la liste des notations mises à jour ici
          this.fetchRatings();
        },
        error: (error) => console.error(error)
      });
    }
  }
  
  fetchRatings() {
    this.ratingService.getRatings().subscribe({
      next: (response) => {
        this.listRating = response;
      },
      error: (error) => console.error(error)
    });
  }
}
