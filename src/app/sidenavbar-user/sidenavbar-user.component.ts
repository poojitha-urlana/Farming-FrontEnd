import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { faHome, faUser, faTractor, faSeedling, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
  
  isResponsive: boolean = false;

  toggleResponsive() {
    this.isResponsive = !this.isResponsive;
  }
}
