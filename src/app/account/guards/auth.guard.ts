import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(): boolean {
    if (!this.jwtService.isTokenExpired()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
