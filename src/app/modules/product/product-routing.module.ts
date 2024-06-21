import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DetailsProductComponent } from './components/details-product/details-product.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
