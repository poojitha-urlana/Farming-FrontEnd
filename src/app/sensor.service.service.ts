import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SensorData } from './Models/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  constructor() {}

  // Simulating sensor data
  getSensorData(): Observable<SensorData[]> {
    const mockData: SensorData[] = [
      { id: 1, temperature: 25, humidity: 60, waterContent: 40 },
      { id: 2, temperature: 26, humidity: 58, waterContent: 42 },
      { id: 3, temperature: 27, humidity: 57, waterContent: 38 },
    ];
    return of(mockData); // Simulate an API response
  }
}
