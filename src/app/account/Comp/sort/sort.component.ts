import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  standalone:true,
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
  imports:[]
})
export class SortComponent {
  @Output() sortChanged = new EventEmitter<string>();

  sortChange(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.sortChanged.emit(sortValue);
  }
}
