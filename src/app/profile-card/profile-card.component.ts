import { Component } from '@angular/core';
import { UserManagementService } from '../Services/user-management.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'] // Corrected to 'styleUrls'
})
export class ProfileCardComponent {
  user: User = { id: 0, username: '', password: '', email: '', fullName: '', confirmPassword: '' };

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
