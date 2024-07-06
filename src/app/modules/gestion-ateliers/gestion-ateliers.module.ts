import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionAteliersRoutingModule } from './gestion-ateliers-routing.module';
import { AddAtelierComponent } from './component/add-atelier/add-atelier.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AteliersComponent } from './component/ateliers/ateliers.component';
import { AtelierLieuComponent } from './component/atelier-lieu/atelier-lieu.component';
import { AtelierClientComponent } from './component/atelier-client/atelier-client.component';

@NgModule({
  declarations: [
   
  
    AddAtelierComponent,
           AteliersComponent,
           AtelierLieuComponent,
           AtelierClientComponent
  ],
  imports: [
    CommonModule,
    GestionAteliersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
     //NgModule
     FormsModule
  ]
})
export class GestionAteliersModule { }
