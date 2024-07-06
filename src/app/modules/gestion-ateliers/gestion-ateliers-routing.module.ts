import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAtelierComponent } from './component/add-atelier/add-atelier.component';
import { AteliersComponent } from './component/ateliers/ateliers.component';
import { AtelierLieuComponent } from './component/atelier-lieu/atelier-lieu.component';
import { AtelierClientComponent } from './component/atelier-client/atelier-client.component';


const routes: Routes = [

  { path: 'atelier/add', component: AddAtelierComponent },
  { path: 'atelier/get', component: AteliersComponent },
  { path: 'atelier/lieu', component: AtelierLieuComponent },
  { path: 'atelier/client', component: AtelierClientComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAteliersRoutingModule { }
