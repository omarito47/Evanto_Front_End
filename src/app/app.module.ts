import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AtelierComponent } from './modules/atelier/atelier.component';

import { ProductComponent } from './ProductComponents/product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddProductComponent } from './ProductComponents/add-product/add-product.component';
import { CategoryComponent } from './CategoryComponents/category/category.component';
import { AddCategoryComponent } from './CategoryComponents/add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsCategoryComponent } from './CategoryComponents/details-category/details-category.component';
import { DetailsProductComponent } from './ProductComponents/details-product/details-product.component';
import { OrderComponent } from './OrderComponents/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    AtelierComponent,
    ProductComponent,
    NavbarComponent,
    FooterComponent,
    AddProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    DetailsCategoryComponent,
    DetailsProductComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
