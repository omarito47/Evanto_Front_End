import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  listProducts: Product[] = [];
  listProductSearched: Product[] = [];
  searchText: string = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  categories: Category[] = [];
  filters: {
    category: string[];
  } = { category: [] };

  constructor(
    private productService: ProductService,
    private catService: CategoryService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories(): void {
    this.catService.getAllCategorys().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error); // Debug log
      },
    });
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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('click');
    this.router.navigateByUrl('/cart-page');
  }
}
