import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmDataChartComponentComponent } from './farm-data-chart-component.component';

describe('FarmDataChartComponentComponent', () => {
  let component: FarmDataChartComponentComponent;
  let fixture: ComponentFixture<FarmDataChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmDataChartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmDataChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
