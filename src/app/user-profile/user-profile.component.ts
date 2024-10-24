import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementService } from '../Services/user-management.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, FormsModule, HttpClientModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = { id: 0, username: '', password: '', email: '', fullName: '', confirmPassword: '' };
  faUser = faUser;
  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Fetch single user details (e.g., by user ID)
  getUserDetails(): void {
    const userId = 1; // Adjust the ID as needed
    this.userManagementService.getUserById(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
