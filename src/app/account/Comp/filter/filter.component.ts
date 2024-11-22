import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterApplied = new EventEmitter<any>();
  selectedExpertise: string = '';
  selectedLanguage: string = '';

  expertiseOptions: string[] = ['Vedic', 'Numerology', 'Tarot', 'Palmistry'];
  languageOptions: string[] = ['English', 'Hindi', 'Spanish', 'French'];

  applyFilter() {
    this.filterApplied.emit({ expertise: this.selectedExpertise, language: this.selectedLanguage });
  }
}
