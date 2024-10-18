import { Component } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import Reactive Forms Module
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../Services/admin.service';
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule , CommonModule , HttpClientModule,
    FontAwesomeModule ,ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  faUser = faUser;
  faLock = faLock;
  faSignInAlt = faSignInAlt;

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private adminService: AdminService
  ) {
    // Initialize the form with form controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Submit login form
  onSubmit() {
    if (this.loginForm.invalid) {
      return; // If form is invalid, stop the submission
    }

    this.isLoading = true;
    const loginCredentials = this.loginForm.value;

    // Call the admin login service
    this.adminService.loginAdmin(loginCredentials).subscribe(
      (response: any) => {
        this.isLoading = false;
        // Handle successful login (you can store tokens or navigate)
        console.log(response.message);
        this.router.navigate(['/dash-board-admin']); // Navigate to admin dashboard
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        // Handle errors (e.g., invalid credentials)
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}