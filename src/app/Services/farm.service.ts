import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Farm } from '../Models/farm';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private apiUrl = 'http://localhost:8899/api/farms';  // Adjust your API base URL as needed

  constructor(private http: HttpClient) {}

  // Get all farms
  getAllFarms(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get farm by ID
  getFarmById(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new farm
  createFarm(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.apiUrl, farm, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing farm
  updateFarm(id: number, farm: Farm): Observable<Farm> {
    return this.http.put<Farm>(`${this.apiUrl}/${id}`, farm, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a farm
  deleteFarm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: any) {
    console.error('An error occurred:', error);  // Log to console instead
    return throwError('Something bad happened; please try again later.');
  }
}
