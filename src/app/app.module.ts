import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { SallesComponent } from './salle-components/salles/salles.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TypeSalleComponent } from './salle-components/type-salle/type-salle.component';
import { AddSalleComponent } from './salle-components/add-salle/add-salle.component';
import { DetailsSalleComponent } from './salle-components/details-salle/details-salle.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SallesComponent,
    FooterComponent,
    NavbarComponent,
    TypeSalleComponent,
    AddSalleComponent,
    DetailsSalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
