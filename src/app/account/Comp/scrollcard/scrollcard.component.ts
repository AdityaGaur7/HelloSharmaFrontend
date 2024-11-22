import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-scrollcard',
  standalone:true,
  templateUrl: './scrollcard.component.html',
  styleUrls: ['./scrollcard.component.css'],
  imports: [CommonModule]

})
export class ScrollcardComponent {
  cards = [  
    {  
      title: "Today's Horoscope",  
      description: "Unsure about how your day will unfold? Get free Aries horoscope online prediction from top astrologer. Read your Aries Zodiac Sign Horoscope.",  
      icon: 'bi bi-sun' // Bootstrap Icons  
    },  
    {  
      title: 'Free Kundli',  
      description: "Generate your free online kundli report from Astrotalk. Our Kundli software can help you predict the future for yourself by reading the birth.",  
      icon: 'bi bi-file-earmark-text'  
    },  
    {  
      title: 'Compatibility',  
      description: "Confused by love? Remove the doubts & find the sparks! Check the compatibility with your partner using our tool and ignite a love that lasts forever.",  
      icon: 'bi bi-heart'  
    },  
    {  
      title: 'Festival 2024',  
      description: "Festivals are myriad celebrations, each a unique form of joy. Explore the diverse world of festivities – a realm of celebration.",  
      icon: 'bi bi-gift'  
    }  ,
    {  
      title: 'Compatibility',  
      description: "Confused by love? Remove the doubts & find the sparks! Check the compatibility with your partner using our tool and ignite a love that lasts forever.",  
      icon: 'bi bi-heart'  
    },  
    {  
      title: 'Festival 2024',  
      description: "Festivals are myriad celebrations, each a unique form of joy. Explore the diverse world of festivities – a realm of celebration.",  
      icon: 'bi bi-gift'  
    } ,
    {  
      title: 'Compatibility',  
      description: "Confused by love? Remove the doubts & find the sparks! Check the compatibility with your partner using our tool and ignite a love that lasts forever.",  
      icon: 'bi bi-heart'  
    },  
    {  
      title: 'Festival 2024',  
      description: "Festivals are myriad celebrations, each a unique form of joy. Explore the diverse world of festivities – a realm of celebration.",  
      icon: 'bi bi-gift'  
    } 
  ];  

  currentIndex = 0;  
  translateX = 0;  

  moveCard(direction: number) {  
    const cardWidth = 320; // Adjust based on your card width  
    const totalCards = this.cards.length;  

    this.currentIndex += direction;  

    if (this.currentIndex < 0) {  
      this.currentIndex = totalCards - 1; // Loop to the last card  
    } else if (this.currentIndex >= totalCards) {  
      this.currentIndex = 0; // Loop to the first card  
    }  

    this.translateX = -this.currentIndex * cardWidth;  
  }  
}
