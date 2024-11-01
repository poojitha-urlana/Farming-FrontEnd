import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmdetailsComponent } from './farmdetails.component';

describe('FarmdetailsComponent', () => {
  let component: FarmdetailsComponent;
  let fixture: ComponentFixture<FarmdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
