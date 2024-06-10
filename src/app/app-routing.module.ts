import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { ReclamationDetailsComponent } from './reclamation-details/reclamation-details.component';

const routes: Routes = [
  {path:"",component:ReclamationsComponent},
  {path:"fromrec",component:ReclamationFormComponent},
  {path:"service",component:ListServiceComponent},
  {path:"service/:id",component:ReclamationDetailsComponent},
  {path:"update/:id",component:ReclamationFormComponent},
  {path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
