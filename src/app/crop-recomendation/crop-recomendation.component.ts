import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropRecommendationService } from '../Services/crop-recommendation.service';

@Component({
  selector: 'app-crop-recomendation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crop-recomendation.component.html',
  styleUrl: './crop-recomendation.component.css'
})
export class CropRecomendationComponent {
  predictionData = { temperature: 0, humidity: 0, N: 0, P: 0, K: 0 };
  nutrientData = { crop: '', temperature: 0, humidity: 0 };
  recommendedCrop: string = '';
  recommendedNutrients: any = {};

  constructor(private cropService: CropRecommendationService) {}

  // Call the API to predict crop
  onPredictCrop() {
    this.cropService.predictCrop(this.predictionData).subscribe(response => {
      this.recommendedCrop = response.recommended_crop;
    });
  }

  // Call the API to get nutrient recommendations
  onGetNutrientRequirements() {
    this.cropService.getNutrientRequirements(this.nutrientData).subscribe(response => {
      this.recommendedNutrients = response.recommended_nutrients;
    });
  }
}