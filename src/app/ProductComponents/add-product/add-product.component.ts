import { Component } from '@angular/core';
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

  constructor(
    private prodService: ProductService,
    private categService: CategoryService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.id = this.ar.snapshot.params['id'];
    this.categService.getAllCategorys().subscribe({
      next: (response) => {
        console.log('Fetched categories:', response.data); // Debug log
        this.listCategories = response.data;
        console.log('listCategorys:', this.listCategories); // Debug log
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
    image: new FormControl(''),
  });

  submitForm() {
    this.id != undefined
      ? this.prodService.updateProduct(this.id, this.product.value).subscribe({
          next: () => this.router.navigate(['/product']),
        })
      : console.log(this.product.value);
    this.prodService.addProduct(this.product.value).subscribe({
      next: () => this.router.navigate(['/product']),
      error: (e) => alert(e.message),
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.product.patchValue({ image: this.selectedFile });
  }
}
