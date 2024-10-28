import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../Services/auth.service'; // Import AuthService
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminService } from '../Services/admin.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,UserProfileComponent,ProfileCardComponent, FormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string | null = null;
  showProfile: boolean = false; // Controls visibility of profile component
profileHideTimeout: any;

showProfileCard() {
  this.showProfile = true;
  if (this.profileHideTimeout) {
    clearTimeout(this.profileHideTimeout); // Clear any existing timeout to avoid flickering
  }
}

hideProfileCard() {
  this.profileHideTimeout = setTimeout(() => {
    this.showProfile = false;
  }, 2000); // 2000ms delay (2 seconds)
}


  constructor(
    private router: Router,
    library: FaIconLibrary,
    public authService: AuthService,
    public adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.authService.username$.subscribe({
      next: (name) => {
        console.log('Username received:', name);
        this.username = name;
      },
      error: (err) => console.error('Error in username subscription', err),
    });
  }

  logout() {
    if (this.authService.isLoggedIn$) {
      this.authService.logout();
    } 
    this.cdr.detectChanges();
  }
  login(){
    if (this.adminService.adminLoggedIn$) {
      this.adminService.adminLogout();
    }
  }
}
