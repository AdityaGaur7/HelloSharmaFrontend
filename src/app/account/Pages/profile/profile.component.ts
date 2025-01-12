import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../MainComp/nav2/nav.component';
import { FooterComponent } from '../../MainComp/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile = {
    name: 'Sharma Ji',
    email: 'sharmaji@example.com',
    phone: '+91 9876543210',
    dob: '1990-01-01',
    location: 'New Delhi, India',
    profileImage: 'assets/default-avatar.png',
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Handle profile update
    console.log('Profile updated:', this.userProfile);
  }
}
