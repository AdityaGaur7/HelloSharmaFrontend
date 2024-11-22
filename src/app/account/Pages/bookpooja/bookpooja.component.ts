import { Component, OnInit } from '@angular/core';
import { PoojaService } from '../../services/pooja.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pooja } from '../../models/pooja.model'; // Adjust the path as necessary
import { NaviComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';


@Component({
  selector: 'app-bookpooja',
  templateUrl: './bookpooja.component.html',
  styleUrls: ['./bookpooja.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule,FooterComponent,NaviComponent]
})
export class BookpoojaComponent implements OnInit {
  poojas: Pooja[] = [];
  filteredPoojas: Pooja[] = [];
  searchText: string = '';

  constructor(private poojaService: PoojaService) {}

  ngOnInit(): void {
    this.getPoojas();
  }

  getPoojas(): void {
    this.poojaService.getAllPoojas().subscribe((data) => {
      console.log(data); // Log the received data
      this.poojas = data;
      this.filteredPoojas = data; // Initialize filteredPoojas with all poojas
    });
  }

  filterPoojas(): void {
    if (this.searchText.trim() === '') {
      this.filteredPoojas = this.poojas;
    } else {
      const searchTextLower = this.searchText.toLowerCase(); // Convert search text to lower case once
      this.filteredPoojas = this.poojas.filter((pooja) => {
        // Check if title or description contains the search text
        return (
          (pooja.title && pooja.title.toLowerCase().includes(searchTextLower)) ||
          (pooja.description && pooja.description.toLowerCase().includes(searchTextLower))
        );
      });
    }
  }
}
