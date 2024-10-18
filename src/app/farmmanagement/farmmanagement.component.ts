import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FarmService } from '../Services/farm.service';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { Farm } from '../Models/farm';

@Component({
  selector: 'app-farmmanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './farmmanagement.component.html',
  styleUrls: ['./farmmanagement.component.css']
})
export class FarmmanagementComponent implements OnInit, OnDestroy {
  farms: Farm[] = [];
  editingFarm: Farm | null = null;
  errorMessage: string | null = null; // Variable to hold error messages
  private unsubscribe$ = new Subject<void>(); // Subject to manage subscriptions

  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    this.getFarms();
  }

  getFarms(): void {
    this.farmService.getAllFarms()
      .pipe(
        takeUntil(this.unsubscribe$), // Unsubscribe on destroy
        catchError(this.handleError.bind(this)) // Ensure 'this' context
      )
      .subscribe(data => {
        this.farms = data; // Now this will always be Farm[]
        this.errorMessage = null; // Clear any previous error message
      });
  }

  editFarm(farm: Farm): void {
    this.editingFarm = { ...farm }; // Copy farm details for editing
  }

  deleteFarm(id: number): void {
    if (confirm('Are you sure you want to delete this farm?')) { // Confirmation before deletion
      this.farmService.deleteFarm(id)
        .pipe(
          takeUntil(this.unsubscribe$), // Unsubscribe on destroy
          catchError(this.handleError.bind(this)) // Ensure 'this' context
        )
        .subscribe(() => {
          this.getFarms(); // Refresh the list after deletion
        });
    }
  }

  submitFarm(): void {
    if (this.editingFarm) {
      const farmObservable = this.editingFarm.id
        ? this.farmService.updateFarm(this.editingFarm.id, this.editingFarm) // Update existing farm
        : this.farmService.createFarm(this.editingFarm); // Create new farm

      farmObservable.pipe(
        takeUntil(this.unsubscribe$), // Unsubscribe on destroy
        catchError(this.handleError.bind(this)) // Ensure 'this' context
      )
      .subscribe(() => {
        this.getFarms(); // Refresh the list after adding/updating
        this.cancelEdit(); // Reset the form
      });
    }
  }

  cancelEdit(): void {
    this.editingFarm = null; // Reset the editingFarm, hiding the form
  }

  private handleError(error: HttpErrorResponse): Observable<Farm[]> {
    this.errorMessage = 'An error occurred: ' + (error.message || 'Unknown error');
    return of([]); // Return an observable of empty Farm array
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Complete the Subject
    this.unsubscribe$.complete(); // Clean up
  }
}
