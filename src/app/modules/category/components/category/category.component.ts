import { Component } from '@angular/core';
import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  listCategorys: Category[] = [];
  baseUrl: string = 'http://localhost:9090/';

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
  delete(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.catService.deleteCategory(id).subscribe({
          next: () => {
            this.listCategorys = this.listCategorys.filter(
              (category) => category._id !== id
            );
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting category:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the category: ' + error.message,
              'error'
            );
          },
        });
      }
    });
  }

  logCategoryId(categoryId: string) {
    console.log(categoryId);
  }
}
