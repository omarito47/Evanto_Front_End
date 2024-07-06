import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCategorieRoutingModule } from './gestion-categorie-routing.module';

import { AddCategorieComponent } from './component/add-categorie/add-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListCategorieComponent } from './component/list-categorie/list-categorie.component';


@NgModule({
  declarations: [
    
    AddCategorieComponent,
         ListCategorieComponent,
      
  ],
  imports: [
    CommonModule,
    GestionCategorieRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
     //NgModule
     FormsModule
  ]
})
export class GestionCategorieModule { }
