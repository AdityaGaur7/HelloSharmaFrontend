import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoroscopeService } from '../../services/horoscope.service';

@Component({
  selector: 'app-daily-horoscope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-horoscope.component.html',
  styleUrls: ['./daily-horoscope.component.css'] // Fixed the property name from styleUrl to styleUrls
})
export class DailyHoroscopeComponent {
  zodiacSigns = [
    { name: 'Aries', imgUrl: 'https://cdn.usegalileo.ai/stability/27f81777-3137-47c9-bad1-1428cb2be246.png' },
    { name: 'Taurus', imgUrl: 'https://cdn.usegalileo.ai/sdxl10/57801a24-6b4c-4f39-a2d5-f851659a4fb2.png' },
    { name: 'Gemini', imgUrl: 'https://cdn.usegalileo.ai/stability/1d10d705-381f-41e0-a699-693377bc5f16.png' },
    { name: 'Cancer', imgUrl: 'https://cdn.usegalileo.ai/stability/90a418f9-8081-42f3-b9ec-e0eb595b3726.png' },
    { name: 'Leo', imgUrl: 'https://cdn.usegalileo.ai/sdxl10/88936335-6a0e-4928-89af-1b060a0fe8fd.png' },
    { name: 'Virgo', imgUrl: 'https://cdn.usegalileo.ai/sdxl10/230a6a49-f45c-4e75-a0b1-75f21bee4b5d.png' },
    { name: 'Libra', imgUrl: 'https://cdn.usegalileo.ai/stability/d8b045d6-0467-4560-8c66-d3909250dc25.png' },
    { name: 'Scorpio', imgUrl: 'https://cdn.usegalileo.ai/sdxl10/861d8428-13df-4388-a465-708e5b4ceabe.png' },
    { name: 'Sagittarius', imgUrl: 'https://cdn.usegalileo.ai/stability/766d21b2-11be-4f2e-9dfb-bb87d5fd3a65.png' },
    { name: 'Capricorn', imgUrl: 'https://cdn.usegalileo.ai/stability/6ae764f4-c6ae-492b-8249-1b6624536e59.png' }
  ];

  selectedHoroscope: any = null;
  isModalOpen = false;
  isLoading = false;

  // Hardcoded fallback horoscope data
  fallbackHoroscope = {
    prediction: "Your day will be filled with positive energy and unexpected surprises.",
    number: "5, 12, 23",
    color: "Blue",
    strength: "Resilience",
    weakness: "Indecisiveness"
  };

  constructor(private horoscopeService: HoroscopeService) {}

  openHoroscope(sign: string) {
    this.isLoading = true;
    this.horoscopeService.getHoroscope(sign.toLowerCase()).subscribe({
      next: (data) => {
        this.selectedHoroscope = data;
        this.isModalOpen = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching horoscope', error);
        this.selectedHoroscope = this.fallbackHoroscope; // Use fallback data
        this.isModalOpen = true; // Open modal even if there is an error
        this.isLoading = false; // Stop loading
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
