import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRatingRoutingModule } from './gestion-rating-routing.module';
import { AddRatingComponent } from './component/add-rating/add-rating.component';
import { GetAllRatingComponent } from './component/get-all-rating/get-all-rating.component';


@NgModule({
  declarations: [
    AddRatingComponent,
    GetAllRatingComponent
  ],
  imports: [
    CommonModule,
    GestionRatingRoutingModule
  ]
})
export class GestionRatingModule { }
