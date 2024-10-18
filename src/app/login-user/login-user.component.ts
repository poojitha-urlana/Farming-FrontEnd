import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


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

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.loginUser(this.credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/dash-board-user']); // Redirect to dashboard after login
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