import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { DetailsCategoryComponent } from './components/details-category/details-category.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: 'category',
    children: [
      { path: '', component: CategoryComponent },
      { path: 'add', component: AddCategoryComponent },
      { path: 'update/:id', component: AddCategoryComponent },
      { path: 'details/:id', component: DetailsCategoryComponent },

      // { path: ':id', component: DetailsResidenceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
