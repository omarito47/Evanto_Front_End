import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAtelierComponent } from './components/add-atelier/add-atelier.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { AteliersComponent } from './components/ateliers/ateliers.component';

import { AddParticipationComponent } from './components/participation-client/add-participation/add-participation.component';
import { ListParticipationComponent } from './components/participation-client/list-participation/list-participation.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';

import { AddEvaluationComponent } from './components/evaluation/add-evaluation/add-evaluation.component';
import { DashboardComponent } from './components/statistiques/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AddAtelierComponent,
    AddCategorieComponent,
    CategorieComponent,
    AteliersComponent,
    
    AddParticipationComponent,
          ListParticipationComponent,
          StatistiquesComponent,
         
          AddEvaluationComponent,
                     DashboardComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Import FormsModule here
    ReactiveFormsModule,
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
