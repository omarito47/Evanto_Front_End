import { Component, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/services/category/category.service';

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
    private ar: ActivatedRoute,
    private fb: FormBuilder
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

  category: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: [null],
  });

  add() {
    if (this.category.invalid) {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', this.category.value.name);
    formData.append('description', this.category.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const action =
      this.id !== undefined
        ? this.catService.updateCategory(this.id, this.category.value)
        : this.catService.addCategory(formData);

    action.subscribe({
      next: () => {
        Swal.fire({
          title: 'Success',
          text: `Category has been ${
            this.id !== undefined ? 'updated' : 'added'
          } successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/category']);
        });
      },
      error: (e) => {
        let errorMessage = `There was an error ${
          this.id !== undefined ? 'updating' : 'adding'
        } the category: ${e.message}`;

        // Improved error handling to check the error message
        if (
          e.status === 400 &&
          e.error.message === 'Category name must be unique.'
        ) {
          errorMessage = 'Category name must be unique.';
        } else if (e.status === 500) {
          errorMessage = 'Category name must be unique.';
        }

        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.category.patchValue({ image: this.selectedFile });
    const reader = new FileReader();
    reader.onload = () => {
      this.currentImageUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
