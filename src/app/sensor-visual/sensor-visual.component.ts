import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SensorService } from '../sensor.service.service';
import { SensorData } from '../Models/sensor-data';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-sensor-visual',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './sensor-visual.component.html',
  styleUrls: ['./sensor-visual.component.css'],
})
export class SensorVisualComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.sensorService.getSensorData().subscribe((data: SensorData[]) => {
      this.loadChart(data);
    });
  }

  loadChart(sensorData: SensorData[]): void {
    this.chartOptions = {
      chart: { type: 'line' },
      title: { text: 'Farm Sensor Data' },
      xAxis: { categories: sensorData.map((_, i) => `Reading ${i + 1}`) },
      yAxis: { title: { text: 'Values' } },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          data: sensorData.map((d) => ({
            y: d.temperature,
            marker: {
              symbol: 'url(assets/icons/temperature.png.png)',
              width: 50,  
            height: 50, 
            },
          })),
        } as Highcharts.SeriesLineOptions,

        {
          name: 'Humidity',
          type: 'line',
          data: sensorData.map((d) => ({
            y: d.humidity,
            marker: {
              symbol: 'url(assets/icons/humidity.png.png)',
              width: 50,  
            height: 50, 
            },
          })),
        } as Highcharts.SeriesLineOptions,

        {
          name: 'Water Content',
          type: 'line',
          data: sensorData.map((d) => ({
            y: d.waterContent,
            marker: {
              symbol: 'url(assets/icons/water.png.png)',
              width: 50,  // Set the width of the image
            height: 50, // ✅ Use symbol
            },
          })),
        } as Highcharts.SeriesLineOptions,
      ],
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `${this.y}`;
            },
          },
        },
      },
    };
  }
}
