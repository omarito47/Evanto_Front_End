import { Component } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  listProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe({
      next: (response) => (this.listProducts = response.data),
    });
  }
}
