import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';

import { ProductComponent } from './ProductComponents/product/product.component';
import { CategoryComponent } from './CategoryComponents/category/category.component';
import { AddCategoryComponent } from './CategoryComponents/add-category/add-category.component';
import { DetailsCategoryComponent } from './CategoryComponents/details-category/details-category.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.module').then((m) => m.LayouttModule),
  },
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
  
  
  
  
]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
