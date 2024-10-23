import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FarmService } from '../Services/farm.service';
import { Farm } from '../Models/farm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmmanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './farmmanagement.component.html',
  styleUrls: ['./farmmanagement.component.css']
})
export class FarmmanagementComponent implements OnInit {
  farms: Farm[] = [];

  constructor(private farmService: FarmService, private router: Router) {}

  ngOnInit(): void {
    this.getFarms();
  }

  getFarms(): void {
    this.farmService.getAllFarms().subscribe((data: Farm[]) => {
      this.farms = data;
    });
  }

  deleteFarm(id: number): void {
    this.farmService.deleteFarm(id).subscribe(() => {
      this.farms = this.farms.filter(farm => farm.farmId !== id);
    });
  }

  editFarm(farmId: number): void {
    this.router.navigate(['/edit-farm', farmId]);
  }

  // Navigate to add farm component
  navigateToAddFarm(): void {
    this.router.navigate(['/add-farm']);
  }
}
