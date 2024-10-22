import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmService } from '../Services/farm.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Farm } from "../Models/farm";

@Component({
  selector: 'app-edit-farm',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './edit-farm.component.html',
  styleUrls: ['./edit-farm.component.css']  // Fixed styleUrl to styleUrls
})
export class EditFarmComponent implements OnInit {  // Implement OnInit to adhere to best practices

  farmId!: number;
  farmData!: Farm;  // Use Farm interface

  constructor(private route: ActivatedRoute, private farmService: FarmService) {}

  ngOnInit(): void {
    // Get farm ID from the route parameter
    this.farmId = +this.route.snapshot.paramMap.get('id')!;
    
    // Fetch the farm data based on farmId
    this.farmService.getFarmById(this.farmId).subscribe(data => {
      this.farmData = data as Farm;  // Type assertion
    });
  }

  // Method to save updated farm details
  saveFarm(): void {
    this.farmService.updateFarm(this.farmId, this.farmData).subscribe(() => {
      // Handle success, maybe navigate back to farm list
    });
  }
}
