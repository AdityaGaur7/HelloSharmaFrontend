import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-astrologer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <h3>Profile Settings</h3>
      <!-- Add profile form and content here -->
    </div>
  `,
})
export class AstrologerProfileComponent {}
