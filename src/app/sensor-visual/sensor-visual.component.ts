import { Component, OnInit } from '@angular/core';
import { SensorDataService, SensorData } from '../Services/sensor-data.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sensor-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor-visual.component.html',
  styleUrls: ['./sensor-visual.component.css'],
})
export class SensorVisualComponent implements OnInit {
  sensorData: SensorData[] = [];
  temperatureChart: any;

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.loadWeeklyData();
  }

  loadWeeklyData(): void {
    this.sensorDataService.getSensorDataForWeek().subscribe(
      (data: SensorData[]) => {
        this.sensorData = data;
        this.plotTemperatureChart();
      },
      (error: any) => {
        console.error('Error fetching sensor data:', error);
      }
    );
  }

  // sensor-visual.component.ts
plotTemperatureChart(): void {
  const temperatures = this.sensorData.map(data => data.temperature);
  const labels = this.sensorData.map(data => {
    // Add a null check for timestamp before creating a new Date
    return data.timestamp ? new Date(data.timestamp).toLocaleDateString() : 'No Date';
  });

  this.temperatureChart = new Chart('temperatureChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });
}
}