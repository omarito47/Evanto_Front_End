import { TestBed } from '@angular/core/testing';

import { ConsumerGSService } from './consumer-gs.service';

describe('ConsumerGSService', () => {
  let service: ConsumerGSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerGSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
