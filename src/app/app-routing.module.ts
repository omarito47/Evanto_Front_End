import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './ProductComponents/product/product.component';
import { CategoryComponent } from './CategoryComponents/category/category.component';
import { AddCategoryComponent } from './CategoryComponents/add-category/add-category.component';
import { DetailsCategoryComponent } from './CategoryComponents/details-category/details-category.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'category',
    children: [
      { path: '', component: CategoryComponent },
      { path: 'addCategory', component: AddCategoryComponent },
      { path: 'addCategory/:id', component: AddCategoryComponent }, // Route with parameter
      { path: 'details/:id', component: DetailsCategoryComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
