import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategorieComponent } from './component/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './component/list-categorie/list-categorie.component';

const routes: Routes = [
  { path: 'categorie/list', component: AddCategorieComponent },
  { path: 'categorie/add', component: ListCategorieComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCategorieRoutingModule { }
