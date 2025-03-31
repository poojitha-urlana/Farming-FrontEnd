import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8899/api/sensor-data'; // Backend URL

  constructor(private http: HttpClient) {}

  // Fetch all sensor data with pagination
  getSensorData(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}/alldata`, { params });
  }

  // Fetch the latest sensor data
  getLatestSensorData(): Observable<SensorData> {
    return this.http.get<SensorData>(`${this.apiUrl}/latest`);
  }

  // Fetch sensor data for the last week
  getSensorDataForWeek(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.apiUrl}/data/week`);
  }

  // Fetch sensor data for the last month
  getSensorDataForMonth(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.apiUrl}/data/month`);
  }

  // Save new sensor data
  saveSensorData(sensorData: SensorData): Observable<SensorData> {
    return this.http.post<SensorData>(`${this.apiUrl}/post`, sensorData);
  }
}
