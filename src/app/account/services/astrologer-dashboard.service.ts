import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getJwtToken } from '../utils/jwt.util';
@Injectable({
  providedIn: 'root',
})
export class AstrologerDashboardService {
  private baseUrl = 'http://localhost:8080/api/v1/astrologer';

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    const jwt = getJwtToken();
    return new HttpHeaders()
      .set('Authorization', `Bearer ${jwt}`)
      .set('Content-Type', 'application/json');
  }

  getAstrologerProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`, {
      headers: this.createHeaders(),
    });
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`, {
      headers: this.createHeaders(),
    });
  }

  getEarnings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/earnings`, {
      headers: this.createHeaders(),
    });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, profileData, {
      headers: this.createHeaders(),
    });
  }

  updateAvailability(availability: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/availability`, availability, {
      headers: this.createHeaders(),
    });
  }
}
