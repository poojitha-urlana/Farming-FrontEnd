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
export class SensorService {private apiUrl = 'http://localhost:8899/api/sensor-data'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getAllSensorData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(this.apiUrl);
  }

  saveSensorData(sensorData: SensorData): Observable<SensorData> {
    return this.http.post<SensorData>(this.apiUrl, sensorData);
  }
}