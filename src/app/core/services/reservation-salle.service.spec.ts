import { TestBed } from '@angular/core/testing';

import { ReservationSalleService } from './reservation-salle.service';

describe('ReservationSalleService', () => {
  let service: ReservationSalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationSalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
