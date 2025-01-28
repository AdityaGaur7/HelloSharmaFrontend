import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from './jwt.service';

//const BASE_URL=['http://iveg-server.ap-south-1.elasticbeanstalk.com/']
const BASE_URL = ['http://localhost:8080/api/v1/auth/'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.loggedIn.next(this.isAuthenticated());
  }

  checkUser(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'register', signupRequest, {
      responseType: 'text',
    });
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest).pipe(
      tap((response: any) => {
        if (response?.jwt) {
          localStorage.setItem('HSLocalStorage', JSON.stringify(response));
          this.loggedIn.next(true);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    try {
      const userData = localStorage.getItem('HSLocalStorage');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.jwt && !this.jwtService.isTokenExpired()) {
          this.loggedIn.next(true);
          return true;
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
    this.loggedIn.next(false);
    return false;
  }

  logout(): void {
    localStorage.removeItem('HSLocalStorage');
    this.loggedIn.next(false);
  }

  getAuthState(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUserId(): number {
    const user = this.getUser();
    return user ? user.id : 0;
  }

  private getUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
