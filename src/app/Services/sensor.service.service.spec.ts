import { TestBed } from '@angular/core/testing';

import { SensorServiceService } from './sensor.service.service';

describe('SensorServiceService', () => {
  let service: SensorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
