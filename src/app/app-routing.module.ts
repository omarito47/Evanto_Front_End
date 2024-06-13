import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './ProductComponents/product/product.component';
import { CategoryComponent } from './CategoryComponents/category/category.component';
import { AddCategoryComponent } from './CategoryComponents/add-category/add-category.component';
import { DetailsCategoryComponent } from './CategoryComponents/details-category/details-category.component';
import { AddProductComponent } from './ProductComponents/add-product/add-product.component';
import { DetailsProductComponent } from './ProductComponents/details-product/details-product.component';
import { OrderComponent } from './OrderComponents/order/order.component';

const routes: Routes = [
  {
    path: 'category',
    children: [
      { path: '', component: CategoryComponent },
      { path: 'add', component: AddCategoryComponent },
      { path: 'update/:id', component: AddCategoryComponent }, // update category
      { path: 'details/:id', component: DetailsCategoryComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
  {
    path: 'product',
    children: [
      { path: '', component: ProductComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'update/:id', component: AddProductComponent },
      { path: 'details/:id', component: DetailsProductComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
  {
    path: 'order',
    children: [
      { path: '', component: OrderComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
