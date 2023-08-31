import { TestBed } from '@angular/core/testing';

import { AddPremiseBeaconsService } from './add-premise-beacons.service';

describe('AddPremiseBeaconsService', () => {
  let service: AddPremiseBeaconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPremiseBeaconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
