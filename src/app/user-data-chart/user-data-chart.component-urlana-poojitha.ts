import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FarmService } from '../Services/farm.service';
import { UserManagementService } from '../Services/user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

// Exporting(Highcharts);
// Accessibility(Highcharts);

@Component({
  selector: 'app-user-data-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, HighchartsChartModule],
  templateUrl: './user-data-chart.component.html',
  styleUrls: ['./user-data-chart.component.css'],

})
export class UserDataChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  barChartOptions: Highcharts.Options = {};

  // Pie Chart Options
  pieChartOptions: Highcharts.Options = {};

  dataLoaded: boolean = false;

  constructor(
    private userManagementService: UserManagementService,
    private farmService: FarmService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    Promise.all([
      this.userManagementService.getAllUsers().toPromise(),
      this.farmService.getAllFarms().toPromise(),
    ])
      .then(([users, farms]) => {
        const userCount = users?.length || 0;
        const farmCount = farms?.length || 0;
  
        // Update active/inactive logic based on actual data
        const activeUsers = users?.filter(user => user.active).length || 0; // Ensure the 'active' field exists
        const inactiveUsers = userCount - activeUsers;
  
        const cropCategories = this.getCropCategoryDistribution(farms || []);
  
        this.createBarChart(userCount, farmCount);
        this.createPieChart(activeUsers, inactiveUsers, cropCategories);
  
        this.dataLoaded = true;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  
  createBarChart(userCount: number, farmCount: number): void {
    this.barChartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Number of Users and Farms Registered',
      },
      accessibility: {
        enabled: true,
      },
      xAxis: {
        categories: ['Users & Farms'],
        title: {
          text: 'user',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Count',
        },
      },
      series: [
        {
          type: 'column',
          name: 'Users',
          data: [userCount],
        },
        {
          type: 'column',
          name: 'Farms',
          data: [farmCount],
        },
      ],
    };
  }

  createPieChart(activeUsers: number, inactiveUsers: number, cropCategories: any[]): void {
    this.pieChartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'User Activity',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>',
      },
      series: [
        {
          type: 'pie',
          name: 'User Activity',
          data: [
            { name: 'Active Users', y: activeUsers },
            { name: 'Inactive Users', y: inactiveUsers },
            ...cropCategories,
          ],
        },
      ],
    };
  }

  getCropCategoryDistribution(farms: any[]): any[] {
    const cropCounts = farms.reduce((acc, farm) => {
      acc[farm.cropType] = (acc[farm.cropType] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(cropCounts).map(([crop, count]) => ({
      name: crop,
      y: count,
    }));
  }
}