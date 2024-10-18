import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component'; 
import { CommonModule } from '@angular/common';
import { SidenavbarAdminComponent } from './sidenavbar-admin/sidenavbar-admin.component';
import { SidenavbarUserComponent } from './sidenavbar-user/sidenavbar-user.component';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent,
    SidenavbarAdminComponent,
     CommonModule,
     MatIconModule,
      FooterComponent, SidenavbarUserComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  showUserSidebar: boolean = false;
  showAdminSidebar: boolean = false;

  constructor(private router: Router) {} // Inject Router here

 
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url.split('?')[0]; 

        this.showUserSidebar = ['/dash-board-user', '/user-farm-list', '/crop-health', '/farms', '/farms/:id'].some(path => currentUrl.startsWith(path));
        this.showAdminSidebar = ['/dash-board-admin', '/farmmanagement', '/user-management'].includes(currentUrl);
      }
    });
  }
}
