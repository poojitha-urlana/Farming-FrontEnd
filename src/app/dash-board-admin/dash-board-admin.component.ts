import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule if needed


@Component({
  selector: 'app-dash-board-admin',
  standalone: true,
  imports: [CommonModule, ], // Include the top widgets component here
  templateUrl: './dash-board-admin.component.html',
  styleUrls: ['./dash-board-admin.component.css']
})
export class DashBoardAdminComponent {
  // Your component logic here
}
