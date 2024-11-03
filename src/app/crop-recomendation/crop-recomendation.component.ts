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
  loading: boolean = false;

  // Field-specific error properties
  temperatureError: string | null = null;
  humidityError: string | null = null;
  nitrogenError: string | null = null;
  phosphorusError: string | null = null;
  potassiumError: string | null = null;

  temperatureRequiredError: string | null = null;
  humidityRequiredError: string | null = null;
  nitrogenRequiredError: string | null = null;
  phosphorusRequiredError: string | null = null;
  potassiumRequiredError: string | null = null;

  constructor(private http: HttpClient) {}

  submitForm() {
    // Check for empty fields
    if (!this.checkForEmptyFields()) {
      this.errorMessage = 'Please fill in all required fields to get a recommendation.';
      return;
    }

    // Check if inputs are in valid range
    if (!this.isInputValid()) {
      this.errorMessage = 'No crop can be grown under the provided conditions.';
      this.recommendedCrop = null;
      return;
    }

    const apiUrl = 'http://127.0.0.1:5000/predict';  // Flask API URL
    const payload = {
      temperature: this.temperature,
      humidity: this.humidity,
      N: this.nitrogen,
      P: this.phosphorus,
      K: this.potassium
    };

    this.recommendedCrop = null;
    this.errorMessage = null;
    this.loading = true;
    this.http.post<{ recommended_crop?: string; error?: string }>(apiUrl, payload)
    .subscribe(
      response => {
        this.loading = false;
        if (response.error) {
          this.errorMessage = response.error;
          this.recommendedCrop = null;
        } else {
          this.recommendedCrop = response.recommended_crop ?? null;
          this.errorMessage = null;
        }
      },
      error => {
        this.loading = false;
        console.error('Error fetching crop recommendation:', error);
        if (error.status === 0) {
          this.errorMessage = 'Error: Unable to reach the Flask API. Make sure it is running.';
        } else {
          this.errorMessage = 'There was an error fetching the crop recommendation.';
        }
        this.recommendedCrop = null;
      }
    );
}

// Validation for required fields
checkForEmptyFields(): boolean {
  let allFilled = true;

  this.temperatureRequiredError = this.humidityRequiredError = this.nitrogenRequiredError = this.phosphorusRequiredError = this.potassiumRequiredError = null;

  if (this.temperature == null) {
    this.temperatureRequiredError = 'Please enter temperature.';
    allFilled = false;
  }
  if (this.humidity == null) {
    this.humidityRequiredError = 'Please enter humidity.';
    allFilled = false;
  }
  if (this.nitrogen == null) {
    this.nitrogenRequiredError = 'Please enter nitrogen.';
    allFilled = false;
  }
  if (this.phosphorus == null) {
    this.phosphorusRequiredError = 'Please enter phosphorus.';
    allFilled = false;
  }
  if (this.potassium == null) {
    this.potassiumRequiredError = 'Please enter potassium.';
    allFilled = false;
  }

  return allFilled;
}
// Validation for range limits
isInputValid(): boolean {
  let isValid = true;

  this.temperatureError = this.humidityError = this.nitrogenError = this.phosphorusError = this.potassiumError = null;

  if (this.temperature < 0 || this.temperature > 50) {
    this.temperatureError = 'Temperature is out of range (0-50).';
    isValid = false;
  }
  if (this.humidity < 0 || this.humidity > 100) {
    this.humidityError = 'Humidity is out of range (0-100).';
    isValid = false;
  }
  if (this.nitrogen < 0 || this.nitrogen > 300) {
    this.nitrogenError = 'Nitrogen is out of range (0-300).';
    isValid = false;
  }
  if (this.phosphorus < 0 || this.phosphorus > 300) {
    this.phosphorusError = 'Phosphorus is out of range (0-300).';
    isValid = false;
  }
  if (this.potassium < 0 || this.potassium > 300) {
    this.potassiumError = 'Potassium is out of range (0-300).';
    isValid = false;
  }

  return isValid;
  }
}