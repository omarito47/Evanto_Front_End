import { Component } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-details-card-product',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css'],
})
export class DetailsCardProductComponent {
  product!: Product;
  id!: string;

  constructor(private ar: ActivatedRoute, private prod: ProductService) {
    console.log('oooo', this.ar.snapshot.params['id']);
    this.prod.getProductById(this.ar.snapshot.params['id']).subscribe({
      next: (response) => {
        console.log('Fetched productes:', response); // Debug log
        this.product = response.data;
        console.log('list:', this.product); // Debug log
      },
      error: (error) => {
        console.error('Error fetching produits:', error); // Debug log
      },
    });
  }
}
