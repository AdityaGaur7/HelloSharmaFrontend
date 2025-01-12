import { Component, OnInit } from '@angular/core';
import { AstrologerService } from '../../services/astrologer.service';
import { Astrologer } from '../../models/astrologer.model';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../../Comp/filter/filter.component';
import { SortComponent } from '../../Comp/sort/sort.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatastro',
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    SortComponent,
    FormsModule,
    FooterComponent,
    NavComponent,
    NgbModule,
  ],
  templateUrl: './chatastro.component.html',
  styleUrls: ['./chatastro.component.css'],
})
export class ChatastroComponent implements OnInit {
  astrologers: Astrologer[] = [];
  filteredAstrologers: Astrologer[] = [];
  searchQuery: string = '';

  constructor(private astrologerService: AstrologerService) {}

  ngOnInit(): void {
    this.loadAstrologers();
  }

  loadAstrologers(): void {
    this.astrologerService.getAllAstrologers().subscribe(
      (data) => {
        this.astrologers = data;
        this.filteredAstrologers = data; // Initialize filtered astrologers
        console.log(this.astrologers);
      },
      (error) => {
        console.error('Error fetching astrologers:', error);
      }
    );
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.applyFilters();
  }

  applyFilters(filters?: { expertise?: string; language?: string }): void {
    this.filteredAstrologers = this.astrologers.filter((astrologer) => {
      const fullName =
        `${astrologer.firstName} ${astrologer.lastName}`.toLowerCase();
      const matchesName = fullName.includes(this.searchQuery.toLowerCase());
      const matchesExpertise = filters?.expertise
        ? astrologer.expertise === filters.expertise
        : true;
      const matchesLanguage = filters?.language
        ? astrologer.languages?.includes(filters.language)
        : true;
      return matchesName && matchesExpertise && matchesLanguage;
    });
  }

  onFilterApplied(filters: { expertise: string; language: string }): void {
    this.applyFilters(filters);
  }

  onSortChanged(sortKey: string): void {
    this.filteredAstrologers.sort((a, b) => {
      if (sortKey === 'name') {
        const fullNameA = `${a.firstName} ${a.lastName}`;
        const fullNameB = `${b.firstName} ${b.lastName}`;
        return fullNameA.localeCompare(fullNameB);
      } else if (sortKey === 'experience') {
        const expA = parseInt(a.experience || '0', 10);
        const expB = parseInt(b.experience || '0', 10);
        return expB - expA; // Sort by experience (descending)
      } else if (sortKey === 'price') {
        const priceA = a.price === 'FREE' ? 0 : parseInt(a.price || '0', 10);
        const priceB = b.price === 'FREE' ? 0 : parseInt(b.price || '0', 10);
        return priceA - priceB; // Sort by price (ascending)
      }
      return 0;
    });
  }
}
