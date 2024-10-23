import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component'; 
import { CommonModule } from '@angular/common';
import { SidenavbarAdminComponent } from './sidenavbar-admin/sidenavbar-admin.component';
import { SidenavbarUserComponent } from './sidenavbar-user/sidenavbar-user.component';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

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
  showFooter: boolean = true; 

  constructor(private router: Router) {} // Inject Router here

 
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url.split('?')[0]; 

        // this.showUserSidebar = ['/dash-board-user', '/user-farm-list', '/crop-health', '/farms', '/farms/:id'].some(path => currentUrl.startsWith(path));
        // this.showAdminSidebar = ['/dash-board-admin', '/farmmanagement', '/user-management' ,'/edit-farm/:id'].some(path => currentUrl.startsWith(path));

          // Update checks to ensure proper sidebar visibility
          this.showUserSidebar = ['/dash-board-user', '/user-farm-list', '/crop-health', '/farms', '/farms/:id'].some(path => currentUrl.startsWith(path)) || currentUrl.includes('/farms/');
          this.showAdminSidebar = ['/dash-board-admin', '/farmmanagement', '/user-management', '/edit-farm' ,'/add-farm' ].some(path => currentUrl.startsWith(path));
          this.showFooter =[
            '/dash-board-user', '/user-farm-list',
             '/crop-health', '/farms', '/farms/:id',
             '/dash-board-admin','/farmmanagement', 
             '/user-management', '/edit-farm'
            ].some(path => currentUrl.startsWith(path)) ;
      }
    });
  }
}
