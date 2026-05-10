import { Component, OnInit } from '@angular/core';
import { FarmService } from '../Services/farm.service';
import { Farm } from '../Models/farm';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-dash-board-user',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './dash-board-user.component.html',
  styleUrls: ['./dash-board-user.component.css']
})
export class DashBoardUserComponent implements OnInit {
  farms: any[] = [];
  smallFarms: number = 0;
  mediumFarms: number = 0;
  largeFarms: number = 0;

  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    this.fetchFarms();
  }

  fetchFarms(): void {
    this.farmService.getAllFarms().subscribe((data: any[]) => {
      this.farms = data;
      console.log('Fetched Farms:', this.farms);

      this.calculateFarmSizes();
    });
  }

  calculateFarmSizes(): void {
    this.smallFarms = 0;
    this.mediumFarms = 0;
    this.largeFarms = 0;

    this.farms.forEach(farm => {
      if (farm.area < 5) {
        this.smallFarms++;
      } else if (farm.area >= 5 && farm.area < 15) {
        this.mediumFarms++;
      } else {
        this.largeFarms++;
      }
    });

    console.log(`Farm Sizes - Small: ${this.smallFarms}, Medium: ${this.mediumFarms}, Large: ${this.largeFarms}`);
  }
}