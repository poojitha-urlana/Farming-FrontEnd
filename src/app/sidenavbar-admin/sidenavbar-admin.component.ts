import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule if using Font Awesome

@Component({
  selector: 'app-sidenavbar-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule], // Include necessary modules
  templateUrl: './sidenavbar-admin.component.html',
  styleUrls: ['./sidenavbar-admin.component.css'] // Corrected to 'styleUrls'
})
export class SidenavbarAdminComponent {
  // Add icons or other properties if needed
  faHome = 'home'; // Replace with actual icon from FontAwesome
  faUser = 'user'; // Replace with actual icon from FontAwesome
  faTractor = 'tractor'; // Replace with actual icon from FontAwesome
  faUsers = 'users'; // Replace with actual icon from FontAwesome
  faSeedling = 'seedling'; // Replace with actual icon from FontAwesome
  faCog = 'cog'; // Replace with actual icon from FontAwesome
  faSignOutAlt = 'sign-out-alt'; // Replace with actual icon from FontAwesome
}
