import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './herosection.component.html',
  styleUrl: './herosection.component.css'
})
export class HerosectionComponent {
  contentSections = [
    {
      title: 'Why Astrology?',
      text: `Astrology is a predictive science that gives insight into different aspects of life, 
      revealing the will of God through the study of cosmic objects like stars and planets. 
      Each planet holds influence, positive or negative, depending on its position in your kundali.`,
      imageUrl: '../../assets/pooja/1.jpg',
      buttonText: 'Talk to an Astrologer Now'
    },
    {
      title: 'The 9 Planets in Astrology',
      text: `Astrology involves the study of nine planets: Sun, Moon, Mars, Mercury, Jupiter, Venus, 
      Saturn, Rahu, and Ketu. Each planet has a different influence on your life, some positive and 
      some negative, depending on their positions in your Kundali.`,
      imageUrl: '../../assets/pooja/2.jpg',
      buttonText: 'Know About Planets'
    },
    {
      title: 'Astrological Houses',
      text: `Your Kundali consists of 12 houses, each representing a different aspect of your life. 
      The position of planets in these houses determines your strengths, weaknesses, and future potential.`,
      imageUrl: '../../assets/pooja/3.jpg',
      buttonText: 'Explore Your Kundali'
    },
    {
      title: 'Daily Horoscope Predictions',
      text: `Stay updated with your daily horoscope predictions and align your actions with the best times 
      for success. Get insights into your zodiac sign and prepare yourself for the day ahead.`,
      imageUrl: '../../assets/pooja/4.jpg',
      buttonText: 'Check Daily Horoscope'
    },
    {
      title: 'Astrotalk Services',
      text: `Astrotalk offers online astrology consultation in Vedic Astrology, Tarot Card Reading, Numerology, 
      and more. Our astrologers provide insights into love, career, health, and much more.`,
      imageUrl: '../../assets/pooja/5.jpg',
      buttonText: 'Get Astrological Advice'
    }
  ];
}
