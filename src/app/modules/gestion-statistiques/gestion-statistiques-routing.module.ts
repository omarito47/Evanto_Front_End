import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GetStatistiquesComponent } from './component/get-statistiques/get-statistiques.component';

const routes: Routes = [

  { path: 'dashboard/get', component: DashboardComponent }, // Modifier la route pour les statistiques

  { path: 'statistiques/:atelierId', component:GetStatistiquesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionStatistiquesRoutingModule { }
