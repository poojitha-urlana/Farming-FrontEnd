import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFarmListComponent } from './user-farm-list.component';

describe('UserFarmListComponent', () => {
  let component: UserFarmListComponent;
  let fixture: ComponentFixture<UserFarmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFarmListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFarmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
