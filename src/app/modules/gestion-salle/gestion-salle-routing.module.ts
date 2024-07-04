import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalleComponent } from './component/salle/salle.component';
import { AddsalleComponent } from './component/addsalle/addsalle.component';
import { AddTypeSalleComponent } from './component/add-type-salle/add-type-salle.component';
import { DetailsSalleComponent } from './component/details-salle/details-salle.component';
import { SallesClientComponent } from './component/salles-client/salles-client.component';
import { DetailsalleClientComponent } from './component/detailsalle-client/detailsalle-client.component';

const routes: Routes = [
  { path: 'listSalle', component: SalleComponent },
  { path: 'salle/add', component: AddsalleComponent },
  { path: 'update/:id', component: AddsalleComponent },
  { path: 'addTypeSalle', component: AddTypeSalleComponent },
  { path: 'detailsSalle/:id', component: DetailsSalleComponent },
  //client
  { path: 'listSalleClient', component:SallesClientComponent },
  { path: 'detailSalleClient/:id', component:DetailsalleClientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSalleRoutingModule { }
