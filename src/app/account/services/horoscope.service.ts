import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  private apiUrl = 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope/';
  private headers = new HttpHeaders({
    'x-rapidapi-key': 'c16f707d3bmsh76a2729faea701ap1464b8jsn8aa349d6b910',
    'x-rapidapi-host': 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  getHoroscope(sign: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?zodiacSign=${sign}`, { headers: this.headers });
  }
}
