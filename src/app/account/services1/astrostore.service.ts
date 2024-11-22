// src/app/services/astro-store.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getJwtToken } from '../utils/jwt.util'; // Adjust the path according to your project structure
 // Assuming you have a model for AstroStore
import { AstroStore } from '../models/astro-store.model';
@Injectable({
  providedIn: 'root',
})


export class AstroStoreService {
  private apiUrl = 'http://localhost:8080/api/v1/astrostore'; // Update with your backend URL

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

  // Fetch all astro store products
  getAllProducts(): Observable<AstroStore[]> {
    return this.http.get<AstroStore[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Fetch product by id
  getProductById(id: number): Observable<AstroStore> {
    return this.http.get<AstroStore>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Create new product
  createProduct(product: AstroStore): Observable<AstroStore> {
    return this.http.post<AstroStore>(this.apiUrl, product, { headers: this.createHeaders() });
  }

  // Update a product
  updateProduct(id: number, productDetails: AstroStore): Observable<AstroStore> {
    return this.http.put<AstroStore>(`${this.apiUrl}/${id}`, productDetails, { headers: this.createHeaders() });
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }
}
