import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllRatingComponent } from './component/get-all-rating/get-all-rating.component';
import { AddRatingComponent } from './component/add-rating/add-rating.component';

const routes: Routes = [
  { path: 'Ratings', component: GetAllRatingComponent },
  { path: 'addRating', component: AddRatingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRatingRoutingModule { }
