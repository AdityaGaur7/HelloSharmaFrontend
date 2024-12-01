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

 DUMMY_POOJAS: Pooja[] = [
    {
      id: 1,
      title: 'Ganesh Puja',
      description: 'A sacred ceremony to invoke Lord Ganesh for blessings.',
      date: '2024-12-01',
      image: 'https://example.com/images/ganesh.jpg',
      link: 'https://example.com/ganesh-puja'
    },
    {
      id: 2,
      title: 'Navagraha Homa',
      description: 'A ritual for pacifying the nine planets for peace and prosperity.',
      date: '2024-12-05',
      image: 'https://example.com/images/navagraha.jpg',
      link: 'https://example.com/navagraha-homa'
    },
    {
      id: 3,
      title: 'Rudra Abhishekam',
      description: 'A powerful Vedic ritual dedicated to Lord Shiva.',
      date: '2024-12-10',
      image: 'https://example.com/images/rudra.jpg',
      link: 'https://example.com/rudra-abhishekam'
    },
    {
      id: 4,
      title: 'Durga Saptashati Path',
      description: 'A recitation of 700 verses in praise of Goddess Durga.',
      date: '2024-12-15',
      image: 'https://example.com/images/durga.jpg',
      link: 'https://example.com/durga-path'
    },
    {
      id: 5,
      title: 'Satyanarayan Katha',
      description: 'A popular ritual to seek blessings for prosperity and happiness.',
      date: '2024-12-20',
      image: 'https://example.com/images/satyanarayan.jpg',
      link: 'https://example.com/satyanarayan-katha'
    }
  ];

  

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
