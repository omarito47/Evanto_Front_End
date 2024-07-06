import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationComponent } from './component/add-evaluation/add-evaluation.component';
import { AdminEvaluationComponent } from './component/admin-evaluation/admin-evaluation.component';
import { DetailEvaluationComponent } from './component/detail-evaluation/detail-evaluation.component';

const routes: Routes = [
  { path: 'add-evaluation/:atelierId', component: AddEvaluationComponent }, // Route avec paramètre atelierId
  { path: 'evaluation/list', component: AdminEvaluationComponent },
  { path: 'atelier/:id', component: DetailEvaluationComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEvaluationRoutingModule { }
