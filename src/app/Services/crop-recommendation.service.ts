import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropRecommendationService {
  private apiUrl = 'http://127.0.0.1:5000'; // Flask API URL

  constructor(private http: HttpClient) {}

  // Method to predict the crop based on input data
  predictCrop(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recommendation`, data);
  }

  // Method to get nutrient recommendations based on crop, temperature, and humidity
  getNutrientRequirements(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nutrient-requirements`, data);
  }
}
