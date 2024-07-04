import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from 'src/app/core/model/rating';
import { RatingSalleService } from 'src/app/core/services/rating-salle.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  id!: string; // Id salle
  idr!: string; // Id rating
  reserv!: Rating;
  listRating: Rating[] = [];
  rating: FormGroup;
  showConfirmationMessage: boolean = false; // Variable pour contrôler l'affichage du message de confirmation
  userId: string | null = null; // Déclaration explicite de userId 

  constructor(
    private ratingService: RatingSalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id']; // Récupérer id salle de la route
    
    const userId = localStorage.getItem('userId') || '';

    // Initialize the form with idSalle from the route
    this.rating = new FormGroup({
      idUser: new FormControl(userId, [Validators.required]),
      idSalle: new FormControl(this.id),
      ratingValue: new FormControl(''),
    });

    // // Fetch the list of reservations
    // this.ratingService.getRatings().subscribe({
    //   next: (response) => {
    //     this.listRating = response;
    //   },
    //   error: (error) => console.error(error)
    // });
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('User ID from localStorage:', this.userId);
    
    this.fetchRatings();
  }

  addOrModifyRating() {
    const ratingData = this.rating.value;
  
    // Check if the user has already rated the room
    const existingRating = this.listRating.find(rating => rating.idSalle === this.id && rating.idUser === ratingData.idUser);
  
    if (existingRating) {
      // Modify the existing rating
      ratingData._id = existingRating._id; // Ajouter l'ID du rating existant dans l'objet ratingData
     } this.ratingService.addUpdateRating(ratingData).subscribe({
        next: () => {
          this.showConfirmationMessage = true;
          // Vous pouvez récupérer la liste des notations mises à jour ici
          this.fetchRatings();
        },
        error: (error) => console.error(error)
      });
    // } else {
    //   // Add a new rating
    //   this.ratingService.addUpdateRating(ratingData).subscribe({
    //     next: () => {
    //       this.showConfirmationMessage = true;
    //       // Vous pouvez récupérer la liste des notations mises à jour ici
    //       this.fetchRatings();
    //     },
    //     error: (error) => console.error(error)
    //   });
    // }
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
