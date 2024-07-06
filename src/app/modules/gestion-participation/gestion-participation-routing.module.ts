import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParticipationComponent } from './component/add-participation/add-participation.component';

import { AdminParticipationComponent } from './component/admin-participation/admin-participation.component';
const routes: Routes = [
  { path: 'admin-participations', component: AdminParticipationComponent },

  { path: 'add-participation/:id', component: AddParticipationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionParticipationRoutingModule { }
