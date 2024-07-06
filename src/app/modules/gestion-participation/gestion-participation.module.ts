import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GestionParticipationRoutingModule } from './gestion-participation-routing.module';
import { AdminParticipationComponent } from './component/admin-participation/admin-participation.component';
import { AddParticipationComponent } from './component/add-participation/add-participation.component';




@NgModule({
  declarations: [
   

  
    AdminParticipationComponent,
            AddParticipationComponent
  ],
  imports: [
    CommonModule,
    GestionParticipationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
  
})
export class GestionParticipationModule { }
