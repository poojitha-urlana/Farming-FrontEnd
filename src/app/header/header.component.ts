import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../Services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Declare authService first
  constructor(private router: Router, library: FaIconLibrary) {
    library.addIconPacks(fas); // Add all solid icons
  }

  isLoggedIn: boolean = false; // Change this based on your authentication logic


  // Call this method when user logs in
  login() {
    this.isLoggedIn = true;
  }

  // Call this method on logout
  logout() {
    this.isLoggedIn = false;
    // Perform additional logout logic, such as clearing tokens
    this.router.navigate(['/login-user']); // Redirect to the login page
  }

}
