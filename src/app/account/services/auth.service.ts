import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';


//const BASE_URL=['http://iveg-server.ap-south-1.elasticbeanstalk.com/']
const BASE_URL=['http://localhost:8080/api/v1/auth/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); 
  constructor(private http:HttpClient) { }

   

   checkUser(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL+"register", signupRequest, { responseType: 'text' });
  }


    login(loginRequest: any): Observable<any> {
      return this.http.post(BASE_URL + "login", loginRequest)
    }
  
 
  
    private createAuthorizationHeader() {
      const jwtToken = localStorage.getItem('JWT');
      if (jwtToken) {
        return new HttpHeaders().set(
          'Authorization', 'Bearer ' + jwtToken
        )
      } else {
        console.log("JWT token not found in the Local Storage");
      }
      return null;
    }

    isAuthenticated(): boolean {
      const token = localStorage.getItem('JWT');
      if (token) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const currentTime = Math.floor(Date.now() / 1000);
  
          if (decodedToken.exp && decodedToken.exp > currentTime) {
            console.log('JWT is valid');
            return true;
          } else {
            console.log('JWT is expired');
            return false;
          }
        } catch (error) {
          console.error('Error decoding JWT:', error);
          return false;
        }
      }
  
      return false;
    }
  
    logout(): void {
      
      localStorage.removeItem('userData');
    }

  }

