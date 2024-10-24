import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed
import { UserDataChartComponent } from '../user-data-chart/user-data-chart.component';
import { Highcharts } from 'highcharts/modules/accessibility';
import Accessibility from 'highcharts/modules/accessibility';
import { RouterLink } from '@angular/router';
import HC_accessibility from 'highcharts/modules/accessibility';

// Initialize the accessibility module
//HC_accessibility(Highcharts);

@Component({
  selector: 'app-dash-board-admin',
  standalone: true,
  imports: [CommonModule,UserDataChartComponent,RouterLink ], // Include the top widgets component here
  templateUrl: './dash-board-admin.component.html',
  styleUrls: ['./dash-board-admin.component.css']
})
export class DashBoardAdminComponent {
  
}
