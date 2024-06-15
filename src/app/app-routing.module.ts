import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TypeSalleComponent } from './salle-components/type-salle/type-salle.component';
import { AddSalleComponent } from './salle-components/add-salle/add-salle.component';
import { DetailsSalleComponent } from './salle-components/details-salle/details-salle.component';
import { SallesComponent } from './salle-components/salles/salles.component';
const routes: Routes = [
  

  {
    path: 'salle',
    children: [
      { path: '', component: SallesComponent },
      { path: 'add', component: AddSalleComponent },
      { path: 'update/:id', component: AddSalleComponent }, 
      { path: 'details/:id', component: DetailsSalleComponent },
      { path: 'type', component: TypeSalleComponent },

  
    ],
  },

{path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
