import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor  {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT');

    if (token) {
      // Check if token is expired
      if (this.jwtHelper.isTokenExpired(token)) {
        // If token is expired, remove it and redirect to login
        localStorage.removeItem('JWT');
        this.router.navigate(['/login']);
        return throwError('Token has expired, please log in again.');
      }

      // If token is valid, clone the request and add the Authorization header
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    // If no token is found, pass the request as is
    return next.handle(req);
  }
}