import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Farm } from '../Models/farm';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private apiUrl = 'http://localhost:8899/api/farms';  // Updated API base URL

  constructor(private http: HttpClient) {}

  // Get all farms
  getAllFarms(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Get farm by ID
  getFarmById(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Create a new farm
  createFarm(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.apiUrl, farm).pipe(catchError(this.handleError));
  }

  // Update a farm
  updateFarm(id: number, farm: Farm): Observable<Farm> {
    return this.http.put<Farm>(`${this.apiUrl}/${id}`, farm).pipe(catchError(this.handleError));
  }

  // Delete a farm
  deleteFarm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was:`, error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
