import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/model/product';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/model/category';

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
  selectedCategory: string | null = '';

  constructor(
    private productService: ProductService, // adjust to your service
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
        console.error('Error fetching categories:', error);
      },
    });
  }

  loadProducts(): void {
    this.productService
      .getAllProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.listProducts = response.data;
          if (
            response.paginationResult &&
            response.paginationResult.totalItems !== undefined
          ) {
            this.totalPages = Math.ceil(
              response.paginationResult.totalItems / this.pageSize
            );
          }
          this.listProductSearched = [...this.listProducts];
          this.applyFilters();
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  searchProduct(event: any): void {
    const key = event.target.value.trim();
    this.searchText = key;

    if (key.length >= 2) {
      this.productService.chercherProduct(key).subscribe(
        (response) => {
          this.listProductSearched = response;
          this.applyFilters(); // Apply category filter after search
        },
        (error) => {
          console.error('Error searching product', error);
          this.listProductSearched = [];
        }
      );
    } else {
      this.listProductSearched = [...this.listProducts];
      this.applyFilters(); // Apply category filter without search
    }
  }

  applyFilters(): void {
    let filteredProducts = [...this.listProducts];

    if (this.searchText.length >= 2) {
      filteredProducts = this.filterBySearch(filteredProducts);
    }

    filteredProducts = this.filterByCategory(filteredProducts);

    this.listProductSearched = filteredProducts;
  }

  filterBySearch(products: Product[]): Product[] {
    const key = this.searchText.toLowerCase().trim();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(key) ||
        product.description.toLowerCase().includes(key)
    );
  }

  filterByCategory(products: Product[]): Product[] {
    if (this.selectedCategory) {
      return products.filter(
        (product) => product.category?._id === this.selectedCategory
      );
    } else {
      return products;
    }
  }
  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.router.navigateByUrl('/cart-page');
  }
}
