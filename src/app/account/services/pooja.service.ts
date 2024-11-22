import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getJwtToken } from '../utils/jwt.util';
import {Pooja} from '../models/pooja.model'
@Injectable({
  providedIn: 'root',
})
export class PoojaService {
  private apiUrl = 'http://localhost:8080/api/v1/poojas'; // Update with your backend URL

  constructor(private http: HttpClient) {}

    // Method to create headers including the JWT token
    private createHeaders(): HttpHeaders {
      const jwt = getJwtToken(); // Get the JWT from the utility function
      let headers = new HttpHeaders();
  
      if (jwt) {
        headers = headers.set('Authorization', `Bearer ${jwt}`);
      }
  
      return headers;
    }

  // Fetch all poojas
  getAllPoojas(): Observable<Pooja[]> {
    return this.http.get<Pooja[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Fetch pooja by id
  getPoojaById(id: number): Observable<Pooja> {
    return this.http.get<Pooja>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Create new pooja
  createPooja(pooja: Pooja): Observable<Pooja> {
    return this.http.post<Pooja>(this.apiUrl, pooja, { headers: this.createHeaders() });
  }

  // Update a pooja
  updatePooja(id: number, pooja: Pooja): Observable<Pooja> {
    return this.http.put<Pooja>(`${this.apiUrl}/${id}`, pooja, { headers: this.createHeaders() });
  }

  // Delete a pooja
  deletePooja(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
