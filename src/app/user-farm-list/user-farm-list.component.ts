import { Component, OnInit } from '@angular/core';
import { FarmService } from '../Services/farm.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Farm } from '../Models/farm';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-farm-list',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule ,RouterModule],
  templateUrl: './user-farm-list.component.html',
  styleUrls: ['./user-farm-list.component.css'],
})
export class UserFarmListComponent implements OnInit {
  farms: Farm[] = [];

  constructor(private farmService: FarmService, private router: Router) {}

  ngOnInit(): void {
    this.loadFarms();
  }

  loadFarms(): void {
    this.farmService.getAllFarms().subscribe(
      (data: Farm[]) => {
        this.farms = data;
      },
      error => {
        console.error('Error loading farms', error);
      }
    );
  }

  viewFarmDetails(id: number | undefined): void {
    console.log('Attempting to navigate to farm with ID:', id); // Log the ID
    if (id !== undefined) {
      this.router.navigate(['/farms', id]).then(success => {
        if (success) {
          console.log('Navigation successful!');
        } else {
          console.error('Navigation failed!');
        }
      });
    } else {
      console.error('Farm ID is undefined');
    }
  }
  
  
}
