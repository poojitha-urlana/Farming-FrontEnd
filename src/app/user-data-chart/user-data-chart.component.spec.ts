import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataChartComponent } from './user-data-chart.component';

describe('UserDataChartComponent', () => {
  let component: UserDataChartComponent;
  let fixture: ComponentFixture<UserDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
