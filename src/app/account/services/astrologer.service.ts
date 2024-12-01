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
  private baseUrl = 'http://localhost:8080/api/v1/astrologers'; // Update with your API URL

  constructor(private http: HttpClient) {}
  private createHeaders(): HttpHeaders {
    const jwt = getJwtToken(); // Get the JWT from the utility function
    let headers = new HttpHeaders();

    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }

    return headers;
  }
  getAllAstrologers(): Observable<Astrologer[]> {
    return this.http.get<Astrologer[]>(this.baseUrl);
  }

  getAstrologerById(id: number): Observable<Astrologer> {
    return this.http.get<Astrologer>(`${this.baseUrl}/${id}`);
  }

  addAstrologer(astrologer: Astrologer): Observable<Astrologer> {
    return this.http.post<Astrologer>(this.baseUrl, astrologer, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateAstrologer(id: number, astrologer: Astrologer): Observable<Astrologer> {
    return this.http.put<Astrologer>(`${this.baseUrl}/${id}`, astrologer, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteAstrologer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
