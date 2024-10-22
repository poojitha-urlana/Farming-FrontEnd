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
    return this.http.get<Farm[]>(this.apiUrl);
  }

  // Get farm by ID
  getFarmById(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${this.apiUrl}/${id}`);
  }

  // Create a new farm
  createFarm(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.apiUrl, farm);
  }

  // Update a farm
  updateFarm(id: number, farm: Farm): Observable<Farm> {
    return this.http.put<Farm>(`${this.apiUrl}/${id}`, farm);
  }

  // Delete a farm
  deleteFarm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}