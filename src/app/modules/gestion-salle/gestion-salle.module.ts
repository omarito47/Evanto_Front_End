import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionSalleRoutingModule } from './gestion-salle-routing.module';
import { SalleComponent } from './component/salle/salle.component';
import { AddsalleComponent } from './component/addsalle/addsalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTypeSalleComponent } from './component/add-type-salle/add-type-salle.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsSalleComponent } from './component/details-salle/details-salle.component';
import { SallesClientComponent } from './component/salles-client/salles-client.component';
import { DetailsalleClientComponent } from './component/detailsalle-client/detailsalle-client.component';



@NgModule({
  declarations: [
    SalleComponent,
    AddsalleComponent,
    AddTypeSalleComponent,
    DetailsSalleComponent,
    SallesClientComponent,
    DetailsalleClientComponent
   
  ],
  imports: [
    CommonModule,
    GestionSalleRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class GestionSalleModule { }
