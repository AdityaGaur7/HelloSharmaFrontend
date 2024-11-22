import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AstroStoreService } from '../../services/astrostore.service';
import { AstroStore } from '../../models/astro-store.model';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../MainComp/footer/footer.component';
import { NaviComponent } from '../../MainComp/nav2/nav.component';


@Component({
  selector: 'app-astromall',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,FooterComponent,NaviComponent],
  templateUrl: './astromall.component.html',
  styleUrls: ['./astromall.component.css'], // Corrected styleUrls
})
export class AstromallComponent implements OnInit {
  products: AstroStore[] = [];
  filteredProducts: AstroStore[] = []; // New property to hold filtered products
  searchText: string = ''; // Property to bind the search input

  constructor(private astroStoreService: AstroStoreService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.astroStoreService.getAllProducts().subscribe(
      (data) => {
        console.log(data);
        this.products = data;
        this.filteredProducts = data; // Initialize filteredProducts
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(): void {
    const searchTextLower = this.searchText.toLowerCase(); // Convert search text to lower case
    if (this.searchText.trim() === '') {
      this.filteredProducts = this.products; // Reset to all products
    } else {
      // Filter products based on title and description
      this.filteredProducts = this.products.filter((product) =>
        (product.title && product.title.toLowerCase().includes(searchTextLower)) ||
        (product.description && product.description.toLowerCase().includes(searchTextLower))
      );
    }
  }
}
