import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionStatistiquesRoutingModule } from './gestion-statistiques-routing.module';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GetStatistiquesComponent } from './component/get-statistiques/get-statistiques.component';


@NgModule({
  declarations: [
    
    DashboardComponent,
         GetStatistiquesComponent
  ],
  imports: [
    CommonModule,
    GestionStatistiquesRoutingModule
  ]
})
export class GestionStatistiquesModule { }
