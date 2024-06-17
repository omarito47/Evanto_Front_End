import { Component, ElementRef } from '@angular/core';
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
  fileInput!: ElementRef<HTMLInputElement>;
  currentImageUrl: string | ArrayBuffer | null = null;

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
          this.currentImageUrl = response.data.image;
          this.cat = response.data;
        },
      });
    }
  }
  category: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(),
    image: new FormControl(null),
  });

  add() {
    const formData = new FormData();
    formData.append('name', this.category.value.name);
    formData.append('description', this.category.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    if (this.id !== undefined) {
      this.catService.updateCategory(this.id, formData).subscribe({
        next: () => this.router.navigate(['/category']),
        error: (e) => alert(e.message),
      });
    } else {
      this.catService.addCategory(formData).subscribe({
        next: () => this.router.navigate(['/category']),
        error: (e) => alert(e.message),
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    // Update the form control value with the selected file
    this.category.patchValue({ image: this.selectedFile });
    const reader = new FileReader();
    reader.onload = () => {
      this.currentImageUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
