import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmmanagementComponent } from './farmmanagement.component';

describe('FarmmanagementComponent', () => {
  let component: FarmmanagementComponent;
  let fixture: ComponentFixture<FarmmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
