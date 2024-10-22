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
  prediction: string | null = null;
  error: string | null = null;

  constructor(private PredictionService: PredictionService) { }

  // Method to handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Method to submit the image for prediction
  onSubmit(): void {
    if (this.selectedFile) {
      this.PredictionService.predictDisease(this.selectedFile)
        .subscribe(
          (response) => {
            this.prediction = response.prediction;
            this.error = null;
          },
          (error) => {
            this.error = 'Error predicting the disease: ' + error;
            this.prediction = null;
          }
        );
    } else {
      this.error = 'Please select an image file.';
    }
  }
}