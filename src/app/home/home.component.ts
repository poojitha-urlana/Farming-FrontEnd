import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faUser, 
  faHome, 
  faCog, 
  faTint, 
  faThermometerHalf, 
  faWater, 
  faCamera, 
  faSeedling, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';  // Importing all necessary icons

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private library: FaIconLibrary) {
    // Registering all icons used in the component
    library.addIcons(faUser, faHome, faCog, faTint, faThermometerHalf, faWater, faCamera, faSeedling, faChartLine);
  }
}
