import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PredictionService } from '../Services/prediction.service';

interface PredictionResponse {
  prediction: string;
  confidence: string;
  treatment: any;
}

@Component({
  selector: 'app-crop-health',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crop-health.component.html',
  styleUrls: ['./crop-health.component.css']
})
export class CropHealthComponent {
  selectedFile: File | null = null;
  prediction: string | null = null;
  confidence: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;
  isDragging: boolean = false;

  constructor(
    private predictionService: PredictionService,
    private router: Router
  ) { }

  // Handle drag over event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  // Handle drag leave event
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  // Handle drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.validateAndSetFile(event.dataTransfer.files[0]);
    }
  }

  // Handle file selection via input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.validateAndSetFile(input.files[0]);
    }
  }

  // Validate and set the selected file
  private validateAndSetFile(file: File): void {
    // Reset previous state
    this.errorMessage = null;
    this.prediction = null;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.errorMessage = 'Invalid file type. Please upload a JPG, PNG, or WEBP image.';
      return;
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.errorMessage = 'File size too large. Maximum size is 5MB.';
      return;
    }

    this.selectedFile = file;
  }

  // Get image preview URL
  getImagePreview(): string {
    return this.selectedFile ? URL.createObjectURL(this.selectedFile) : '';
  }

  // Clear selected file
  clearFile(): void {
    if (this.selectedFile) {
      URL.revokeObjectURL(this.getImagePreview());
    }
    this.selectedFile = null;
    this.prediction = null;
    this.errorMessage = null;
  }

  // Submit for prediction
  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image file.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.predictionService.predictDisease(this.selectedFile).subscribe({
      next: (response: PredictionResponse) => {
        this.isLoading = false;
        this.router.navigate(['/treatment'], {
          state: {
            prediction: response.prediction,
            confidence: response.confidence,
            treatment: response.treatment
          }
        });
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred during prediction';
        this.isLoading = false;
      }
    });
  }
}