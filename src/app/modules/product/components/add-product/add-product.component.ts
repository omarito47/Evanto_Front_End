import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  id!: string;
  prod!: Product;
  selectedFile: File | null = null;
  listCategories: Category[] = [];
  currentImageUrl: string | ArrayBuffer | null = null;

  product: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private prodService: ProductService,
    private categService: CategoryService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.product = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.categService.getAllCategorys().subscribe({
      next: (response) => {
        this.listCategories = response.data;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error fetching categories: ' + error.message,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      },
    });
    if (this.id != undefined) {
      this.prodService.getProductById(this.id).subscribe({
        next: (res) => {
          this.product.patchValue({
            title: res.data.title,
            description: res.data.description,
            quantity: res.data.quantity,
            price: res.data.price,
            category: res.data.category._id,
          });
          this.currentImageUrl = res.data.image;
          this.prod = res.data;
        },
      });
    }
  }

  submitForm() {
    if (this.product.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', this.product.value.title);
    formData.append('description', this.product.value.description);
    formData.append('price', this.product.value.price);
    formData.append('quantity', this.product.value.quantity);
    formData.append('category', this.product.value.category);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.id != undefined
      ? this.prodService.updateProduct(this.id, formData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Success',
              text: 'Product updated successfully',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => this.router.navigate(['/product']));
          },
          error: (e) => {
            Swal.fire({
              title: 'Error',
              text: 'Error updating product: ' + e.message,
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK',
            });
          },
        })
      : this.prodService.addProduct(formData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Success',
              text: 'Product added successfully',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => this.router.navigate(['/product']));
          },
          error: (e) => {
            Swal.fire({
              title: 'Error',
              text: 'Error adding product: ' + e.message,
              icon: 'error',
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK',
            });
          },
        });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.product.patchValue({ image: this.selectedFile });
    const reader = new FileReader();
    reader.onload = () => {
      this.currentImageUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
