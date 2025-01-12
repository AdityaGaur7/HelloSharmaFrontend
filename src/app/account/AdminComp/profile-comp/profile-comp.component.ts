import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-comp.component.html',
  styleUrls: ['./profile-comp.component.css'],
})
export class ProfileCompComponent implements OnInit {
  public user: any = {
    username: 'Loading...',
    email: 'Loading...',
    address: 'Loading...',
    description: 'Loading...',
    imageurl: 'assets/default-avatar.png',
  };

  constructor() {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  }

  ngOnInit(): void {
    // Add any initialization logic here
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // Handle image upload logic here
    }
  }

  updateProfile(): void {
    // Handle profile update logic here
  }

  updateSettings(): void {
    // Handle settings update logic here
  }
}
