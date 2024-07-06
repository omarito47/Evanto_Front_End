import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEvaluationRoutingModule } from './gestion-evaluation-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddEvaluationComponent } from './component/add-evaluation/add-evaluation.component';
import { AdminEvaluationComponent } from './component/admin-evaluation/admin-evaluation.component';
import { DetailEvaluationComponent } from './component/detail-evaluation/detail-evaluation.component';


@NgModule({
  declarations: [
   
   
      
        AddEvaluationComponent,
                       AdminEvaluationComponent,
                       DetailEvaluationComponent,
             
  ],
  imports: [
    CommonModule,
    GestionEvaluationRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
     //NgModule
     FormsModule,
   
  ]
})
export class GestionEvaluationsModule { }
