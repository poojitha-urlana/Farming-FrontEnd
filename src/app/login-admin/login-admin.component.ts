import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AdminService } from '../Services/admin.service';
import { FormsModule } from '@angular/forms';
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule , FontAwesomeModule , CommonModule,
    FormsModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private adminLoginService: AdminService, private router: Router) { }

  onLogin() {
    this.adminLoginService.adminLogin(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Redirect to admin dashboard or handle successful login
          this.router.navigate(['/dash-board-admin']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}