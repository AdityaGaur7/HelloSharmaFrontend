import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  faUser = faUser;
  faGlobe = faGlobe;

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
