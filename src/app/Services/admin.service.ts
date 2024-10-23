import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Add the tap import

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8899/api/admin'; // Your backend base URL

  // Admin login state
  private adminLoggedIn = new BehaviorSubject<boolean>(false);
  
  adminLoggedIn$ = this.adminLoggedIn.asObservable();

  constructor(private http: HttpClient,private router:Router) {}

  // Admin login
  adminLogin(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginPayload).pipe(
      catchError(this.handleError),
      // On successful login, set adminLoggedIn to true
      tap(() => this.adminLoggedIn.next(true)) // Using tap to trigger side effect
    );
  }

  // Admin logout
  adminLogout() {
    this.adminLoggedIn.next(false);
    console.log('Admin logged out');

    this.router.navigate(['']);
  }

  // Error handler method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
