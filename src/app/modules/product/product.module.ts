import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { DetailsCardProductComponent } from './components/details-card/details-card.component';

@NgModule({
  declarations: [
    AddProductComponent,
    DetailsProductComponent,
    ProductComponent,
    DetailsCardProductComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
  ],
})
export class ProductModule {}
