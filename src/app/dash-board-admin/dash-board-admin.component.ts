import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed
import { UserDataChartComponent } from '../user-data-chart/user-data-chart.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dash-board-admin',
  standalone: true,
  imports: [CommonModule,UserDataChartComponent,RouterLink ], // Include the top widgets component here
  templateUrl: './dash-board-admin.component.html',
  styleUrls: ['./dash-board-admin.component.css']
})
export class DashBoardAdminComponent {
  
}
