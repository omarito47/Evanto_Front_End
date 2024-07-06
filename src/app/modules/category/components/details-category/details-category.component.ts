import { Component } from '@angular/core';
import { Category } from 'src/app/core/model/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.css'],
})
export class DetailsCategoryComponent {
  category!: Category;
  id!: string;

  constructor(private ar: ActivatedRoute, private cat: CategoryService) {
    console.log(this.ar.snapshot.params['id']);
    this.cat.getCategoryById(this.ar.snapshot.params['id']).subscribe({
      next: (response) => {
        console.log('Fetched categories:', response); // Debug log
        this.category = response.data;
        console.log('listCategorys:', this.category); // Debug log
      },
      error: (error) => {
        console.error('Error fetching categories:', error); // Debug log
      },
    });
  }
}
