import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/products/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  id!: string;
  prod!: Product;
  selectedFile: File | null = null;
  listCategories: Category[] = [];
  fileInput!: ElementRef<HTMLInputElement>;
  currentImageUrl: string | ArrayBuffer | null = null;

  constructor(
    private prodService: ProductService,
    private categService: CategoryService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.categService.getAllCategorys().subscribe({
      next: (response) => {
        this.listCategories = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error); // Debug log
      },
    });
    if (this.id != undefined) {
      this.prodService.getProductById(this.id).subscribe({
        next: (res) => {
          this.product.patchValue({
            title: res.data.title,
            description: res.data.description,
            image: res.data.image,
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
  product: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(),
    price: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(null),
  });

  submitForm() {
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
          next: () => this.router.navigate(['/product']),
        })
      : this.prodService.addProduct(formData).subscribe({
          next: () => this.router.navigate(['/product']),
          error: (e) => alert(e.message),
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
