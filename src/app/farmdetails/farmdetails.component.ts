import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FarmService } from '../Services/farm.service';
import { Farm } from '../Models/farm';

@Component({
  selector: 'app-farmdetails',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngIf
  templateUrl: './farmdetails.component.html',
  styleUrls: ['./farmdetails.component.css'] // ✅ Fixed typo
})
export class FarmdetailsComponent implements OnInit {
  farm: Farm | null = null;
  farmId: number | null = null;
  errorMessage: string | null = null; // Store error messages

  constructor(private route: ActivatedRoute, private farmService: FarmService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.farmId = id ? Number(id) : null;

    if (this.farmId && !isNaN(this.farmId)) {
      this.getFarmById(this.farmId);
    } else {
      this.errorMessage = "Invalid farm ID provided.";
    }
  }

  getFarmById(id: number): void {
    this.farmService.getFarmById(id).subscribe(
      (data: Farm) => {
        this.farm = data;
      },
      (error) => {
        console.error('Error fetching farm details:', error);
        this.errorMessage = "Error fetching farm details. Please try again later.";
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/user-farm-list']);
  }
  viewSensorDetails():void{
    this.router.navigate(['/sensor-data']);
  }
}
