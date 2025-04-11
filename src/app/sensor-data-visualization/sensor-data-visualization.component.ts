import { Component, OnInit } from '@angular/core';
import { SensorData } from '../Models/sensor-data';
import { CommonModule } from '@angular/common';
import { SensorDataService } from '../Services/sensor-data.service';

@Component({
  selector: 'app-sensor-data-visualization',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './sensor-data-visualization.component.html',
  styleUrls: ['./sensor-data-visualization.component.css']
})
export class SensorDataVisualizationComponent implements OnInit {

  latestData?: SensorData;
  allData: SensorData[] = [];

  constructor(private sensorService: SensorDataService) {}

  ngOnInit(): void {
    this.fetchLatestData();
    this.fetchAllData();
  }

  fetchLatestData(): void {
    this.sensorService.getLatestData().subscribe({
      next: data => this.latestData = data,
      error: err => console.error('Error fetching latest data:', err)
    });
  }

  fetchAllData(): void {
    this.sensorService.getAllData(0, 10).subscribe({
      next: data => this.allData = data,
      error: err => console.error('Error fetching all data:', err)
    });
  }
}
