import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PredictionService } from '../Services/prediction.service';

@Component({
  selector: 'app-crop-health',
  standalone: true,
  imports: [ FormsModule , CommonModule],
  templateUrl: './crop-health.component.html',
  styleUrl: './crop-health.component.css'
})
export class CropHealthComponent {
  selectedFile: File | null = null;
  predictionResult: any = null;
  errorMessage: string | null = null;

  constructor(private predictionService: PredictionService) {}

  // Event handler when the file is selected
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Form submission handler
  onSubmit(): void {
    if (this.selectedFile) {
      this.predictionService.predictDisease(this.selectedFile).subscribe({
        next: (result: any) => {
          this.predictionResult = result;
          this.errorMessage = null;  // Reset error message on success
        },
        error: (error: string) => {
          this.errorMessage = error;
          this.predictionResult = null;  // Reset result on error
        }
      });
    } else {
      this.errorMessage = 'Please select a file before submitting!';
    }
  }
}