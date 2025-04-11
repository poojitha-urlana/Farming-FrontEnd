import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SensorData {
  id?: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  relayState: boolean;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private baseUrl = 'http://localhost:8899/api/sensor-data';  // Adjust if port differs

  constructor(private http: HttpClient) {}

  getLatestData(): Observable<SensorData> {
    return this.http.get<SensorData>(`${this.baseUrl}/latest`);
  }

  getAllData(page: number = 0, size: number = 10): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.baseUrl}/alldata?page=${page}&size=${size}`);
  }

  postSensorData(data: SensorData): Observable<string> {
    return this.http.post(`${this.baseUrl}/post`, data, { responseType: 'text' });
  }
}
