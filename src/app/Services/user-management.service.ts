import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl = 'http://localhost:8899/api/admin/users'; // Your backend base URL

  constructor(private http: HttpClient) {}

  // Create a new user
  createUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders(); // Add Authorization Header
    return this.http.post<User>(this.apiUrl, user, { headers })
      .pipe(catchError(this.handleError));
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders(); // Add Authorization Header
    return this.http.get<User[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  // Get user by ID
  getUserById(userId: number): Observable<User> {
    const headers = this.getAuthHeaders(); // Add Authorization Header
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Update user details
  updateUser(userId: number, updatedUser: User): Observable<User> {
    const headers = this.getAuthHeaders(); // Add Authorization Header
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser, { headers })
      .pipe(catchError(this.handleError));
  }

  // Delete a user
  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders(); // Add Authorization Header
    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  

  // Private method to get authorization headers with Basic Authentication
  private getAuthHeaders(): HttpHeaders {
    const username = 'admin';
    const password = 'admin123';
    const authToken = btoa(`${username}:${password}`); // Base64 encode the credentials

    return new HttpHeaders({
      'Authorization': `Basic ${authToken}` // Attach token to the Authorization header
    });
  }

  // Error handler method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error('Server-side error:', error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
