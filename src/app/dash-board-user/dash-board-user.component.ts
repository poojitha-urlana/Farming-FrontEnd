import { Component  , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../Services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataChartComponent } from '../user-data-chart/user-data-chart.component';
import { User } from '../Models/user';

@Component({
  selector: 'app-dash-board-user',
  standalone: true,
  imports: [RouterModule,UserDataChartComponent ,FormsModule , CommonModule],
  templateUrl: './dash-board-user.component.html',
  styleUrl: './dash-board-user.component.css'
})
export class DashBoardUserComponent {
  username: string = '';

  constructor(private userService: UserService) {}

  // ngOnInit() {
  //   // Subscribe to the user data to get the logged-in user information
  //   this.userService.user$.subscribe(user => {
  //     if (user) {
  //       this.username = user.username; // Assuming the 'username' field is available in the user data
  //     }
  //   });
  // }
}