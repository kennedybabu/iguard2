import { TestBed } from '@angular/core/testing';

import { GetPremiseBeaconsService } from './get-premise-beacons.service';

describe('GetPremiseBeaconsService', () => {
  let service: GetPremiseBeaconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseBeaconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
