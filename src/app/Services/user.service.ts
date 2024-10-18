import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8899/api/user/';

  private userSubject = new BehaviorSubject<any>(null); // Subject to hold user data
  public user$ = this.userSubject.asObservable(); // Observable to expose user data

  constructor(private http: HttpClient) {}

  // Register User
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, user);
  }

  // Login User
  loginUser(credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}login`, credentials, { headers }).pipe(
      tap((response: any) => {
        if (response && response.user) {
          this.userSubject.next(response.user); // Store user data in BehaviorSubject
        }
      })
    );
  }

  // Logout User
  logoutUser() {
    this.userSubject.next(null); // Clear user data on logout
  }

  

}
