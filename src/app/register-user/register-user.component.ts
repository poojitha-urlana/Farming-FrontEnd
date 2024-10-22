import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  user = {
    username: '',
    password: '',
    email: '',
    fullName: '',
    confirmPassword: ''
  };

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/dash-board-user']);  
      },
      (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
