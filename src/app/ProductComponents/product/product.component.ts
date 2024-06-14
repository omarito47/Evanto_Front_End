import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  listProducts: Product[] = [];
  listProductSearched: Product[] = [];
  searchText: string = '';
  etatRchercher: string = '';
  serviceidSearch: string = 'all';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.listProducts = response.data;
        this.listProductSearched = [...this.listProducts];
        console.log('All products loaded:', this.listProducts);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  delete(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.listProducts = this.listProducts.filter(
          (product) => product._id !== id
        );
        this.listProductSearched = this.listProductSearched.filter(
          (product) => product._id !== id
        );
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  searchProduct(event: any): void {
    const key = event.target.value.trim(); // Trim whitespace
    this.searchText = key; // Update searchText

    console.log('Search key:', key); // Debugging log

    if (key.length >= 2) {
      this.productService.chercherProduct(key).subscribe(
        (response) => {
          console.log('Search results:', response); // Debugging log
          this.listProductSearched = response; // Update listProductSearched with search results
        },
        (error) => {
          console.error('Error searching product', error); // Log error
          this.listProductSearched = []; // Reset listProductSearched on error
        }
      );
    } else {
      this.listProductSearched = [...this.listProducts]; // Reset to all products if searchText is less than 2 characters
      console.log(
        'Reset search, showing all products:',
        this.listProductSearched
      ); // Debugging log
    }
  }
}
