import { TestBed } from '@angular/core/testing';

import { RatingSalleService } from './rating-salle.service';

describe('RatingSalleService', () => {
  let service: RatingSalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingSalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
