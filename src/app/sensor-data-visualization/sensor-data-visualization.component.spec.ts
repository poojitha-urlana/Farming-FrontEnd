import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataVisualizationComponent } from './sensor-data-visualization.component';

describe('SensorDataVisualizationComponent', () => {
  let component: SensorDataVisualizationComponent;
  let fixture: ComponentFixture<SensorDataVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorDataVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorDataVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
