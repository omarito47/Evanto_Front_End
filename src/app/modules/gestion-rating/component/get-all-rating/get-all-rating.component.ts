import { Component, OnInit } from '@angular/core';
import { Rating } from 'src/app/core/model/rating';
import { RatingSalleService } from 'src/app/core/services/rating-salle.service';

@Component({
  selector: 'app-get-all-rating',
  templateUrl: './get-all-rating.component.html',
  styleUrls: ['./get-all-rating.component.scss']
})
export class GetAllRatingComponent implements OnInit {

  ratings: Rating[] = [];

  constructor(private ratingService: RatingSalleService) { }

  ngOnInit(): void {
    this.fetchRatings();
  }

  fetchRatings() {
    this.ratingService.getRatings()
      .subscribe(
        (data) => {
          this.ratings = data;
          console.log('Ratings récupérés avec succès :', this.ratings);
        },
        (error) => {
          console.error('Erreur lors de la récupération des ratings :', error);
        }
      );
  }
}
