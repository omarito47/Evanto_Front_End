import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  listCategorys: Category[] = [];
  baseUrl: string = 'http://localhost:8000/';

  constructor(private catService: CategoryService) {
    this.catService.getAllCategorys().subscribe({
      next: (response) => {
        this.listCategorys = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error); // Debug log
      },
    });
  }
  delete(id: string) {
    this.catService.deleteCategory(id).subscribe({
      next: () =>
        (this.listCategorys = this.listCategorys.filter(
          (category) => category._id !== id
        )),
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }

  logCategoryId(categoryId: string) {
    console.log(categoryId);
  }
}
