import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  images = [
    { url: '../../assets/images/images/image1.png', altText: 'First slide' },
    { url: '../../assets/images/images/image2.png', altText: 'Second slide' },
    { url: '../../assets/images/images/image3.jpg', altText: 'Third slide' },
    { url: '../../assets/images/images/image4.jpg', altText: 'fourth slide' }
  ];

  activeIndex = 0;
  intervalId: any;

  ngOnInit() {
    // Automatically change slides every 3 seconds
    this.intervalId = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 3000);
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
