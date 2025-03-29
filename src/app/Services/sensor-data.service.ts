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
  private apiUrl = 'http://localhost:8899/api/sensor-data'; // Backend URL

  constructor(private http: HttpClient) {}

  // Fetch all sensor data
  getSensorData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(this.apiUrl);
  }

  // Save new sensor data
  saveSensorData(sensorData: SensorData): Observable<SensorData> {
    return this.http.post<SensorData>(this.apiUrl, sensorData);
  }
}
