import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FarmService } from '../Services/farm.service';
import { Farm } from '../Models/farm';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-farmmanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './farmmanagement.component.html',
  styleUrls: ['./farmmanagement.component.css']
})
export class FarmmanagementComponent implements OnInit {
  farms: Farm[] = [];

  // Inject Router along with FarmService
  constructor(private farmService: FarmService, private router: Router) { }

  ngOnInit(): void {
    this.getFarms();
  }

  getFarms(): void {
    this.farmService.getAllFarms().subscribe((data: Farm[]) => {
      this.farms = data;
    });
  }

  // Delete farm by ID
  deleteFarm(id: number): void {
    this.farmService.deleteFarm(id).subscribe(() => {
      this.farms = this.farms.filter(farm => farm.farmId !== id);
    });
  }

  // Navigate to edit-farm component by farmId
  editFarm(farmId: number): void {
    this.router.navigate(['/edit-farm', farmId]);
  }
}
