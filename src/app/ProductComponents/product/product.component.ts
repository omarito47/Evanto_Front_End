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
  delete(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () =>
        (this.listProducts = this.listProducts.filter(
          (Product) => Product._id !== id
        )),
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }
}
