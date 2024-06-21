import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { DetailsCategoryComponent } from './components/details-category/details-category.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  declarations: [
    AddCategoryComponent,
    DetailsCategoryComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
  ],
})
export class CategoryModule {}
