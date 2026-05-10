import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from '../Services/farm.service';
import { Farm } from '../Models/farm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-farm',
  standalone:true,
  imports:[CommonModule , FormsModule],
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.css']
})
export class AddFarmComponent {
  
  farm: Farm = {
    farmId: 0,
    name: '',
    location: '',
    area: 0,
    soilType: '',
    cropName: '',
    status: 'Active', 
    farmSize: 0,
    sensorData: [] ,
    soilQuality: 0
  };

  constructor(private farmService: FarmService, private router: Router) {}


  onSubmit(): void {
    this.farmService.createFarm(this.farm).subscribe(() => {
      this.router.navigate(['/farmmanagement']); 
    });
  }
}