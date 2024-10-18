// RegisterUserComponent
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service'; // Import your UserService

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class RegisterUserComponent {
  user = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService, private router: Router) {} // Inject UserService

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Prepare the user object for registration
    const userToRegister = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        fullName: this.user.fullName
    };

    this.userService.registerUser(userToRegister).subscribe(
        response => {
            console.log('User registered successfully:', response);
            this.router.navigate(['/dash-board-user']);
        },
        error => {
            console.error('Registration failed:', error);
            let errorMessage = 'Registration failed: Please try again.';
    
            // Attempt to parse the error response if it is JSON
            try {
                errorMessage = error.error.message || errorMessage;
            } catch (e) {
                console.error('Error parsing response:', e);
            }
    
            alert(errorMessage);
        }
    );
}
}
