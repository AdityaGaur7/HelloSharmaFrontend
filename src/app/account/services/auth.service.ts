import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';

//const BASE_URL=['http://iveg-server.ap-south-1.elasticbeanstalk.com/']
const BASE_URL = ['http://localhost:8080/api/v1/auth/'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    // Initialize loggedIn state based on token presence
    this.loggedIn.next(this.isAuthenticated());
  }

  checkUser(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'register', signupRequest, {
      responseType: 'text',
    });
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest);
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log('JWT token not found in the Local Storage');
    }
    return null;
  }

  isAuthenticated(): boolean {
    try {
      const userData = localStorage.getItem('HSLocalStorage');
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.jwt) {
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

  // Optional: Add method to get current auth state as observable
  getAuthState(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
