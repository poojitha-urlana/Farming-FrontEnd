import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CropRecommendationService } from '../Services/crop-recommendation.service';

@Component({
  selector: 'app-crop-recomendation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crop-recomendation.component.html',
  styleUrl: './crop-recomendation.component.css'
})
export class CropRecomendationComponent {
  temperature!: number;
  humidity!: number;
  nitrogen!: number;
  phosphorus!: number;
  potassium!: number;
  recommendedCrop: string | null = null;
  errorMessage: string | null = null; 
  loading: boolean = false; // New property to track loading state

  constructor(private http: HttpClient) {}

  submitForm() {
    // Basic input validation
    if (!this.isInputValid()) {
      this.errorMessage = 'No crop can be grown under the provided conditions.';
      this.recommendedCrop = null;
      return; // Exit early if inputs are invalid
    }

    const apiUrl = 'http://127.0.0.1:5000/predict';  // Flask API URL
    const payload = {
      temperature: this.temperature,
      humidity: this.humidity,
      N: this.nitrogen,
      P: this.phosphorus,
      K: this.potassium
    };
    // Reset messages and start loading
    this.recommendedCrop = null;
    this.errorMessage = null;
    this.loading = true; // Set loading to true

    this.http.post<{ recommended_crop?: string; error?: string }>(apiUrl, payload)
      .subscribe(
        response => {
          this.loading = false; // Stop loading
          if (response.error) {
            this.errorMessage = response.error; 
            this.recommendedCrop = null; 
          } else {
            this.recommendedCrop = response.recommended_crop ?? null; 
            this.errorMessage = null; 
          }
        },
        error => {
          this.loading = false; // Stop loading
          console.error('Error fetching crop recommendation:', error);
          this.errorMessage = 'There was an error fetching the crop recommendation.'; 
          this.recommendedCrop = null; 
        }
      );
  }

  isInputValid(): boolean {
    return (
      this.temperature >= 0 && this.temperature <= 50 &&
      this.humidity >= 0 && this.humidity <= 100 &&
      this.nitrogen >= 0 && this.nitrogen <= 300 &&
      this.phosphorus >= 0 && this.phosphorus <= 300 &&
      this.potassium >= 0 && this.potassium <= 300
    );
  }
}