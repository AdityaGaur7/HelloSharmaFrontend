import { CommonModule } from '@angular/common';
import { Component , NgModule, OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-astrologercards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './astrologercards.component.html',
  styleUrl: './astrologercards.component.css'
})
export class AstrologercardsComponent {
  astrologers = [  
    {  
      name: "Dimple",  
      specialty: "Vedic Astrology",  
      image: "../../assets/images/profile.jpg"  
    },  
    {  
      name: "Parminder",  
      specialty: "Vedic Astrology",  
      image: "../../assets/images/profile.jpg" 
    },  
    {  
      name: "Sanjeev",  
      specialty: "Vedic Astrology",  
      image: "../../assets/images/profile.jpg"  
    },  
    {  
      name: "Anjana",  
      specialty: "Vedic Astrology",  
      image: "../../assets/images/profile.jpg"  
    }  
  ];  

  currentIndex = 0;  
  translateX = 0;  

  moveAstrologer(direction: number) {  
    const cardWidth = 250; // Adjust based on your card width  
    const totalAstrologers = this.astrologers.length;  

    this.currentIndex += direction;  

    if (this.currentIndex < 0) {  
      this.currentIndex = totalAstrologers - 1; // Loop to last astrologer  
    } else if (this.currentIndex >= totalAstrologers) {  
      this.currentIndex = 0; // Loop to first astrologer  
    }  

    this.translateX = -this.currentIndex * cardWidth;  
  } 
}
