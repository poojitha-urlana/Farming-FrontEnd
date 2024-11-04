import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Farm } from '../Models/farm';
import { FarmService } from '../Services/farm.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-farms',
  standalone: true,
  imports: [ CommonModule , FormsModule],
  templateUrl: './farms.component.html',
  styleUrl: './farms.component.css'
})
export class FarmsComponent implements OnInit {
  farm!: Farm; 

  constructor(
    private route: ActivatedRoute,
    private farmService: FarmService
  ) {}

  ngOnInit(): void {
    this.loadFarmDetails();
  }

  loadFarmDetails(): void {
    const farmId = Number(this.route.snapshot.paramMap.get('id')); // Get farm ID from the route
    this.farmService.getFarmById(farmId).subscribe(
      (data: Farm) => {
        this.farm = data;
      },
      error => {
        console.error('Error loading farm details', error);
      }
    );
  }

  getSensorIcon(sensorType: string): string {
    switch (sensorType) {
      case 'temperature':
        return 'thermostat'; 
      case 'humidity':
        return 'water_drop'; 
      case 'moisture':
        return 'spa'; 
      default:
        return 'help'; 
    }
  }
  
}