import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  listProducts: Product[] = [];
  listProductSearched: Product[] = [];
  searchText: string = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getAllProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.listProducts = response.data;

          // Check if paginationResult exists and contains totalItems
          if (
            response.paginationResult &&
            response.paginationResult.totalItems !== undefined
          ) {
            this.totalPages = Math.ceil(
              response.paginationResult.totalItems / this.pageSize
            );
            console.log('Total pages:', this.totalPages);
          } else {
            console.error('Invalid pagination data in response:', response);
            // Handle or log the issue with pagination data
          }

          this.listProductSearched = [...this.listProducts]; // Initialize listProductSearched with all products
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          // Handle error loading products
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
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
        // Handle error deleting product
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

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
