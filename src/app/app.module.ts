import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AtelierComponent } from './modules/atelier/atelier.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { ProductComponent } from './ProductComponents/product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddProductComponent } from './ProductComponents/add-product/add-product.component';
import { CategoryComponent } from './CategoryComponents/category/category.component';
import { AddCategoryComponent } from './CategoryComponents/add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsCategoryComponent } from './CategoryComponents/details-category/details-category.component';
import { DetailsProductComponent } from './ProductComponents/details-product/details-product.component';

@NgModule({
  declarations: [AppComponent, AtelierComponent, WelcomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
