import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav2',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NaviComponent {
  // faUser = faUser;
  // faGlobe = faGlobe;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  


  }
}
