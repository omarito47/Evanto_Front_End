import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAtelierComponent } from './components/add-atelier/add-atelier.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { AteliersComponent } from './components/ateliers/ateliers.component';


const routes: Routes = [
  { path: 'atelier', component: AddAtelierComponent },
  { path: 'categorie', component: AddCategorieComponent },
  { path: 'getcategorie', component: CategorieComponent },
  { path: 'getatelier', component: AteliersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
