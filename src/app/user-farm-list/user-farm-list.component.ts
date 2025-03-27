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
    this.getFarms();
  }

  getFarms(): void {
    this.farmService.getAllFarms().subscribe((data: Farm[]) => {
      this.farms = data;
    });
  }

  navigateFarmdetails(farmId: number): void {
    this.router.navigate([`/farmdetails`]);
  }
}
