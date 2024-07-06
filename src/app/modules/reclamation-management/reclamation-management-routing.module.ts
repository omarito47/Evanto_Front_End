import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationsComponent } from './component/reclamations/reclamations.component';
import { ReclamationDetailsComponent } from './component/reclamation-details/reclamation-details.component';
import { ReclamationFormComponent } from './component/reclamation-form/reclamation-form.component';
import { ListServiceComponent } from './component/list-service/list-service.component';
import { GererReclamationComponent } from './component/gerer-reclamation/gerer-reclamation.component';
import { MyReclamationComponent } from './component/my-reclamation/my-reclamation.component';
import { MyReclamationDetailsComponent } from './component/my-reclamation-details/my-reclamation-details.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';

const routes: Routes = [
  { path: 'gererRec', component: GererReclamationComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/list', component: ReclamationsComponent ,canActivate: [AuthGuard]},  
  { path: 'reclamation/list/:id', component: ReclamationDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/add', component: ReclamationFormComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/type', component: ListServiceComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/myrec', component: MyReclamationComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/myrec/:id', component: MyReclamationDetailsComponent ,canActivate: [AuthGuard]},
  {path:"update/:id",component:ReclamationFormComponent,canActivate: [AuthGuard]},

  /**************Clent side********** */
  
  { path: 'add-reclamation', component: ReclamationFormComponent ,canActivate: [AuthGuard]},
  { path: 'mes-reclamations', component: MyReclamationComponent ,canActivate: [AuthGuard]},
  { path: 'mes-reclamations/:id', component: MyReclamationDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'mes-reclamations/update/:id', component: ReclamationFormComponent ,canActivate: [AuthGuard]},
  { path: 'reclamation/type', component: ListServiceComponent ,canActivate: [AuthGuard]},


  {path:"**",component:ReclamationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationManagementRoutingModule { }
