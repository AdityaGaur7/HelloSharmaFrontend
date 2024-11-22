import { Component, OnInit } from '@angular/core';
import { AstrologerService } from '../../services/astrologer.service';
import { Astrologer } from '../../models/astrologer.model';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../Comp/filter/filter.component';
import { SortComponent } from '../../Comp/sort/sort.component';
import { FormsModule } from '@angular/forms';
import { NaviComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';
NaviComponent
FooterComponent
@Component({
  selector: 'app-chatastro',
  standalone: true,
  imports: [CommonModule, FilterComponent, SortComponent,FormsModule,FooterComponent,NaviComponent],
  templateUrl: './chatastro.component.html',
  styleUrls: ['./chatastro.component.css']
})
export class ChatastroComponent implements OnInit {
  astrologers: Astrologer[] = [];
  filteredAstrologers: Astrologer[] = [];
  searchQuery: string = '';

  constructor(private astrologerService: AstrologerService) { }

  ngOnInit(): void {
    this.loadAstrologers();
  }

  loadAstrologers(): void {
    this.astrologerService.getAllAstrologers().subscribe(
      (data) => {
        this.astrologers = data;
        this.filteredAstrologers = data; // Initialize filtered astrologers
      },
      (error) => {
        console.error('Error fetching astrologers:', error);
      }
    );
  }

  onSearch(query: Event): void {
    const target = query.target as HTMLInputElement; // Type the target as HTMLInputElement
    this.searchQuery = target.value; // Access the value
    this.applyFilters();
  }

  applyFilters(filters?: { expertise?: string; language?: string }): void {
    this.filteredAstrologers = this.astrologers.filter(astrologer => {
      const matchesName = astrologer.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesExpertise = filters?.expertise ? astrologer.expertise === filters.expertise : true;
      const matchesLanguage = filters?.language ? astrologer.languages.includes(filters.language) : true;
      return matchesName && matchesExpertise && matchesLanguage;
    });
  }

  onFilterApplied(filters: { expertise: string; language: string }): void {
    this.applyFilters(filters);
  }

  onSortChanged(sortKey: string): void {
    this.filteredAstrologers.sort((a, b) => {
      if (sortKey === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortKey === 'experience') {
        return 1;
        // b.experience - a.experience;
         // Assuming experience is a number
      } else if (sortKey === 'price') {
        return a.price === 'FREE' ? -1 : b.price === 'FREE' ? 1 : +a.price - +b.price; // Sorting logic for price
      }
      return 0;
    });
  }
}
