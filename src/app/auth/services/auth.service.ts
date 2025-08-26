import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  
  private readonly baseUrl = 'http://localhost:5000/api/auth';

  login(credentials: any) {
    // return this.http.post(`${this.baseUrl}/login`, credentials);
    
    // Simulate API call
    return of({ token: 'fake-jwt-token' }).pipe(delay(500));
  }

  register(userData: any) {
    // return this.http.post(`${this.baseUrl}/register`, userData);
    
    // Simulate API call
    return of({ success: true }).pipe(delay(500));
  }

  sendPasswordResetLink(email: any) {
    // return this.http.post(`${this.baseUrl}/forgot-password`, { email });
    
    // Simulate API call
    return of({ success: true }).pipe(delay(500));
  }

  resetPassword(passwordData: any) {
    // return this.http.post(`${this.baseUrl}/reset-password`, passwordData);

    // Simulate API call
    return of({ success: true }).pipe(delay(500));
  }

  logout() {
    localStorage.removeItem('token');
  }
}
