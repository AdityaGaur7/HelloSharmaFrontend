// src/app/services/astrologer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Astrologer } from '../models/astrologer.model';
import { getJwtToken } from '../utils/jwt.util';

@Injectable({
  providedIn: 'root'
})
export class AstrologerService {
  private baseUrl = 'http://localhost:8080/api/astrologers'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // Utility method to create headers with JWT
  private createHeaders(): HttpHeaders {
    const jwt = getJwtToken(); // Get the JWT from the utility function
    let headers = new HttpHeaders();
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  // Get all astrologers
  getAllAstrologers(): Observable<Astrologer[]> {
    return this.http.get<Astrologer[]>(this.baseUrl, { headers: this.createHeaders() });
  }

  // Get astrologer by ID
  getAstrologerById(id: number): Observable<Astrologer> {
    return this.http.get<Astrologer>(`${this.baseUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Add a new astrologer
  addAstrologer(astrologer: Astrologer): Observable<Astrologer> {
    return this.http.post<Astrologer>(this.baseUrl, astrologer, {
      headers: this.createHeaders()
    });
  }

  // Update an existing astrologer
  updateAstrologer(id: number, astrologer: Astrologer): Observable<Astrologer> {
    return this.http.put<Astrologer>(`${this.baseUrl}/${id}`, astrologer, {
      headers: this.createHeaders()
    });
  }

  // Delete an astrologer by ID
  deleteAstrologer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.createHeaders()
    });
  }
}
