import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AstrologerGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(): boolean {
    if (this.jwtService.isAstrologer()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
