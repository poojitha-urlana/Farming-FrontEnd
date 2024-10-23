import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../Services/auth.service'; // Import AuthService
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminService } from '../Services/admin.service';

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
    public authService: AuthService,
    public adminService:AdminService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
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
    if (this.authService.isLoggedIn$) {
      console.log('Logging out user...');
      this.authService.logout();
    } else if (this.adminService.adminLoggedIn$) {
      console.log('Logging out admin...');
      this.adminService.adminLogout();
    } else {
      console.log('Neither user nor admin is logged in.');
    }
  
    this.cdr.detectChanges();
  }
  
  
}