import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { faHome, faUser, faTractor, faSeedling, faCog, faSignOutAlt,faLeaf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenavbar-user',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './sidenavbar-user.component.html',
  styleUrls: ['./sidenavbar-user.component.css']
})
export class SidenavbarUserComponent {
  faHome = faHome;
  faUser = faUser;
  faTractor = faTractor;
  faSeedling = faSeedling;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faLeaf=faLeaf;
  
  toggleResponsive(){
  }
}
