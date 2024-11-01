import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service'; // Import the AuthService

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule , HttpClientModule],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  credentials = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {} // Inject AuthService

  onSubmit() {
    this.userService.loginUser(this.credentials).subscribe({
      next: (response) => {
        this.authService.login(this.credentials.username); 
        console.log('Login successful for:', this.credentials.username);
        this.router.navigate(['/dash-board-user']); 
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      }
    });
  }

  onClear() {
    this.credentials = {
      username: '',
      password: ''
    };
  }
}
