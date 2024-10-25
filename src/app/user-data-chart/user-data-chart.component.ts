import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { UserManagementService } from '../Services/user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-user-data-chart',
  standalone: true,
  templateUrl: './user-data-chart.component.html',
  styleUrls: ['./user-data-chart.component.css'],
  imports: [CommonModule, FormsModule, HighchartsChartModule]
})
export class UserDataChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  dataLoaded: boolean = false; // Declare the dataLoaded property

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userManagementService.getAllUsers().subscribe((users) => {
      console.log('Fetched users:', users);
      this.createChart(users);
      this.dataLoaded = true; // Set dataLoaded to true once data is fetched
    });
  }

  createChart(users: any[]): void {
    const userCount = users.length;
    
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of Registered Users'
      },
      accessibility: {
        enabled: true
      },
      xAxis: {
        categories: ['Users'],
        title: {
          text: 'User Data'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Number of Users'
        }
      },
      series: [
        {
          type: 'column',
          name: 'Users',
          data: [userCount] 
        }
      ]
    };
    console.log('User count:', userCount);
    console.log('Chart options:', this.chartOptions);
  }
}
