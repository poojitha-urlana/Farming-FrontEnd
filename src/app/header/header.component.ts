import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../Services/auth.service'; // Import AuthService
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string | null = null; // Local property to hold the username

  constructor(
    private router: Router,
    library: FaIconLibrary,
    public authService: AuthService
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    // Subscribe to username observable and store locally for template access
    this.authService.username$.subscribe({
      next: (name) => {
        console.log('Username received:', name);
        this.username = name;
      },
      error: (err) => console.error('Error in username subscription', err),
    });
  }

  // Method to handle logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login-user']); // Redirect after logout
  }
}