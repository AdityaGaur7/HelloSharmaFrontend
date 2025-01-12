import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  // Add other claims as needed
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decodeToken(): JwtPayload | null {
    try {
      const userData = localStorage.getItem('HSLocalStorage');
      if (userData) {
        const { jwt } = JSON.parse(userData);
        if (jwt) {
          return jwtDecode<JwtPayload>(jwt);
        }
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.role || null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isTokenExpired(): boolean {
    const decodedToken = this.decodeToken();
    if (!decodedToken?.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  isAstrologer(): boolean {
    return this.getUserRole() === 'ASTRO';
  }
}
