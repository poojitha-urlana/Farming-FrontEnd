import { Component } from '@angular/core';
import { SensorVisualComponent } from '../sensor-visual/sensor-visual.component';
@Component({
  selector: 'app-farmdetails',
  standalone: true,
  imports: [SensorVisualComponent],
  templateUrl: './farmdetails.component.html',
  styleUrl: './farmdetails.component.css'
})
export class FarmdetailsComponent {

}
