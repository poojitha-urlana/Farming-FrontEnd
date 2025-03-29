import { Component, OnInit } from '@angular/core';
import { SensorDataService, SensorData } from '../Services/sensor-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor-visual.component.html',
  styleUrls: ['./sensor-visual.component.css'],
})
export class SensorVisualComponent implements OnInit {
  sensorData: SensorData[] = [];

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.loadSensorData();
  }

  loadSensorData(): void {
    this.sensorDataService.getSensorData().subscribe(
      (data: SensorData[]) => {
        this.sensorData = data;
      },
      (error: any) => {
        console.error('Error fetching sensor data:', error);
      }
    );
  }
}
