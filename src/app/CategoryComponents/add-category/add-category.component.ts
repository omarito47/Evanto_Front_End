import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../core/services/category/category.service';
import { Category } from '../../core/models/category';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  id!: string;
  cat!: Category;
  selectedFile: File | null = null;

  constructor(
    private catService: CategoryService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    if (this.id != undefined) {
      this.catService.getCategoryById(this.id).subscribe({
        next: (response) => {
          this.category.patchValue({
            name: response.data.name,
            description: response.data.description,
            image: response.data.image,
          });
          this.cat = response.data;
        },
      });
    }
  }
  category: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(),
    image: new FormControl(''),
  });

  add() {
    this.id != undefined
      ? this.catService.updateCategory(this.id, this.category.value).subscribe({
          next: () => this.router.navigate(['/category']),
        })
      : console.log(this.category.value);
    this.catService.addCategory(this.category.value).subscribe({
      next: () => this.router.navigate(['/category']),
      error: (e) => alert(e.message),
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.category.patchValue({ image: this.selectedFile });
  }
}
