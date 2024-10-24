import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_accessibility from 'highcharts/modules/accessibility';
import { UserManagementService } from '../Services/user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

HC_accessibility(Highcharts); // Initialize the accessibility module

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

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userManagementService.getAllUsers().subscribe((users) => {
      console.log(users); // Log the users data
      this.createChart(users);
    });
  }

  createChart(users: any[]): void {
    const userCount = users.length; // Total number of users
  
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of Registered Users'
      },
      accessibility: {
        enabled: false // Disable accessibility features
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
  }
}
