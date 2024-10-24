import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropRecomendationComponent } from './crop-recomendation.component';

describe('CropRecomendationComponent', () => {
  let component: CropRecomendationComponent;
  let fixture: ComponentFixture<CropRecomendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropRecomendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
