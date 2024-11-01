import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { faHome, faUser, faLeaf, faTractor, faSeedling, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenavbar-user',
  standalone: true,
  imports: [ FontAwesomeModule , RouterModule],
  templateUrl: './sidenavbar-user.component.html',
  styleUrls: ['./sidenavbar-user.component.css'] // Note: Use 'styleUrls' instead of 'styleUrl'
})
export class SidenavbarUserComponent {
  // Define the icons to be used in the template
  faHome = faHome;
  faUser = faUser;
  faTractor = faTractor;
  faSeedling = faSeedling;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faLeaf =faLeaf;
}
