import { TestBed } from '@angular/core/testing';

import { CropRecommendationService } from './crop-recommendation.service';

describe('CropRecommendationService', () => {
  let service: CropRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
