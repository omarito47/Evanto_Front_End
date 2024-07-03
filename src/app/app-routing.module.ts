import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAtelierComponent } from './components/add-atelier/add-atelier.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { AteliersComponent } from './components/ateliers/ateliers.component';
import { AddParticipationComponent } from './components/participation-client/add-participation/add-participation.component';
import { ListParticipationComponent } from './components/participation-client/list-participation/list-participation.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { AddEvaluationComponent } from './components/evaluation/add-evaluation/add-evaluation.component';
import { DashboardComponent } from './components/statistiques/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'atelier', component: AddAtelierComponent },
  { path: 'categorie', component: AddCategorieComponent },
  { path: 'getcategorie', component: CategorieComponent },
  { path: 'get/atelier', component: AteliersComponent },
  { path: 'participation/add', component: AddParticipationComponent },
  { path: 'participation/get', component: ListParticipationComponent },
  { path: 'statistiques/:atelierId', component: StatistiquesComponent }, // Modifier la route pour les statistiques
  { path: 'dashboard/get', component: DashboardComponent }, // Modifier la route pour les statistiques

  { path: 'evaluation/add', component: AddEvaluationComponent },

  { path: '**', redirectTo: '/not-found' } // Rediriger les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
