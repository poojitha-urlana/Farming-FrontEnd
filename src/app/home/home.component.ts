import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FooterComponent } from '../footer/footer.component';

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
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FooterComponent, AnimateOnScrollModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUser, faHome, faCog, faTint, faThermometerHalf, faWater, faCamera, faSeedling, faChartLine);
  }
}
