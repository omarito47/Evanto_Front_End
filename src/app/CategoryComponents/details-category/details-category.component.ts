import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category';
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
    // this.category = this.cat.getCategoryById(this.ar.snapshot.params['id']);
  }
}
