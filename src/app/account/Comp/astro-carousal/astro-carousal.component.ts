import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-astro-carousal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './astro-carousal.component.html',
  styleUrl: './astro-carousal.component.css'
})
export class AstroCarousalComponent {
  images = [
    { url: 'https://th.bing.com/th/id/OIP.q7hrrlJmYEnTavqubhP6fwHaE8?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', altText: 'First slide' },
    { url: 'https://th.bing.com/th/id/OIP.eIEz73xZoLmYwqTF92FciwHaEw?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', altText: 'Second slide' },
    { url: 'https://th.bing.com/th/id/OIP.u1RQwbDwuyQRyLAdWMvmiwHaFj?w=208&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', altText: 'Third slide' },
    // { url: '../../assets/images/k4.webp', altText: 'Fourth slide' },
    // { url: '../../assets/images/k5.webp', altText: 'Fifth slide' },
    // { url: '../../assets/images/k6.webp', altText: 'Sixth slide' }
  ];
}
