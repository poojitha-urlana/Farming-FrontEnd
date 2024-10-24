import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8899/api/user'; // Adjust the URL as necessary

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }

  // Login User
  loginUser(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
