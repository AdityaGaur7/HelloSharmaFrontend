import { Component, OnInit } from '@angular/core';
import { PoojaService } from '../../services/pooja.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Pooja } from '../../models/pooja.model';

@Component({
  selector: 'app-bookpooja',
  templateUrl: './bookpooja.component.html',
  styleUrls: ['./bookpooja.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NavComponent,
    FooterComponent,
    NgbModule,
  ],
})
export class BookpoojaComponent implements OnInit {
  poojas: Pooja[] = [];
  filteredPoojas: Pooja[] = [];
  searchText: string = '';

  constructor(private poojaService: PoojaService) {}

  ngOnInit(): void {
    this.loadPoojas();
  }

  loadPoojas(): void {
    this.poojaService.getAllPoojas().subscribe((data) => {
      console.log(data); // Log the received data
      this.poojas = data;
      this.filteredPoojas = data; // Initialize filteredPoojas with all poojas
    });
  }

  filterPoojas(): void {
    if (!this.searchText.trim()) {
      this.filteredPoojas = this.poojas;
    } else {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredPoojas = this.poojas.filter(
        (pooja) =>
          pooja.title.toLowerCase().includes(searchTerm) ||
          pooja.description.toLowerCase().includes(searchTerm)
      );
    }
  }

  showDetails(pooja: Pooja): void {
    // Implement modal show logic
  }
}
