import { Component } from '@angular/core';
import { UserManagementService } from '../Services/user-management.service';
import { User } from '../Models/user';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [FontAwesomeModule,RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'] // Corrected to 'styleUrls'
})
export class ProfileCardComponent {
  user: User = { id: 0, username: '', password: '', email: '', fullName: '', confirmPassword: '',active: true };

  constructor(private userManagementService: UserManagementService, private authService :AuthService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  // Fetch single user details (e.g., by user ID)
  getUserDetails(): void {
    const userId = 1; // Adjust the ID as needed
    this.userManagementService.getUserById(userId).subscribe(
      (data) => {
        this.user = { ...data, active: data.active ?? true }; // Default to true if active is undefined
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  logout() {
    if (this.authService.isLoggedIn$) {
      this.authService.logout();
    } 
  }
}
