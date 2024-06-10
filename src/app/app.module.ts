import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';
import { ListServiceComponent } from './list-service/list-service.component';
import { ReclamationDetailsComponent } from './reclamation-details/reclamation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ReclamationsComponent,
    NotFoundComponent,
    ReclamationFormComponent,
    ListServiceComponent,
    ReclamationDetailsComponent
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
