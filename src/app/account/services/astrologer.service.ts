// src/app/services/astrologer.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Astrologer } from '../models/astrologer.model';
import { getJwtToken } from '../utils/jwt.util';

@Injectable({
  providedIn: 'root',
})
export class AstrologerService {
  private baseUrl = 'http://localhost:8080/api/v1/astrologers';

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    const jwt = getJwtToken();
    return new HttpHeaders()
      .set('Authorization', `Bearer ${jwt}`)
      .set('Content-Type', 'application/json');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getAllAstrologers(): Observable<Astrologer[]> {
    return this.http
      .get<Astrologer[]>(this.baseUrl, { headers: this.createHeaders() })
      .pipe(retry(1), catchError(this.handleError));
  }

  getAstrologerById(id: number): Observable<Astrologer> {
    return this.http
      .get<Astrologer>(`${this.baseUrl}/${id}`, {
        headers: this.createHeaders(),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  addAstrologer(astrologer: Astrologer): Observable<Astrologer> {
    return this.http
      .post<Astrologer>(this.baseUrl, astrologer, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  updateAstrologer(id: number, astrologer: Astrologer): Observable<Astrologer> {
    return this.http
      .put<Astrologer>(`${this.baseUrl}/${id}`, astrologer, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteAstrologer(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }
}
