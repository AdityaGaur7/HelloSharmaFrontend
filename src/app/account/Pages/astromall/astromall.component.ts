import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AstroStoreService } from '../../services/astrostore.service';
import { AstroStore } from '../../models/astro-store.model';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../MainComp/footer/footer.component';
import { NavComponent } from '../../MainComp/nav2/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-astromall',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    FooterComponent,
    NavComponent,
    NgbModule,
  ],
  templateUrl: './astromall.component.html',
  styleUrls: ['./astromall.component.css'],
})
export class AstromallComponent implements OnInit {
  products: AstroStore[] = [];
  filteredProducts: AstroStore[] = [];
  searchText: string = '';
  categories: string[] = [
    'All Products',
    'Gemstones',
    'Rudraksha',
    'Yantra',
    'Pooja Items',
  ];

  constructor(private astroStoreService: AstroStoreService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.astroStoreService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(): void {
    if (!this.searchText.trim()) {
      this.filteredProducts = this.products;
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }
  }

  showDetails(product: AstroStore): void {
    // Implement modal show logic
  }
}
