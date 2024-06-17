import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAtelierComponent } from './components/add-atelier/add-atelier.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { AteliersComponent } from './components/ateliers/ateliers.component';
import { AtelierService } from './services/atelier.service';
import { ReactiveFormsModule } from '@angular/forms'; // Ajouté

@NgModule({
  declarations: [
    AppComponent,
    AddAtelierComponent,
    AddCategorieComponent,
    CategorieComponent,
    AteliersComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // Ajouté
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
